export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="max-w-5xl mx-auto flex items-center justify-between text-xs text-muted">
        <span>© {new Date().getFullYear()} dep-trust</span>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/dep-trust/dep-trust"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/dep-trust"
            className="hover:text-foreground transition-colors"
          >
            npm
          </a>
        </div>
      </div>
    </footer>
  )
}
