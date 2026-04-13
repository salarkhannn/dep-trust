import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { parsePackageLock, parsePnpmLock } from '../lockfile.ts'

describe('parsePackageLock', () => {
  it('parses v2/v3 packages format', () => {
    const lockfile = JSON.stringify({
      lockfileVersion: 3,
      packages: {
        '': { version: '1.0.0' },
        'node_modules/express': { version: '4.18.2', integrity: 'sha512-abc' },
        'node_modules/lodash': { version: '4.17.21' },
        'node_modules/@types/node': { version: '20.14.0' },
      },
    })

    const deps = parsePackageLock(lockfile)
    assert.equal(deps.length, 3)

    const express = deps.find((d) => d.name === 'express')
    assert.ok(express)
    assert.equal(express.version, '4.18.2')
    assert.equal(express.integrity, 'sha512-abc')

    const lodash = deps.find((d) => d.name === 'lodash')
    assert.ok(lodash)
    assert.equal(lodash.version, '4.17.21')

    const typesNode = deps.find((d) => d.name === '@types/node')
    assert.ok(typesNode)
    assert.equal(typesNode.version, '20.14.0')
  })

  it('parses v1 dependencies format', () => {
    const lockfile = JSON.stringify({
      lockfileVersion: 1,
      dependencies: {
        express: { version: '4.18.2', integrity: 'sha512-abc' },
        lodash: { version: '4.17.21' },
      },
    })

    const deps = parsePackageLock(lockfile)
    assert.equal(deps.length, 2)
    assert.equal(deps[0].name, 'express')
    assert.equal(deps[1].name, 'lodash')
  })

  it('skips entries without versions', () => {
    const lockfile = JSON.stringify({
      lockfileVersion: 3,
      packages: {
        '': {},
        'node_modules/express': { version: '4.18.2' },
        'node_modules/broken': {},
      },
    })

    const deps = parsePackageLock(lockfile)
    assert.equal(deps.length, 1)
    assert.equal(deps[0].name, 'express')
  })
})

describe('parsePnpmLock', () => {
  it('parses standard pnpm-lock.yaml format', () => {
    const content = `lockfileVersion: '9.0'

settings:
  autoInstallPeers: true

packages:

  express@4.18.2:
    resolution: {integrity: sha512-abc}
    version: '4.18.2'
    engines: {node: '>= 0.10.0'}

  lodash@4.17.21:
    resolution: {integrity: sha512-def}
    version: '4.17.21'

  '@types/node@20.14.0':
    resolution: {integrity: sha512-ghi}
    version: '20.14.0'
`

    const deps = parsePnpmLock(content)
    assert.ok(deps.length >= 2, `expected at least 2 deps, got ${deps.length}`)

    const express = deps.find((d) => d.name === 'express')
    assert.ok(express, 'express not found')
    assert.equal(express.version, '4.18.2')

    const lodash = deps.find((d) => d.name === 'lodash')
    assert.ok(lodash, 'lodash not found')
    assert.equal(lodash.version, '4.17.21')
  })

  it('handles scoped packages', () => {
    const content = `lockfileVersion: '9.0'

packages:

  '@babel/core@7.24.0':
    version: '7.24.0'

  '@types/react@18.2.0':
    version: '18.2.0'
`

    const deps = parsePnpmLock(content)
    const babel = deps.find((d) => d.name === '@babel/core')
    assert.ok(babel, '@babel/core not found')
    assert.equal(babel.version, '7.24.0')

    const typesReact = deps.find((d) => d.name === '@types/react')
    assert.ok(typesReact, '@types/react not found')
    assert.equal(typesReact.version, '18.2.0')
  })

  it('returns empty for content with no packages section', () => {
    const content = `lockfileVersion: '9.0'

settings:
  autoInstallPeers: true
`
    const deps = parsePnpmLock(content)
    assert.equal(deps.length, 0)
  })
})
