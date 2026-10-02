import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from './useInView.js'

/**
 * Hero background: a 3D data globe.
 *
 * 1. Five coloured columns of data appear — the silos — with signals running
 *    only up and down inside each one.
 * 2. Top to bottom, every point flies off its column and onto the surface of a
 *    sphere, and the colours settle into Anuvad teal (with a few sand accents).
 * 3. The sphere — a fine geodesic mesh — turns a full 360° continuously and
 *    slowly, with two tilted orbit rings and their satellites, and signals
 *    travelling across the mesh. Moving the mouse tilts it gently.
 *
 * Real perspective projection: the near side is larger and brighter, the far
 * side smaller and dimmer, so it reads as a solid object rather than a pattern.
 *
 * Hand-drawn on a 2D canvas — no 3D library. Edges and ring segments are
 * grouped by brightness and stroked in a handful of batches, and glows are
 * pre-rendered sprites, so a frame costs very little. Pauses when off screen
 * or when the tab is hidden. With reduced motion it draws one still frame of
 * the finished globe.
 */

// ---------------------------------------------------------------- constants --

const COLS = 5
const ROWS = 28
const N = COLS * ROWS // 140 points on the sphere
const NEIGHBOURS = 4 // mesh density
const CAM = 3.4 // camera distance in sphere radii: lower = stronger perspective

const SPIN = 0.2 // rad/s  → one full turn roughly every 31 s
const BASE_TILT = 0.36 // rad, looking slightly down onto the globe

// timeline, seconds
const T_APPEAR = 0.9
const T_MERGE = 2.1 // silos start leaving their columns
const CASCADE = 0.9 // top row leaves first, bottom row this much later
const FLY = 1.6 // how long each point takes to reach the sphere
const T_RINGS = 3.9
const RING_FADE = 1.3
// A finite 'finished' moment for the still frame (never Infinity: sin(∞) is NaN).
const T_DONE = T_MERGE + CASCADE + FLY + RING_FADE + 1

const TEAL = [45, 212, 191]
const TEAL_LIGHT = [148, 240, 226]
const SAND = [217, 182, 79]
const SILO_COLOURS = [
  [45, 212, 191], // teal
  [56, 189, 248], // sky
  [167, 139, 250], // violet
  [251, 191, 36], // amber
  [244, 114, 182], // rose
]

const RINGS = [
  { radius: 1.3, tiltX: 1.18, tiltZ: 0.32, speed: 0.5, sats: [0, Math.PI] },
  { radius: 1.52, tiltX: -0.62, tiltZ: -0.85, speed: -0.34, sats: [1.4] },
]
const RING_STEPS = 90

const EDGE_LEVELS = 12 // brightness buckets for batched stroking
const EDGE_MAX = 0.42

// ------------------------------------------------------------------ helpers --

const clamp01 = (v) => Math.max(0, Math.min(1, v))
const lerp = (a, b, t) => a + (b - a) * t
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const rgba = ([r, g, b], a) => `rgba(${r | 0},${g | 0},${b | 0},${a})`
const mix = (c1, c2, t) => [lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t)]

function rotateY([x, y, z], a) {
  const c = Math.cos(a)
  const s = Math.sin(a)
  return [x * c + z * s, y, -x * s + z * c]
}
function rotateX([x, y, z], a) {
  const c = Math.cos(a)
  const s = Math.sin(a)
  return [x, y * c - z * s, y * s + z * c]
}
function rotateZ([x, y, z], a) {
  const c = Math.cos(a)
  const s = Math.sin(a)
  return [x * c - y * s, x * s + y * c, z]
}

/** Soft round glow, rendered once and stamped with drawImage. */
function makeGlow(colour) {
  const size = 64
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  grad.addColorStop(0, rgba(colour, 1))
  grad.addColorStop(0.25, rgba(colour, 0.45))
  grad.addColorStop(1, rgba(colour, 0))
  g.fillStyle = grad
  g.fillRect(0, 0, size, size)
  return c
}

