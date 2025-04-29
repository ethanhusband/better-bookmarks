/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="chrome" />

declare module '*.svelte' {
  const component: any;
  export default component;
}