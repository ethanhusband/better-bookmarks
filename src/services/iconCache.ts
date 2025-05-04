import { storageGet, storageSet } from "./storage";

export async function getCachedIcon(bookmarkUrl: string): Promise<string | undefined> {
  const cacheKey = `bookmark-icon-${bookmarkUrl}`;
  const cacheResult = await storageGet<string | undefined>(cacheKey);
  console.log('cache result for', cacheKey, 'is', cacheResult);
  return cacheResult[cacheKey];
}

export async function setCachedIcon(bookmarkUrl: string, iconUrl: string): Promise<void> {
  const cacheKey = `bookmark-icon-${bookmarkUrl}`;
  await storageSet({
    [cacheKey]: iconUrl
  });
}