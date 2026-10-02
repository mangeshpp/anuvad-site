# Publishing anuvadsoftware.com on the Hostinger VPS

Runbook for putting this site live on the existing VPS and moving the domain off Wix.

## What is already there

| | |
|---|---|
| VPS | `srv1975195.hstgr.cloud`, KVM 2, Ubuntu |
| IP | `82.25.112.1` |
| Already serving | `fiscora.tech`, `brimline.anuvadsoftware.com` |
| Web server | Nginx (already installed and running both sites) |

**This site is a third Nginx server block on the same machine.** Nothing about the
two running sites changes. The whole build is static files, so it costs almost no
memory next to the two applications already there.

Because `brimline.anuvadsoftware.com` already answers on this IP, the DNS zone for
`anuvadsoftware.com` can already point names at the VPS. Only the root (`@`) and
`www` still go to Wix.

---

## Order of work

Do it in this order. The site is fully live and tested on a temporary address
*before* the domain is touched, so the Wix switch-over is the last and smallest step.

1. Build the site
2. Upload it to the VPS
3. Add the Nginx server block
4. Test it without DNS
5. Point the domain away from Wix
6. Issue the SSL certificate

---

## 1. Build (on your laptop)

```powershell
cd D:\AnuvadPortal
npm install
npm run build
```

This produces `D:\AnuvadPortal\dist` — plain HTML, CSS, JS and images. That folder
is the entire website. Nothing is installed on the server.

## 2. Upload

Windows 10 and 11 include `scp`, so PowerShell can do this with no extra software.

```powershell
# create the folder on the server (first time only)
ssh root@82.25.112.1 "mkdir -p /var/www/anuvadsoftware"

# copy the built site up
scp -r D:\AnuvadPortal\dist\* root@82.25.112.1:/var/www/anuvadsoftware/
```

Prefer a GUI? WinSCP works fine — connect to `82.25.112.1` as `root` and drag the
contents of `dist` into `/var/www/anuvadsoftware`.

> Copy the **contents** of `dist`, not the `dist` folder itself. You want
> `/var/www/anuvadsoftware/index.html`, not `/var/www/anuvadsoftware/dist/index.html`.

## 3. Nginx server block

SSH in:

```bash
ssh root@82.25.112.1
```

Create the config:

```bash
nano /etc/nginx/sites-available/anuvadsoftware
```

Paste the contents of `deploy/nginx.conf` from this repo, then:

```bash
ln -s /etc/nginx/sites-available/anuvadsoftware /etc/nginx/sites-enabled/
nginx -t          # must say "syntax is ok" and "test is successful"
systemctl reload nginx
```

`nginx -t` is the safety gate. If it reports an error, **do not reload** — fix the
file first. A reload with a broken config is what takes the other two sites down.

**The SPA fallback in that config is not optional.** Without
`try_files $uri $uri/ /index.html;`, someone opening
`anuvadsoftware.com/products/akhani` directly, or refreshing that page, gets a 404 —
even though clicking through to it from the home page works.

## 4. Test before touching DNS

You can prove the server is serving correctly before the domain moves. On your
laptop, add a temporary line to
`C:\Windows\System32\drivers\etc\hosts` (open Notepad as Administrator):

```
82.25.112.1  anuvadsoftware.com www.anuvadsoftware.com
```

Now your machine — and only your machine — resolves the domain to the VPS. Open
`http://anuvadsoftware.com`, click through every page, refresh on a product page to
confirm the fallback works.

**Remove those two lines when you are done testing.** If you leave them, you will
keep seeing your own machine's answer and think DNS has not propagated.

## 5. Point the domain away from Wix

### Before you change anything: write down the current DNS records

In the Wix DNS panel, screenshot or copy **every** record — especially:

- `MX` records (email delivery)
- `TXT` records (SPF, DKIM, domain verification)
- the existing `A` record for `brimline`
- any `CNAME` records

> **Email is the real risk here, not the website.**
> If `info@anuvadsoftware.com` receives mail, that works because of the `MX` records
> in this zone. Lose them and mail stops arriving — usually silently, with senders
> getting bounces you never see. Whichever option you pick below, confirm the MX
> records are intact afterwards and send yourself a test email from an outside
> account.

### Option A — stay on Wix DNS, repoint the root (recommended)

Least disruption: the zone stays where it is, so MX, TXT and the brimline record are
never at risk. You only change two records.

