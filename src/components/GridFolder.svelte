<script lang="ts">
  import GridIcon from "@/components/GridIcon.svelte";
  import { openModal } from "@/services/modal";
  import type { FolderNode } from '@/types/bookmarks';
  import EditModal from "./EditModal.svelte";

  export let folderNode: FolderNode;
  export let onClick: () => void;
</script>

<button
  class="folder-card"
  on:click={onClick}
  on:contextmenu|preventDefault={() => openModal([EditModal, { node: folderNode }])}
>
  <GridIcon backgroundColor="rgba(0,0,0,0.25)" backgroundColorHover="rgba(0,0,0,0.4)">
    <img class="folder-icon" src="/assets/folder.png" alt="{folderNode.title} Folder" />
  </GridIcon>
  <div class="folder-title">{folderNode.title}</div>
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

    background: rgba(0,0,0,0.1);
    backdrop-filter: blur(15px);
    border-radius: 1rem;
    position: relative;
    z-index: 1;
  }

  .folder-icon {
    width: 40px;
    height: 40px;
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