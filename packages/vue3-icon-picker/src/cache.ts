const cache = new Map<string, string>()
const MAX_CACHE_SIZE = 500

export function getIconFromCache(iconId: string): string | undefined {
  return cache.get(iconId)
}

export function setIconInCache(iconId: string, svg: string): void {
  if (cache.size >= MAX_CACHE_SIZE) {
    const firstKey = cache.keys().next().value
    if (firstKey) cache.delete(firstKey)
  }
  cache.set(iconId, svg)
}
