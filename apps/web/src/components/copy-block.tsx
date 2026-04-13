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
      <p className="text-xs text-muted mb-2 uppercase tracking-wide font-medium">{label}</p>
      <div className="relative group">
        <pre className="font-mono text-sm bg-terminal-bg text-terminal-text rounded-lg px-5 py-4 overflow-x-auto">
          {code}
        </pre>
        <button
          onClick={copy}
          className="absolute top-3 right-3 text-xs text-terminal-text/50 hover:text-terminal-text transition-colors font-mono cursor-pointer"
        >
          {copied ? 'copied' : 'copy'}
        </button>
      </div>
    </div>
  )
}
