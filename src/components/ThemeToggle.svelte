<!-- src/components/ThemeToggle.svelte -->
<script lang="ts">
  import { isDarkMode } from '@/services/theme';

  export let scale: number = 1;          // 1 = 100%, 0.8 = 80%, etc.

  function onToggle(e: Event) {
    isDarkMode.set(!$isDarkMode);
  }
</script>

<button on:click={onToggle} class="theme-toggle" style="--s: {scale}">
  <div class="icon">{$isDarkMode ? '🌙' : '🌞'}</div>
  <label class="switch">
    <input
      type="checkbox"
      checked={$isDarkMode}
      on:change={onToggle}
      />
    <span class="slider"></span>
  </label>
</button>

<style>
  .theme-toggle {
    /* CSS var --s controls scale */
    --s: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: calc(1.2rem * var(--s));
    user-select: none;

    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: calc(36px * var(--s));
    height: calc(20px * var(--s));
    margin-top: calc(4px * var(--s));
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: #ccc;
    border-radius: calc(20px * var(--s));
    transition: background-color 0.2s;
  }
  .slider::before {
    position: absolute;
    content: "";
    height: calc(16px * var(--s));
    width: calc(16px * var(--s));
    left: calc(2px * var(--s));
    bottom: calc(2px * var(--s));
    background-color: white;
    border-radius: 50%;
    transition: transform 0.2s;
  }

  input:checked + .slider {
    background-color: #4a90e2;
  }
  input:checked + .slider::before {
    transform: translateX(calc(16px * var(--s)));
  }
</style>