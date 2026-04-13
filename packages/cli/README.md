# dep-trust

Scan your npm dependencies for supply chain attack indicators.

`dep-trust` is a highly focused developer security tool. Rather than checking for reported CVEs (which are often historical), it protects you from active supply chain compromises by identifying suspicious timing and behavior inside your dependency tree.

## Installation

Install globally to use the CLI against any project:

```sh
npm install -g dep-trust
```

Or run it directly via `npx`:

```sh
npx dep-trust scan
```

## Features

1. **Freshness Checks**: Flags any dependency whose latest version was published within the last 72 hours—the critical window before an attack is reported.
2. **Install Script Detection**: Identifies packages running `preinstall`, `install`, or `postinstall` scripts, highlighting new ones you haven't seen before.
3. **Lockfile Diffing**: Snapshots your lockfile and alerts you to unexpected additions, removals, or version bumps on subsequent runs.

## Usage

Run a full audit in your project directory:

```sh
dep-trust scan
```

### Options

```text
dep-trust scan                  # Run full audit
dep-trust scan --age 24         # Override freshness window to 24h
dep-trust scan --no-scripts     # Skip install script detection
dep-trust scan --json           # Output machine-readable JSON
dep-trust snapshot              # Save current lockfile as baseline
dep-trust allow <package>       # Add a package to the allowlist
dep-trust allow --list          # Print the current allowlist
```

## How It Works

- **Concurrency**: Fast, batched queries limiting npm registry load (max 10 concurrent requests).
- **Parsers**: Custom, line-by-line parsers for `pnpm-lock.yaml` and `package-lock.json` avoiding massive memory overhead.
- **Privacy First**: Only queries the standard npm registry directly. No local source code is transmitted.

## License

MIT
