'use client'

import { useState } from 'react'

interface CopyBlockProps {
  code: string
  label: string
}

export function CopyBlock({ code, label }: CopyBlockProps) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-secondary mb-3">
        {label}
      </p>
      <div className="relative group">
        <pre className="font-mono text-sm bg-terminal-bg text-terminal-text rounded-lg border border-terminal-border px-5 py-4 overflow-x-auto">
          {code}
        </pre>
        <button
          onClick={copy}
          className="absolute top-3 right-3 font-mono text-[11px] uppercase tracking-[0.06em] text-terminal-dim hover:text-terminal-text transition-colors duration-200 cursor-pointer"
        >
          {copied ? '[COPIED]' : '[COPY]'}
        </button>
      </div>
    </div>
  )
}
