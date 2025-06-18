<script lang="ts">
  import { dndzone } from 'svelte-dnd-action';
  import type { TreeNode } from '@/types/bookmarks';

  export let items: TreeNode[];
</script>


<div 
  class="Grid"
  use:dndzone={{ 
    items,
    flipDurationMs: 150,
    dragDisabled: false,
    type: 'shared',
    dropTargetStyle: { outline: '2px solid #007bff' }
  }}
  on:consider
  on:finalize
>
  <slot></slot>
</div>

<style>
  .Grid {
    border-radius: 10px;
    padding: 0.5rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);   /* create as many 100px columns as will fit, then wrap */
    grid-auto-rows: auto;
    gap: 1rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
  }
</style>