// -------------------------------------------------------------------- model --

function buildGlobe() {
  const golden = Math.PI * (3 - Math.sqrt(5))
  const nodes = []

  for (let i = 0; i < N; i++) {
    // Fibonacci sphere: evenly spread points, ordered top to bottom
    const y = 1 - ((i + 0.5) / N) * 2
    const r = Math.sqrt(1 - y * y)
    const phi = i * golden
    const col = i % COLS
    const row = Math.floor(i / COLS)
    nodes.push({
      p3: [Math.cos(phi) * r, y, Math.sin(phi) * r],
      col,
      // silo layout, as fractions of the canvas
      sx: 0.1 + col * (0.8 / (COLS - 1)),
      sy: 0.1 + row * (0.8 / (ROWS - 1)),
      start: T_MERGE + (row / (ROWS - 1)) * CASCADE,
      accent: i % 9 === 4, // a few sand points for warmth
      hub: i % 13 === 6, // a few brighter anchor points
      pulse: 0,
      x: 0,
      y: 0,
      z: 0,
      p: 0,
    })
  }

  // mesh: each point to its nearest neighbours on the sphere, de-duplicated
  const seen = new Set()
  const edges = []
  nodes.forEach((n, i) => {
    nodes
      .map((m, j) => [j, (m.p3[0] - n.p3[0]) ** 2 + (m.p3[1] - n.p3[1]) ** 2 + (m.p3[2] - n.p3[2]) ** 2])
      .filter(([j]) => j !== i)
      .sort((a, b) => a[1] - b[1])
      .slice(0, NEIGHBOURS)
      .forEach(([j]) => {
        const k = i < j ? `${i}-${j}` : `${j}-${i}`
        if (!seen.has(k)) {
          seen.add(k)
          edges.push([Math.min(i, j), Math.max(i, j)])
        }
      })
  })

  const siloEdges = []
  for (let i = 0; i + COLS < N; i++) siloEdges.push([i, i + COLS])

  return { nodes, edges, siloEdges }
}

// ---------------------------------------------------------------- component --

