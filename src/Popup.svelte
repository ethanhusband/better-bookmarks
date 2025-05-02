<script lang="ts">
  import { onMount } from "svelte";

  import { Navigator } from "@/lib/navigation";
  import { isDarkMode } from '@/services/theme';
  import Breadcrumbs from "@/components/Breadcrumbs.svelte";
  import List from "@/components/List.svelte";
  import ListBookmark from "@/components/ListBookmark.svelte";
  import ListFolder from "@/components/ListFolder.svelte";
    import ThemeToggle from "./components/ThemeToggle.svelte";
    import HorizontalLine from "./components/HorizontalLine.svelte";

  const navigator = new Navigator();
  const {
    breadcrumbs,
    displayedBookmarks,
    displayedFolders,
  } = navigator;

  onMount(() => {
    navigator.loadFolder(null);
  });
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
      onCrumbClick={(folderId: string | null) => navigator.loadFolder(folderId)}
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
        onClick={() => navigator.loadFolder(item.id)}
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