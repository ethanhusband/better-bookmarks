<script lang="ts">
  import { LevelNavigator } from "@/lib/LevelNavigator";
  import { isDarkMode } from '@/services/theme';
  import Breadcrumbs from "@/components/Breadcrumbs.svelte";
  import List from "@/components/List.svelte";
  import ListBookmark from "@/components/ListBookmark.svelte";
  import ListFolder from "@/components/ListFolder.svelte";
  import ThemeToggle from "./components/ThemeToggle.svelte";
  import HorizontalLine from "./components/HorizontalLine.svelte";
  import { type FolderNode } from "./types/bookmarks";

  const navigator = new LevelNavigator(null);
  const {
    breadcrumbs,
    displayedBookmarks,
    displayedFolders,
  } = navigator;
</script>

<div
  class="Popup"
  style="
    background: {$isDarkMode ? "#333" : '#fff'};
    color: {$isDarkMode ? "#fff" : '#333'};
  "
>
  <div class="header">
    <Breadcrumbs
      breadcrumbs={$breadcrumbs}
      onCrumbClick={(folderNode: FolderNode | null) => navigator.loadFolder(folderNode)}
    />
    <div class="header-left">
      <ThemeToggle scale={0.75}/>
    </div>
  </div>
  
  <HorizontalLine
    color={($isDarkMode ? 'white' : 'black')}
    thickness={2}
    marginY={8}
    marginX={2}
  />

  <List>
    {#each $displayedBookmarks as item (item.id)}
      <ListBookmark
        title={item.title}
        url={item.url}
      />
    {/each}
    {#each $displayedFolders as item (item.id)}
      <ListFolder
        onClick={() => navigator.loadFolder(item)}
        title={item.title}
      />
    {/each}
  </List>
</div>

<style>
  .Popup {
    width: 360px; /* standard Chrome popup width */
    max-width: 100vw;
    max-height: 600px;
    display: flex;
    flex-direction: column;
    font-family: system-ui, sans-serif;
    padding: 0.5rem;
    box-sizing: border-box;
  }

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40px;
    width: 100%;
  }

  .header-left {
    margin-left: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
  }
</style>