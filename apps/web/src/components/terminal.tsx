export function Terminal() {
  return (
    <div className="rounded-lg overflow-hidden border border-terminal-border bg-terminal-bg">
      <div className="px-5 py-5 font-mono text-xs leading-7 overflow-x-auto">
        <Line dim>$ dep-trust scan</Line>
        <Blank />
        <Line display bold>dep-trust v0.1.0</Line>
        <Line dim>scanning 142 packages...</Line>
        <Blank />
        <Line display bold>FRESHNESS</Line>
        <Line>
          {'  '}
          <R>✗</R>
          {'  '}
          <R>lodash</R>
          <span className="text-terminal-text">{'        4.17.22   published 6h ago'}</span>
        </Line>
        <Line>
          {'  '}
          <R>✗</R>
          {'  '}
          <R>axios</R>
          <span className="text-terminal-text">{'         1.7.4     published 18h ago'}</span>
        </Line>
        <Line>
          {'  '}
          <G>✓</G>
          {'  '}
          <span className="text-terminal-dim">express       4.18.2    published 43d ago</span>
        </Line>
        <Blank />
        <Line display bold>INSTALL SCRIPTS</Line>
        <Line>
          {'  '}
          <R>✗</R>
          {'  '}
          <R>esbuild</R>
          {'       '}
          <R>NEW</R>
          <span className="text-terminal-text">{'       has postinstall script'}</span>
        </Line>
        <Line>
          {'  '}
          <span className="text-terminal-dim">~  node-gyp      SEEN      has install script</span>
        </Line>
        <Blank />
        <Line display bold>LOCKFILE DIFF</Line>
        <Line>
          {'  '}
          <G>+</G>
          <span className="text-terminal-text">{'  added:    semver@7.6.3'}</span>
        </Line>
        <Line>
          {'  '}
          <W>↑</W>
          <span className="text-terminal-text">{'  bumped:   typescript 5.4.2 → 5.5.0'}</span>
        </Line>
        <Blank />
        <Line display bold>
          {'SUMMARY  '}
          <R>2 freshness flags</R>
          {'   '}
          <R>1 new install script</R>
          {'   '}
          <W>2 lockfile changes</W>
        </Line>
      </div>
    </div>
  )
}

function Blank() {
  return <div className="h-3" />
}

function Line({
  children,
  dim,
  display,
  bold,
}: {
  children: React.ReactNode
  dim?: boolean
  display?: boolean
  bold?: boolean
}) {
  const color = dim ? 'text-terminal-dim' : display ? 'text-terminal-display' : 'text-terminal-text'
  const weight = bold ? 'font-bold' : ''
  return <div className={`${color} ${weight}`}>{children}</div>
}

function R({ children }: { children: React.ReactNode }) {
  return <span className="text-[#D71921]">{children}</span>
}

function G({ children }: { children: React.ReactNode }) {
  return <span className="text-[#4A9E5C]">{children}</span>
}

function W({ children }: { children: React.ReactNode }) {
  return <span className="text-[#D4A843]">{children}</span>
}
