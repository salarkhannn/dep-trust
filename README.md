# dep-trust

A developer security tool that protects Node.js projects from npm supply chain attacks. It flags recently updated dependencies, detects suspicious install scripts, and diffs the current lockfile against a known-good snapshot.

## Monorepo structure

```
dep-trust/
├── packages/
│   └── cli/           # The npm package (dep-trust)
├── apps/
│   └── web/           # Marketing site (Next.js)
├── pnpm-workspace.yaml
├── package.json
└── tsconfig.base.json
```

## Prerequisites

- Node.js 18+
- pnpm 9+

## Setup

```sh
pnpm install
```

## CLI development

```sh
# Build the CLI
cd packages/cli
pnpm build

# Run directly (without building)
npx tsx src/cli.ts scan

# Run tests
pnpm test
```

### CLI usage

```sh
dep-trust scan                  # Run full audit
dep-trust scan --age 24         # Override freshness window to 24h
dep-trust scan --no-scripts     # Skip install script detection
dep-trust scan --json           # Output machine-readable JSON
dep-trust snapshot              # Save current lockfile as baseline
dep-trust allow <package>       # Add a package to the allowlist
dep-trust allow --list          # Print the current allowlist
```

## Marketing site

```sh
cd apps/web
pnpm dev       # Start dev server on localhost:3000
pnpm build     # Production build
```

## Testing

```sh
# Run CLI tests
cd packages/cli
pnpm test

# Or from root
pnpm -r test
```

## Publishing

```sh
cd packages/cli
pnpm build
npm publish
```

## License

MIT
