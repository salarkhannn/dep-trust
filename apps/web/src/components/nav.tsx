'use client'

import { useState } from 'react'

export function Nav() {
  const [copied, setCopied] = useState(false)

  async function copyInstall() {
    await navigator.clipboard.writeText('npm install -g dep-trust')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="/" className="font-mono font-bold text-sm tracking-tight">
          dep-trust
        </a>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/dep-trust/dep-trust"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <button
            onClick={copyInstall}
            className="text-sm font-mono px-3 py-1.5 bg-foreground text-white rounded hover:bg-foreground/90 transition-colors cursor-pointer"
          >
            {copied ? 'copied!' : 'npm install dep-trust'}
          </button>
        </div>
      </div>
    </nav>
  )
}
