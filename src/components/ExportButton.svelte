<script lang="ts">
  import ActionButton from "@/components/ActionButton.svelte";
  import ExportIcon from "./ExportIcon.svelte";
    import { exportFolderAsZip } from "@/services/export";

  export let folderId: string;
</script>

<ActionButton
  onClick={() => exportFolderAsZip(folderId)}
>
  <div class="ExportButton">
    <ExportIcon />
    <p class="export-text">
      Export
    </p>
  </div>
</ActionButton>

<style>
  .ExportButton {
    cursor: pointer;
    height: 40px;
    padding: 0px 1rem;
    display: flex;
    gap: 4px;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
    background: rgba(0,0,0,0.5);
    color: white;
  }

  .ExportButton:hover {
    background: #1976d2;
  }

  .export-text {
    white-space: nowrap;
    font-size: 18px;
    font-family: 'Inter', sans-serif;
  }
</style>