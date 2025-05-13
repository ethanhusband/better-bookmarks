<script lang="ts">
  import ActionButton from "@/components/ActionButton.svelte";
  import ImportIcon from "./ImportIcon.svelte";
  import { importFolderFromZip } from "@/services/import";

  async function onImport(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      try {
        await importFolderFromZip(file);
      } catch (error) {
        console.error(`failed to import ${error}`);
      }
    }
  }
</script>

<ActionButton
  onClick={() => null}
>
  <label class="ImportButton">
    <ImportIcon />
    <p class="import-text">
      Import
    </p>
    <input
      type="file"
      on:change={onImport}
      style="position: absolute; opacity: 0; width: 0; height: 0;"
    />
  </label>
</ActionButton>

<style>
  .ImportButton {
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

  .ImportButton:hover {
    background: #1976d2;
  }

  .import-text {
    white-space: nowrap;
    font-size: 18px;
    font-family: 'Inter', sans-serif;
  }
</style>