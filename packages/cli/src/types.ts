export interface ScanOptions {
  age: number
  scripts: boolean
  json: boolean
  cwd: string
}

export interface PackageMeta {
  name: string
  version: string
}

export interface FreshnessResult {
  name: string
  version: string
  publishedAt: Date | null
  ageHours: number | null
  flagged: boolean
  error: string | null
}

export interface ScriptResult {
  name: string
  scripts: string[]
  status: 'new' | 'seen' | 'allowlisted'
}

export interface LockfileDependency {
  name: string
  version: string
  integrity?: string
}

export interface SnapshotDiff {
  added: LockfileDependency[]
  removed: LockfileDependency[]
  bumped: Array<{
    name: string
    from: string
    to: string
  }>
  snapshotDate: string | null
}

export interface ScanResult {
  freshness: FreshnessResult[]
  scripts: ScriptResult[]
  diff: SnapshotDiff | null
  timestamp: string
  packageCount: number
}
