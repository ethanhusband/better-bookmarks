<script lang="ts">
  import type { ID } from "@/types/abstract";
  import ActionButton from "./ActionButton.svelte";
  import { pinPath, setPinPath } from "@/services/pinned";
  
  export let path: ID[];
  export let title: string;

  let active: boolean = false;

  $: active = $pinPath.join(",") === path.join(",");
</script>

<ActionButton
  title="Open {title} in every New Tab"
  onClick={() => setPinPath(active ? ['root'] : path)}
>
  <div
    class="PinOpen"
    style="
      background-color: {active ? '#1976d2' : 'white'};
      color: {active ? 'white' : 'black'};
      border: 1px solid {active ? 'black' : 'rgba(0,0,0,0.5)'};
    "
  >
    {#if active} 
      <p class="pin-text">
        Pinned 📌
      </p>
    {:else}
      <p class="pin-text">
        Pin 📌
      </p>
    {/if}
  </div>
</ActionButton>

<style>
  .PinOpen {
    height: 40px;
    padding: 0px 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
  }

  .pin-text {
    white-space: nowrap;
    font-size: 18px;
    font-family: 'Inter', sans-serif;
  }
</style>