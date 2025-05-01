import { mount } from 'svelte';

import Popup from '@/Popup.svelte';
import '@/index.css';

const target = document.getElementById('popup');
if (!target) {
  throw new Error('Could not find app container');
}

mount(Popup, { target });
