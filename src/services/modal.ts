import { writable } from "svelte/store";
import type { SvelteComponent } from 'svelte';

type ModalWithArgs = [component: typeof SvelteComponent, props?: Record<string, any>];

export const modal = writable<ModalWithArgs | null>(null);

export function openModal(newModal: ModalWithArgs) {
  modal.set(newModal);
}

export function closeModal() {
  modal.set(null);
}
