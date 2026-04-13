import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import type { FreshnessResult } from '../types.ts'

function evaluateFreshness(
  publishedAt: Date | null,
  maxAgeHours: number,
): Pick<FreshnessResult, 'ageHours' | 'flagged'> {
  if (!publishedAt) return { ageHours: null, flagged: false }
  const ageMs = Date.now() - publishedAt.getTime()
  const ageHours = Math.round(ageMs / 3_600_000)
  return { ageHours, flagged: ageHours < maxAgeHours }
}

describe('freshness evaluation', () => {
  it('flags packages published within the threshold', () => {
    const twoHoursAgo = new Date(Date.now() - 2 * 3_600_000)
    const check = evaluateFreshness(twoHoursAgo, 72)

    assert.ok(check.flagged)
    assert.ok(check.ageHours !== null && check.ageHours < 72)
  })

  it('passes packages published beyond the threshold', () => {
    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 3_600_000)
    const check = evaluateFreshness(ninetyDaysAgo, 72)

    assert.ok(!check.flagged)
    assert.ok(check.ageHours !== null && check.ageHours >= 72)
  })

  it('handles null publishedAt gracefully', () => {
    const check = evaluateFreshness(null, 72)

    assert.equal(check.ageHours, null)
    assert.equal(check.flagged, false)
  })

  it('respects custom age threshold', () => {
    const twelveHoursAgo = new Date(Date.now() - 12 * 3_600_000)

    const strict = evaluateFreshness(twelveHoursAgo, 24)
    assert.ok(strict.flagged)

    const lenient = evaluateFreshness(twelveHoursAgo, 6)
    assert.ok(!lenient.flagged)
  })

  it('flags packages published moments ago', () => {
    const justNow = new Date()
    const check = evaluateFreshness(justNow, 72)

    assert.ok(check.flagged)
    assert.equal(check.ageHours, 0)
  })
})
