<script lang="ts">
  export let title: string;
  export let onClick: () => void;
</script>

<button class="folder-card" onclick={onClick}>
  <div class="folder-icon-wrapper">
    <img class="folder-icon" src="/assets/folder.png" alt="{title} Folder" />
  </div>
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
    width: 50px;
    height: 50px;
  }

  .folder-icon-wrapper {
    width: 75px;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f7f7f7;
    border-radius: 25px;
    padding: 4px;
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