import { writable } from 'svelte/store';

const media = window.matchMedia('(prefers-color-scheme: dark)');

// track whether dark mode is active
export const isDarkMode = writable(media.matches);

// listen for theme changes
media.addEventListener('change', (e) => {
  isDarkMode.set(e.matches);
});