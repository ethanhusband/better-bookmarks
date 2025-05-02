<script lang="ts">
    import ListItem from "./ListItem.svelte";

  export let title: string;
  export let onClick: () => void;
</script>

<ListItem onClick={onClick}>
  <div class="ListFolder">
    <img class="folder-icon" src="/assets/folder.png" alt="{title} Folder" />
    <div class="folder-title">{title}</div>
  </div>
</ListItem>

<style>
  .ListFolder {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    padding: 8px;
    gap: 8px;
  }

  .folder-icon {
    width: 20px;
    height: 20px;
  }

  .folder-title {
    font-size: 14px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>