<script lang="ts">
    import GridIcon from "./GridIcon.svelte";

  export let title: string;
  export let onClick: () => void;
</script>

<button class="folder-card" onclick={onClick}>
  <GridIcon backgroundColor="rgba(0,0,0,0.25)" backgroundColorHover="rgba(0,0,0,0.4)">
    <img class="folder-icon" src="/assets/folder.png" alt="{title} Folder" />
  </GridIcon>
  <div class="folder-title">{title}</div>
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