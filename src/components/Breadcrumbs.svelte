<script lang="ts">
  import type { Breadcrumb } from "../types/breadcrumb";

  export let breadcrumbs: Breadcrumb[];
  export let onCrumbClick: (folderId: string | null) => void;
</script>

<div class="breadcrumbs">
  {#each breadcrumbs as crumb}
    <button class="crumb" on:click={() => onCrumbClick(crumb.id)}>
      <p class="crumbText">{crumb.title || '…'}</p>
    </button>
  {/each}
</div>

<style>

</style>