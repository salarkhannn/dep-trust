export async function pMap<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  concurrency: number,
): Promise<PromiseSettledResult<R>[]> {
  const results: PromiseSettledResult<R>[] = new Array(items.length)
  let idx = 0

  async function worker() {
    while (idx < items.length) {
      const current = idx++
      try {
        const value = await fn(items[current])
        results[current] = { status: 'fulfilled', value }
      } catch (reason) {
        results[current] = { status: 'rejected', reason }
      }
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => worker())
  await Promise.all(workers)
  return results
}
