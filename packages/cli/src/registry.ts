interface RegistryTime {
  [version: string]: string
  modified: string
  created: string
}

interface RegistryResponse {
  time?: RegistryTime
}

export interface PackagePublishInfo {
  name: string
  version: string
  publishedAt: Date | null
  error: string | null
}

export async function fetchPackageInfo(name: string, version: string): Promise<PackagePublishInfo> {
  try {
    const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(name)}`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(10_000),
    })

    if (!response.ok) {
      return { name, version, publishedAt: null, error: `HTTP ${response.status}` }
    }

    const pkg = (await response.json()) as RegistryResponse
    const timestamp = pkg.time?.[version]

    if (!timestamp) {
      return { name, version, publishedAt: null, error: 'version not found in registry' }
    }

    return { name, version, publishedAt: new Date(timestamp), error: null }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown error'
    return { name, version, publishedAt: null, error: `registry unreachable for ${name}: ${message}` }
  }
}