1. In Wix: **Domains → anuvadsoftware.com → Disconnect from site** (or *Assign to a
   different site*). While a Wix site is connected, Wix locks the root records and
   will not let you edit them.
2. Then **Advanced → Edit DNS records** and set:

   | Type | Host | Points to | TTL |
   |---|---|---|---|
   | A | `@` | `82.25.112.1` | 1 hour |
   | A | `www` | `82.25.112.1` | 1 hour |

   If Wix already has `@` / `www` pointing at its own servers, edit those rather than
   adding duplicates. Two A records on the same name send traffic to both.
3. Leave every other record exactly as it was.

### Option B — move nameservers to Hostinger

Take this route if Wix will not release the root records, or if you would rather
manage all DNS in hPanel alongside the VPS.

1. In hPanel, add `anuvadsoftware.com` as a domain so a DNS zone exists.
2. **Recreate every record from your screenshot first** — MX, TXT, brimline, all of
   it. Do this *before* step 3, so the zone is complete the moment it goes live.
3. Add the A records for `@` and `www` pointing to `82.25.112.1`.
4. In Wix, change the nameservers to Hostinger's:
   `ns1.dns-parking.com` and `ns2.dns-parking.com`.
   Confirm these in hPanel rather than trusting this note — Hostinger's nameservers
   can differ by account.

Nameserver changes take longer to settle than record changes, typically a few hours
and up to 24. Records you forgot to recreate simply stop existing during that window.

### Either way

Changes are not instant. Expect anywhere from a few minutes to a few hours, and
longer for people whose ISP caches aggressively. Check progress from outside your
own network — `dnschecker.org` shows what the rest of the world currently sees.

Verify from PowerShell:

```powershell
nslookup anuvadsoftware.com 8.8.8.8
nslookup www.anuvadsoftware.com 8.8.8.8
nslookup -type=mx anuvadsoftware.com 8.8.8.8   # confirm email records survived
```

The first two should answer `82.25.112.1`.

## 6. SSL certificate

Only once DNS resolves to the VPS — the certificate authority verifies by fetching a
file over the public domain, so this fails if the domain still points at Wix.

```bash
certbot --nginx -d anuvadsoftware.com -d www.anuvadsoftware.com
```

This adds its own certificate without touching the ones already issued for
`fiscora.tech` and `brimline.anuvadsoftware.com`, and rewrites the server block to
redirect HTTP to HTTPS. Renewal is automatic.

Confirm the timer is active:

```bash
systemctl status certbot.timer
```

---

## Redeploying after a change

Every later update is two commands:

```powershell
cd D:\AnuvadPortal
npm run build
scp -r D:\AnuvadPortal\dist\* root@82.25.112.1:/var/www/anuvadsoftware/
```

No Nginx reload, no downtime — you are replacing static files in place.

If you have a bash shell available (Git Bash, WSL), `./deploy/deploy.sh` does the
build, the upload and the reload in one step.

---

## The subdomains

| Host | Status |
|---|---|
| `fiscora.tech` | Live on this VPS |
| `brimline.anuvadsoftware.com` | Live on this VPS |
| `akhani.anuvadsoftware.com` | Linked from the site — needs an A record and its own server block |
| `anuvadsoftware.com` + `www` | This site |

The website links to `akhani.anuvadsoftware.com`. Until that host resolves and
serves something, those links are dead ends — worth sorting before you announce the
new site. `deploy/nginx.conf` has a commented server-block template for a subdomain
that proxies to an application port.

Hostinger's plan allows five published sites; this is the third.

---

## If something goes wrong

**The other two sites went down.** Almost always a bad Nginx config that was reloaded
without `nginx -t` passing. `nginx -t` names the file and line. Fix it, or
`rm /etc/nginx/sites-enabled/anuvadsoftware` and reload to get back to where you were.

**The domain shows the old Wix site.** Either DNS has not propagated yet, or your
machine is caching. `ipconfig /flushdns` in PowerShell, then check on mobile data
with Wi-Fi off — a completely separate network is the honest test.

**Pages 404 on refresh.** The SPA fallback is missing from the server block. See
step 3.

**Certbot fails.** DNS is not pointing at the VPS yet, or port 80 is blocked. It must
be able to reach `http://anuvadsoftware.com` from the public internet.

**Email stopped.** Restore the MX records from your screenshot immediately. This is
why you take that screenshot.
