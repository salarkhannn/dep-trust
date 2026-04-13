export function Terminal() {
  return (
    <div className="rounded-lg overflow-hidden border border-border">
      <div className="bg-terminal-bg px-5 py-4 font-mono text-xs leading-6 overflow-x-auto">
        <Line dim>$ dep-trust scan</Line>
        <Line dim>&nbsp;</Line>
        <Line bright>dep-trust v0.1.0</Line>
        <Line dim>scanning 142 packages...</Line>
        <Line dim>&nbsp;</Line>
        <Line bright>FRESHNESS</Line>
        <Line>
          {'  '}
          <R>✗</R>
          {'  '}
          <span className="text-red-400">lodash</span>
          {'        4.17.22   published 6h ago'}
        </Line>
        <Line>
          {'  '}
          <R>✗</R>
          {'  '}
          <span className="text-red-400">axios</span>
          {'         1.7.4     published 18h ago'}
        </Line>
        <Line>
          {'  '}
          <G>✓</G>
          {'  '}
          <span className="text-terminal-text/50">express       4.18.2    published 43d ago</span>
        </Line>
        <Line dim>&nbsp;</Line>
        <Line bright>INSTALL SCRIPTS</Line>
        <Line>
          {'  '}
          <R>✗</R>
          {'  '}
          <span className="text-red-400">esbuild</span>
          {'       '}
          <span className="text-red-400">NEW</span>
          {'       has postinstall script'}
        </Line>
        <Line>
          {'  '}
          <span className="text-terminal-text/50">~  node-gyp      SEEN      has install script</span>
        </Line>
        <Line dim>&nbsp;</Line>
        <Line bright>LOCKFILE DIFF</Line>
        <Line>
          {'  '}
          <G>+</G>
          {'  added:    semver@7.6.3'}
        </Line>
        <Line>
          {'  '}
          <Y>↑</Y>
          {'  bumped:   typescript 5.4.2 → 5.5.0'}
        </Line>
        <Line dim>&nbsp;</Line>
        <Line bright>
          SUMMARY{'  '}
          <R>2 freshness flags</R>
          {'   '}
          <R>1 new install script</R>
          {'   '}
          <Y>2 lockfile changes</Y>
        </Line>
      </div>
    </div>
  )
}

function Line({ children, dim, bright }: { children: React.ReactNode; dim?: boolean; bright?: boolean }) {
  const className = dim
    ? 'text-terminal-text/40'
    : bright
      ? 'text-white font-semibold'
      : 'text-terminal-text'
  return <div className={className}>{children}</div>
}

function R({ children }: { children: React.ReactNode }) {
  return <span className="text-red-400">{children}</span>
}

function G({ children }: { children: React.ReactNode }) {
  return <span className="text-green-400">{children}</span>
}

function Y({ children }: { children: React.ReactNode }) {
  return <span className="text-yellow-400">{children}</span>
}
