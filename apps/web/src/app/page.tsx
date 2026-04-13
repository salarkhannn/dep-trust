import { Nav } from '@/components/nav'
import { Terminal } from '@/components/terminal'
import { CopyBlock } from '@/components/copy-block'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <main className="flex-1">
        {/* Hero */}
        <section className="px-6 pt-28 pb-20 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            Know what your
            <br />
            dependencies are doing.
          </h1>
          <p className="mt-6 text-lg text-muted max-w-xl leading-relaxed">
            dep-trust scans your npm dependency tree for supply chain attack indicators — recently
            published packages, suspicious install scripts, and unexpected lockfile changes.
          </p>
          <div className="mt-8">
            <a
              href="https://github.com/dep-trust/dep-trust"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
            >
              View on GitHub →
            </a>
          </div>
          <div className="mt-12">
            <Terminal />
          </div>
        </section>

        {/* Problem */}
        <section className="px-6 py-20 border-t border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight">The problem</h2>
            <div className="mt-8 space-y-6 text-base leading-relaxed text-muted">
              <p>
                npm supply chain attacks work by publishing compromised versions of popular packages.
                The attacker gains access to a maintainer account, pushes a malicious patch, and
                every downstream project that installs or updates inherits the payload. The attack
                window is typically hours — not days.
              </p>
              <p>
                <span className="text-foreground font-medium">npm audit doesn&apos;t catch this.</span>{' '}
                It checks for known CVEs, not for packages that were published suspiciously recently,
                or for install scripts that run arbitrary code during{' '}
                <code className="font-mono text-sm bg-gray-100 px-1.5 py-0.5 rounded">
                  npm install
                </code>
                .
              </p>
              <p>
                dep-trust fills the gap. It flags freshly published dependencies, detects install
                hook scripts, and diffs your lockfile against a known-good snapshot to surface
                unexpected changes before they reach production.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="px-6 py-20 border-t border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
            <ol className="mt-10 space-y-8">
              <li className="flex gap-5">
                <span className="text-sm font-mono font-bold text-accent mt-0.5">01</span>
                <div>
                  <p className="font-semibold">Freshness check</p>
                  <p className="mt-1 text-muted text-sm leading-relaxed">
                    Queries the npm registry for publish timestamps. Flags any dependency whose
                    latest version was pushed within the last 72 hours — the primary attack window.
                  </p>
                </div>
              </li>
              <li className="flex gap-5">
                <span className="text-sm font-mono font-bold text-accent mt-0.5">02</span>
                <div>
                  <p className="font-semibold">Install script detection</p>
                  <p className="mt-1 text-muted text-sm leading-relaxed">
                    Scans every package in node_modules for preinstall, install, and postinstall
                    hooks. New scripts are highlighted; allowlisted packages are de-emphasized.
                  </p>
                </div>
              </li>
              <li className="flex gap-5">
                <span className="text-sm font-mono font-bold text-accent mt-0.5">03</span>
                <div>
                  <p className="font-semibold">Lockfile diff</p>
                  <p className="mt-1 text-muted text-sm leading-relaxed">
                    Snapshots your lockfile on first run. On subsequent runs, diffs the current state
                    against the baseline to surface added, removed, and bumped packages.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Install */}
        <section className="px-6 py-20 border-t border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight">Get started</h2>
            <div className="mt-8 space-y-4">
              <CopyBlock code="npm install -g dep-trust" label="Install globally" />
              <CopyBlock
                code={`dep-trust scan\ndep-trust scan --age 24\ndep-trust snapshot`}
                label="Run a scan"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
