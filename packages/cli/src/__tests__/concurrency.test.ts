import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { pMap } from '../concurrency.ts'

describe('pMap', () => {
  it('processes all items', async () => {
    const items = [1, 2, 3, 4, 5]
    const results = await pMap(items, async (n) => n * 2, 3)

    assert.equal(results.length, 5)
    const values = results
      .filter((r): r is PromiseFulfilledResult<number> => r.status === 'fulfilled')
      .map((r) => r.value)
    assert.deepEqual(values, [2, 4, 6, 8, 10])
  })

  it('respects concurrency limit', async () => {
    let running = 0
    let peak = 0
    const concurrency = 2

    const items = Array.from({ length: 10 }, (_, i) => i)
    await pMap(
      items,
      async () => {
        running++
        peak = Math.max(peak, running)
        await new Promise((resolve) => setTimeout(resolve, 10))
        running--
      },
      concurrency,
    )

    assert.ok(peak <= concurrency, `peak concurrency was ${peak}, expected <= ${concurrency}`)
  })

  it('handles rejected promises without crashing', async () => {
    const items = [1, 2, 3]
    const results = await pMap(
      items,
      async (n) => {
        if (n === 2) throw new Error('fail')
        return n
      },
      2,
    )

    assert.equal(results.length, 3)
    assert.equal(results[0].status, 'fulfilled')
    assert.equal(results[1].status, 'rejected')
    assert.equal(results[2].status, 'fulfilled')
  })

  it('handles empty input', async () => {
    const results = await pMap([], async (n: number) => n, 5)
    assert.equal(results.length, 0)
  })
})
