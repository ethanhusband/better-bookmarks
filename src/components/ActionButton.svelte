<script lang="ts">
  export let onClick: () => void;
  export let title: string | null = null;
</script>

<button title={title} class="ActionButton" on:click={onClick}>
  <slot></slot>
</button>

<style>
  .ActionButton {
    transition: transform 0.15s ease-in-out;
    transform-origin: center center;
  }

  .ActionButton:hover {
    transform: scale(1.1);
  }
</style>
