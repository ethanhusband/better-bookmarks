import { writable } from "svelte/store";

import { localStorageGet, localStorageSet } from "./localStorage";

const STORAGE_KEY = 'background-image';

export const backgroundImageUrl = writable<string>("/assets/default_bg.jpg");

export async function getBackgroundImage() {
  return (await localStorageGet(STORAGE_KEY))[STORAGE_KEY] as string | undefined;
}

export async function setBackgroundImage(file: File) {
  const dataUrl = await fileToDataUrl(file);

  console.log('SAVING BACKGROUND IMAGE AT URL', dataUrl);
  backgroundImageUrl.set(dataUrl);
  await localStorageSet({ [STORAGE_KEY]: dataUrl });
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
