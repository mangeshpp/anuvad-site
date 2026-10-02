# Anuvad website - start the dev server.
#
#   From a terminal in this folder:  .\run-dev.ps1
#
# Installs packages the first time, then starts Vite and opens the browser.
# Ctrl+C stops it.
#
# NOTE: this file is deliberately plain ASCII. Windows PowerShell 5.1 reads
# .ps1 files in the legacy system codepage unless they carry a BOM, so any
# accented or typographic character (a long dash, curly quotes) arrives as
# mojibake and can break string parsing. Keep it ASCII-only.

$ErrorActionPreference = 'Stop'
Set-Location -Path $PSScriptRoot

# --- Node check --------------------------------------------------------------
$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) {
    Write-Host ""
    Write-Host "Node.js is not installed, or not on PATH." -ForegroundColor Red
    Write-Host "Install the LTS build from https://nodejs.org (Windows ARM64), then"
    Write-Host "close and reopen this terminal so PATH picks it up."
    Write-Host ""
    Read-Host "Press Enter to close"
    exit 1
}

$major = [int](((node -v) -replace '^v', '') -split '\.')[0]
if ($major -lt 18) {
    Write-Host ("Node " + (node -v) + " is too old. This project needs 18 or newer.") -ForegroundColor Red
    Read-Host "Press Enter to close"
    exit 1
}
Write-Host ("Node " + (node -v)) -ForegroundColor DarkGray

# --- Install (first run only) ------------------------------------------------
if (-not (Test-Path 'node_modules')) {
    Write-Host "Installing packages. This takes a minute the first time..." -ForegroundColor Cyan
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "npm install failed. Scroll up for the reason." -ForegroundColor Red
        Read-Host "Press Enter to close"
        exit 1
    }
}

# --- Run ---------------------------------------------------------------------
Write-Host ""
Write-Host "Starting at http://localhost:5173 - press Ctrl+C to stop" -ForegroundColor Green
Write-Host ""
Start-Sleep -Seconds 2
Start-Process 'http://localhost:5173'
npm run dev