export default function NetworkCanvas({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = prefersReducedMotion()
    const { nodes, edges, siloEdges } = buildGlobe()
    const glowTeal = makeGlow(TEAL_LIGHT)
    const glowSand = makeGlow(SAND)
    const packets = []
    const buckets = Array.from({ length: EDGE_LEVELS }, () => [])

    // pointer tilt, eased so the globe leans rather than snaps
    const tilt = { x: 0, y: 0, tx: 0, ty: 0 }

    let W = 0
    let H = 0
    let cx = 0
    let cy = 0
    let R = 0
    let raf = 0
    let running = false
    let onScreen = true
    let start = performance.now()
    let lastSpawn = 0

    const layout = () => {
      if (W >= 1024) {
        // desktop: centred behind the right-hand column, large enough to frame it
        cx = W * 0.7
        cy = H * 0.5
        // perspective makes the globe ~1.05R tall each side; 0.43H leaves a margin
        R = Math.min(H * 0.43, W * 0.28)
      } else {
        // phone / tablet: centred, sitting behind the headline block
        cx = W * 0.5
        cy = H * 0.34
        R = Math.min(W, H) * 0.42
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = Math.max(1, rect.width)
      H = Math.max(1, rect.height)
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      layout()
      if (!running) draw(reduced ? T_DONE : (performance.now() - start) / 1000)
    }

    /** sphere-space point → screen x, y, depth (0 back … 1 front) and scale */
    const project = (v) => {
      const s = CAM / (CAM - v[2])
      return { x: cx + v[0] * R * s, y: cy - v[1] * R * s, d: (v[2] + 1) / 2, s }
    }

    const spawnPacket = (kind, now) => {
      const list = kind === 'silo' ? siloEdges : edges
      const [a, b] = list[Math.floor(Math.random() * list.length)]
      const fwd = Math.random() < 0.5
      packets.push({ kind, from: fwd ? a : b, to: fwd ? b : a, t0: now, dur: 900 + Math.random() * 900 })
    }

    function draw(t) {
      const appear = clamp01(t / T_APPEAR)
      const globe = easeInOut(clamp01((t - T_MERGE) / (CASCADE + FLY))) // overall merge progress
      const ringsIn = easeInOut(clamp01((t - T_RINGS) / RING_FADE))

      tilt.x += (tilt.tx - tilt.x) * 0.05
      tilt.y += (tilt.ty - tilt.y) * 0.05
      const yaw = t * SPIN + tilt.y
      const pitch = BASE_TILT + tilt.x + Math.sin(t * 0.13) * 0.04

      ctx.clearRect(0, 0, W, H)

      // --- atmosphere: core glow and rim, grows in with the globe ---------------
      if (globe > 0.01) {
        const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.25)
        core.addColorStop(0, rgba(TEAL, 0.1 * globe))
        core.addColorStop(0.55, rgba(TEAL, 0.035 * globe))
        core.addColorStop(1, rgba(TEAL, 0))
        ctx.fillStyle = core
        ctx.beginPath()
        ctx.arc(cx, cy, R * 1.25, 0, Math.PI * 2)
        ctx.fill()

        const rimR = R * (CAM / Math.sqrt(CAM * CAM - 1)) // silhouette radius under perspective
        const rim = ctx.createRadialGradient(cx, cy, rimR * 0.9, cx, cy, rimR * 1.08)
        rim.addColorStop(0, rgba(TEAL, 0))
        rim.addColorStop(0.55, rgba(TEAL, 0.09 * globe))
        rim.addColorStop(1, rgba(TEAL, 0))
        ctx.fillStyle = rim
        ctx.beginPath()
        ctx.arc(cx, cy, rimR * 1.08, 0, Math.PI * 2)
        ctx.fill()
      }

      // --- place every point: silo position → rotating sphere position -----------
      for (const n of nodes) {
        const v = rotateX(rotateY(n.p3, yaw), pitch)
        const pr = project(v)
        n.p = easeInOut(clamp01((t - n.start) / FLY))
        n.x = lerp(n.sx * W, pr.x, n.p)
        n.y = lerp(n.sy * H, pr.y, n.p)
        n.z = v[2]
        n.d = lerp(0.85, pr.d, n.p) // silos read flat and bright, the globe has depth
        n.s = lerp(1, pr.s, n.p)
      }

      // --- ring geometry, projected, drawn half now (behind) and half later (in front)
      const ringSegs = []
      if (ringsIn > 0.01) {
        RINGS.forEach((ring, ri) => {
          const pts = []
          for (let k = 0; k <= RING_STEPS; k++) {
            const a = (k / RING_STEPS) * Math.PI * 2
            let v = [Math.cos(a) * ring.radius, 0, Math.sin(a) * ring.radius]
            v = rotateZ(rotateX(v, ring.tiltX), ring.tiltZ)
            v = rotateX(rotateY(v, yaw * 0.6 + t * 0.03 * (ri ? -1 : 1)), pitch)
            pts.push({ ...project(v), z: v[2] })
          }
          for (let k = 0; k < RING_STEPS; k++) ringSegs.push({ a: pts[k], b: pts[k + 1], ri })
          ring._pts = pts
        })
      }

      const strokeRingHalf = (front) => {
        for (let lvl = 0; lvl < 6; lvl++) {
          ctx.beginPath()
          let any = false
          for (const sg of ringSegs) {
            const isFront = (sg.a.z + sg.b.z) / 2 > 0
            if (isFront !== front) continue
            const d = (sg.a.d + sg.b.d) / 2
            if (Math.min(5, Math.floor(d * 6)) !== lvl) continue
            ctx.moveTo(sg.a.x, sg.a.y)
            ctx.lineTo(sg.b.x, sg.b.y)
            any = true
          }
          if (any) {
            ctx.strokeStyle = rgba(TEAL_LIGHT, ringsIn * (0.05 + ((lvl + 0.5) / 6) * 0.3))
            ctx.lineWidth = front ? 1.1 : 0.8
            ctx.stroke()
          }
        }
      }
      if (ringSegs.length) strokeRingHalf(false)

      // --- silo edges (fade as each pair of points leaves its column) -------------
      if (globe < 0.999) {
        ctx.lineWidth = 1
        for (const [a, b] of siloEdges) {
          const na = nodes[a]
          const nb = nodes[b]
          const alpha = (1 - Math.max(na.p, nb.p)) * 0.55 * appear
          if (alpha < 0.01) continue
          ctx.strokeStyle = rgba(SILO_COLOURS[na.col], alpha)
          ctx.beginPath()
          ctx.moveTo(na.x, na.y)
          ctx.lineTo(nb.x, nb.y)
          ctx.stroke()
        }
      }

      // --- sphere mesh, batched by brightness ----------------------------------------
      for (const bucket of buckets) bucket.length = 0
      for (const e of edges) {
        const na = nodes[e[0]]
        const nb = nodes[e[1]]
        const reveal = Math.min(na.p, nb.p)
        if (reveal < 0.02) continue
        const d = (na.d + nb.d) / 2
        const alpha = reveal * (0.035 + EDGE_MAX * Math.pow(d, 1.7))
        const lvl = Math.min(EDGE_LEVELS - 1, Math.floor((alpha / EDGE_MAX) * EDGE_LEVELS))
        buckets[lvl].push(e)
      }
      ctx.lineWidth = 1
      buckets.forEach((bucket, lvl) => {
        if (!bucket.length) return
        ctx.strokeStyle = rgba(TEAL, ((lvl + 0.5) / EDGE_LEVELS) * EDGE_MAX)
        ctx.beginPath()
        for (const [a, b] of bucket) {
          ctx.moveTo(nodes[a].x, nodes[a].y)
          ctx.lineTo(nodes[b].x, nodes[b].y)
        }
        ctx.stroke()
      })

      // --- signals ------------------------------------------------------------------
      const now = performance.now()
      ctx.globalCompositeOperation = 'lighter'
      for (let i = packets.length - 1; i >= 0; i--) {
        const pk = packets[i]
        const u = (now - pk.t0) / pk.dur
        if (u >= 1) {
          nodes[pk.to].pulse = 1
          packets.splice(i, 1)
          continue
        }
        const a = nodes[pk.from]
        const b = nodes[pk.to]
        const isSilo = pk.kind === 'silo'
        const fade = isSilo ? 1 - Math.max(a.p, b.p) : Math.min(a.p, b.p)
        const depth = isSilo ? 1 : (a.d + b.d) / 2
        const alpha = fade * (0.25 + 0.75 * depth)
        if (alpha < 0.03) continue
        const colour = isSilo ? SILO_COLOURS[a.col] : TEAL_LIGHT
        const hx = lerp(a.x, b.x, u)
        const hy = lerp(a.y, b.y, u)
        const tu = Math.max(0, u - 0.18)
        const grad = ctx.createLinearGradient(lerp(a.x, b.x, tu), lerp(a.y, b.y, tu), hx, hy)
        grad.addColorStop(0, rgba(colour, 0))
        grad.addColorStop(1, rgba(colour, 0.9 * alpha))
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(lerp(a.x, b.x, tu), lerp(a.y, b.y, tu))
        ctx.lineTo(hx, hy)
        ctx.stroke()
        const g = 9 + 6 * depth
        ctx.globalAlpha = alpha
        ctx.drawImage(glowTeal, hx - g / 2, hy - g / 2, g, g)
        ctx.globalAlpha = 1
      }
      ctx.globalCompositeOperation = 'source-over'

      // --- points, back to front ------------------------------------------------------
      const order = nodes.slice().sort((a, b) => a.z * a.p - b.z * b.p)
      for (const n of order) {
        const base = n.hub ? 2.3 : n.accent ? 1.8 : 1.45
        const r = (base + n.pulse * 1.8) * (0.55 + 0.55 * n.d) * n.s
        const colour = mix(SILO_COLOURS[n.col], n.accent ? SAND : TEAL, n.p)
        const alpha = appear * (0.18 + 0.82 * Math.pow(n.d, 1.2)) * (0.85 + n.pulse * 0.15)

        if (n.hub || n.accent || n.pulse > 0.08) {
          const g = r * (n.hub ? 9 : 6) * (0.6 + n.pulse * 0.8)
          ctx.globalCompositeOperation = 'lighter'
          ctx.globalAlpha = alpha * (n.hub ? 0.55 : 0.4) * (0.4 + 0.6 * n.p)
          ctx.drawImage(n.accent ? glowSand : glowTeal, n.x - g / 2, n.y - g / 2, g, g)
          ctx.globalAlpha = 1
          ctx.globalCompositeOperation = 'source-over'
        }

        ctx.fillStyle = rgba(colour, Math.min(1, alpha))
        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fill()
        n.pulse *= 0.92
      }

      // --- rings in front of the globe, and their satellites -----------------------------
      if (ringSegs.length) {
        strokeRingHalf(true)
        ctx.globalCompositeOperation = 'lighter'
        RINGS.forEach((ring, ri) => {
          for (const off of ring.sats) {
            const a = t * ring.speed + off
            let v = [Math.cos(a) * ring.radius, 0, Math.sin(a) * ring.radius]
            v = rotateZ(rotateX(v, ring.tiltX), ring.tiltZ)
            v = rotateX(rotateY(v, yaw * 0.6 + t * 0.03 * (ri ? -1 : 1)), pitch)
            const pr = project(v)
            const alpha = ringsIn * (0.3 + 0.7 * pr.d)
            const g = (16 + 12 * pr.d) * pr.s
            ctx.globalAlpha = alpha * 0.8
            ctx.drawImage(ri ? glowSand : glowTeal, pr.x - g / 2, pr.y - g / 2, g, g)
            ctx.globalAlpha = alpha
            ctx.fillStyle = rgba(ri ? SAND : TEAL_LIGHT, 1)
            ctx.beginPath()
            ctx.arc(pr.x, pr.y, 2 * pr.s * (0.7 + 0.5 * pr.d), 0, Math.PI * 2)
            ctx.fill()
            ctx.globalAlpha = 1
          }
        })
        ctx.globalCompositeOperation = 'source-over'
      }

      // --- spawn new signals ---------------------------------------------------------------
      if (!reduced && now - lastSpawn > 110 && packets.length < 34) {
        lastSpawn = now
        if (globe < 0.2 && appear > 0.6) spawnPacket('silo', now)
        else if (globe > 0.6) spawnPacket('mesh', now)
      }
    }

    const loop = () => {
      draw((performance.now() - start) / 1000)
      raf = requestAnimationFrame(loop)
    }
    const play = () => {
      if (running || reduced || !onScreen || document.hidden) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    const pause = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    // pointer tilt — listen on the hero, since the canvas sits behind the content
    const host = canvas.parentElement
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const nx = (e.clientX - rect.left) / rect.width - 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5
      tilt.ty = nx * 0.5
      tilt.tx = ny * 0.3
    }
    const onLeave = () => {
      tilt.tx = 0
      tilt.ty = 0
    }
    host?.addEventListener('pointermove', onMove, { passive: true })
    host?.addEventListener('pointerleave', onLeave)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      onScreen ? play() : pause()
    })
    io.observe(canvas)

    const onVisibility = () => (document.hidden ? pause() : play())
    document.addEventListener('visibilitychange', onVisibility)

    if (reduced) {
      draw(T_DONE)
    } else {
      start = performance.now()
      play()
    }

    return () => {
      pause()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      host?.removeEventListener('pointermove', onMove)
      host?.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className={`m-network ${className}`} aria-hidden="true" />
}
