import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: { cli: 'src/cli.ts' },
    format: 'esm',
    target: 'node18',
    dts: false,
    clean: true,
    banner: { js: '#!/usr/bin/env node' },
  },
  {
    entry: { scan: 'src/scan.ts' },
    format: 'esm',
    target: 'node18',
    dts: true,
    clean: false,
  },
])
