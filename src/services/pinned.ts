import { writable } from "svelte/store";

import type { ID } from "@/types/abstract";
import { localStorageGet, localStorageSet } from "./localStorage";

const STORAGE_KEY = 'pin-path';

export const pinPath = writable<ID[]>([]);

export async function getPinPath() {
  return (await localStorageGet(STORAGE_KEY))[STORAGE_KEY] as string | undefined;
}

export async function setPinPath(path: ID[]) {
  console.debug('setting pin path', path);
  pinPath.set(path);
  return await localStorageSet({ [STORAGE_KEY]: path.join(",") })
}