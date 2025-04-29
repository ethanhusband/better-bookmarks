import { mount } from 'svelte';

import App from '@/Popup.svelte';
import '@/index.css';

const target = document.getElementById('app');
if (!target) {
  throw new Error('Could not find app container');
}

mount(App, { target });
