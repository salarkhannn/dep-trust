import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import type { LockfileDependency, SnapshotDiff } from '../types.ts'

interface Snapshot {
  date: string
  dependencies: Record<string, string>
}

function computeDiff(
  snapshot: Snapshot,
  current: LockfileDependency[],
): SnapshotDiff {
  const currentMap = new Map<string, string>()
  for (const dep of current) {
    currentMap.set(dep.name, dep.version)
  }

  const added: LockfileDependency[] = []
  const removed: LockfileDependency[] = []
  const bumped: SnapshotDiff['bumped'] = []

  for (const [name, version] of currentMap) {
    const oldVersion = snapshot.dependencies[name]
    if (!oldVersion) {
      added.push({ name, version })
    } else if (oldVersion !== version) {
      bumped.push({ name, from: oldVersion, to: version })
    }
  }

  for (const [name, version] of Object.entries(snapshot.dependencies)) {
    if (!currentMap.has(name)) {
      removed.push({ name, version })
    }
  }

  return { added, removed, bumped, snapshotDate: snapshot.date }
}

describe('snapshot diff', () => {
  const baseline: Snapshot = {
    date: '2025-09-14T00:00:00.000Z',
    dependencies: {
      express: '4.18.2',
      lodash: '4.17.21',
      typescript: '5.4.2',
    },
  }

  it('detects added packages', () => {
    const current: LockfileDependency[] = [
      { name: 'express', version: '4.18.2' },
      { name: 'lodash', version: '4.17.21' },
      { name: 'typescript', version: '5.4.2' },
      { name: 'semver', version: '7.6.3' },
    ]

    const diff = computeDiff(baseline, current)
    assert.equal(diff.added.length, 1)
    assert.equal(diff.added[0].name, 'semver')
    assert.equal(diff.removed.length, 0)
    assert.equal(diff.bumped.length, 0)
  })

  it('detects removed packages', () => {
    const current: LockfileDependency[] = [
      { name: 'express', version: '4.18.2' },
      { name: 'typescript', version: '5.4.2' },
    ]

    const diff = computeDiff(baseline, current)
    assert.equal(diff.removed.length, 1)
    assert.equal(diff.removed[0].name, 'lodash')
    assert.equal(diff.added.length, 0)
  })

  it('detects version bumps', () => {
    const current: LockfileDependency[] = [
      { name: 'express', version: '4.18.2' },
      { name: 'lodash', version: '4.17.21' },
      { name: 'typescript', version: '5.5.0' },
    ]

    const diff = computeDiff(baseline, current)
    assert.equal(diff.bumped.length, 1)
    assert.equal(diff.bumped[0].name, 'typescript')
    assert.equal(diff.bumped[0].from, '5.4.2')
    assert.equal(diff.bumped[0].to, '5.5.0')
  })

  it('detects combined changes', () => {
    const current: LockfileDependency[] = [
      { name: 'express', version: '4.19.0' },
      { name: 'semver', version: '7.6.3' },
    ]

    const diff = computeDiff(baseline, current)
    assert.equal(diff.added.length, 1)
    assert.equal(diff.removed.length, 2)
    assert.equal(diff.bumped.length, 1)
  })

  it('reports no changes when identical', () => {
    const current: LockfileDependency[] = [
      { name: 'express', version: '4.18.2' },
      { name: 'lodash', version: '4.17.21' },
      { name: 'typescript', version: '5.4.2' },
    ]

    const diff = computeDiff(baseline, current)
    assert.equal(diff.added.length, 0)
    assert.equal(diff.removed.length, 0)
    assert.equal(diff.bumped.length, 0)
  })
})
