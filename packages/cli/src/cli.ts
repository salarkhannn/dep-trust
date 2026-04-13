import * as readline from 'node:readline'
import pc from 'picocolors'
import { addToAllowlist, listAllowlist } from './allowlist'
import { formatScanResult } from './formatter'
import { scan } from './scan'
import { saveSnapshot } from './snapshot'

interface CliArgs {
  command: string
  age: number
  scripts: boolean
  json: boolean
  packageName: string | null
  list: boolean
}

function parseArgs(argv: string[]): CliArgs {
  const args = argv.slice(2)
  const parsed: CliArgs = {
    command: args[0] ?? 'scan',
    age: 72,
    scripts: true,
    json: false,
    packageName: null,
    list: false,
  }

  for (let i = 1; i < args.length; i++) {
    const arg = args[i]
    switch (arg) {
      case '--age': {
        const val = parseInt(args[++i], 10)
        if (!isNaN(val)) parsed.age = val
        break
      }
      case '--no-scripts':
        parsed.scripts = false
        break
      case '--json':
        parsed.json = true
        break
      case '--list':
        parsed.list = true
        break
      default:
        if (!arg.startsWith('--')) {
          parsed.packageName = arg
        }
    }
  }

  return parsed
}

function printUsage(): void {
  console.log(`
dep-trust v0.1.0 — npm supply chain audit

Usage:
  dep-trust scan                  Run full audit
  dep-trust scan --age 24         Override freshness window (hours)
  dep-trust scan --no-scripts     Skip install script detection
  dep-trust scan --json           Output machine-readable JSON
  dep-trust snapshot              Save current lockfile as baseline
  dep-trust allow <package>       Add a package to the allowlist
  dep-trust allow --list          Print the current allowlist
`)
}

async function main(): Promise<void> {
  const cli = parseArgs(process.argv)
  const cwd = process.cwd()

  switch (cli.command) {
    case 'scan': {
      let spinner: ReturnType<typeof setInterval> | undefined
      if (!cli.json) {
        const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
        let i = 0
        process.stdout.write('\\x1B[?25l')
        spinner = setInterval(() => {
          readline.cursorTo(process.stdout, 0)
          process.stdout.write(`  ${pc.dim(frames[i++ % frames.length])} scanning dependencies...`)
        }, 80)
      }

      try {
        const result = await scan({
          age: cli.age,
          scripts: cli.scripts,
          json: cli.json,
          cwd,
        })

        if (!cli.json) {
          if (spinner) clearInterval(spinner)
          readline.clearLine(process.stdout, 0)
          readline.cursorTo(process.stdout, 0)
          process.stdout.write('\\x1B[?25h')
          console.log(formatScanResult(result))
        } else {
          console.log(JSON.stringify(result, null, 2))
        }
      } finally {
        if (spinner) {
          clearInterval(spinner)
          process.stdout.write('\\x1B[?25h')
        }
      }
      break
    }

    case 'snapshot': {
      saveSnapshot(cwd)
      console.log('Snapshot saved to .dep-trust/snapshot.json')
      break
    }

    case 'allow': {
      if (cli.list) {
        const entries = listAllowlist(cwd)
        if (entries.length === 0) {
          console.log('Allowlist is empty.')
        } else {
          console.log('Allowlisted packages:')
          for (const name of entries) {
            console.log(`  ${name}`)
          }
        }
      } else if (cli.packageName) {
        addToAllowlist(cwd, cli.packageName)
        console.log(`Added ${cli.packageName} to allowlist.`)
      } else {
        console.log('Usage: dep-trust allow <package> or dep-trust allow --list')
      }
      break
    }

    case '--help':
    case '-h':
    case 'help':
      printUsage()
      break

    default:
      printUsage()
      process.exit(1)
  }
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : 'unexpected error')
  process.exit(1)
})
