import TTLCache from "@isaacs/ttlcache";

declare global {
  // This preserves the LRU cache during development
  // eslint-disable-next-line
  var ttlCache: (TTLCache<string, any> & { name: string }) | undefined;
}

const cache = (global.ttlCache = global.ttlCache
  ? global.ttlCache
  : createTtlCache());

function createTtlCache() {
  // doing anything other than "any" here was a big pain
  const newCache = new TTLCache<string, any>({
    max: 1000,
    ttl: 1000 * 60 * 60 * 4, // 4 hour
  });
  Object.assign(newCache, { name: "LRU" });
  return newCache as typeof newCache & { name: "LRU" };
}

export { cache };
