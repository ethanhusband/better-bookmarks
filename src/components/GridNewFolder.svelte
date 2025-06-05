<script lang="ts">
  import GridIcon from "@/components/GridIcon.svelte";
  import { openModal } from "@/services/modal";
  import type { ID } from "@/types/abstract";
  import CreateFolderModal from '@/components/CreateFolderModal.svelte';

  export let parentId: ID;
</script>

<button
  class="folder-card"
  on:click={() => openModal([CreateFolderModal, { parentId }])}
>
  <GridIcon backgroundColor="rgba(0,0,0,0.25)" backgroundColorHover="rgba(0,0,0,0.4)">
    <img class="add-icon" src="/assets/add.png" alt="Add" />
  </GridIcon>
  <div class="folder-title">New Folder</div>
</button>

<style>
  /* Remove default button style on the Folder */
  button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font: inherit;
    padding: 0;
    margin: 0;

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  .folder-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    padding: 8px;
    gap: 8px;
  }

  .add-icon {
    width: 32px;
    height: 32px;
  }

  .folder-title {
    font-size: 14px;
    color: white;
    text-align: center;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>