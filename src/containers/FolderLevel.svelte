<script lang="ts">
  import { dndzone, type DndEvent, type DndEventInfo } from 'svelte-dnd-action';

  import HorizontalLine from "@/components/HorizontalLine.svelte";
  import Grid from "@/components/Grid.svelte";
  import GridBookmark from "@/components/GridBookmark.svelte";
  import GridFolder from "@/components/GridFolder.svelte";
  import type { LevelNavigator } from "@/lib/levelNavigator";
  import { isBookmarkNode, isFolderNode, type FolderNode, type TreeNode } from "@/types/bookmarks";
  import LevelTitle from "@/components/LevelTitle.svelte";
  import PinOpen from "@/components/PinButton.svelte";
  import type { ID } from "@/types/abstract";
  import ExportButton from "@/components/ExportButton.svelte";
  import ImportButton from "@/components/ImportButton.svelte";
  import SetBackgroundButton from "@/components/SetBackgroundButton.svelte";
  import GridNewFolder from "@/components/GridNewFolder.svelte";

  export let depth: number;
  export let path: ID[];
  export let levelNavigator: LevelNavigator;
  export let loadLevel: (folderNode: FolderNode | null, fromDepth: number) => void;

  let items: TreeNode[];
  const {
    displayedBookmarks,
    folder
  } = levelNavigator;

  displayedBookmarks.subscribe((bookmarks) => items = bookmarks);

  function handleDrop(event: CustomEvent<DndEvent<TreeNode>>) {
    const newOrder = event.detail.items;

    console.log('setting new displayedBookmarks');
    displayedBookmarks.set(newOrder);

    console.log('done. updating api');
    for (const [index, item] of newOrder.entries()) {
      chrome.bookmarks.move(item.id, { index });
    }
    console.log('updated chrome api');
  }

  function handleConsider(event: CustomEvent<DndEvent<TreeNode>>) {
    const newOrder = event.detail.items;

    console.log('considering', newOrder.map((x) => x.title));
    displayedBookmarks.set(newOrder);
  }
</script>

<div class="FolderLevel">
  <div class="header">
    <LevelTitle
      isRoot={depth === 0}
      iconUrl={depth === 0 ? "/assets/icon_256.png" : "/assets/folder.png"}
      title={folder ? folder.title : "Your Bookmarks"}
      iconScale={depth === 0 ? 1 : 0.9}
    />
    <div class="header-left">
      {#if folder}
        <PinOpen path={path} title={folder.title} />
        <ExportButton folderId={folder.id} />
      {:else}
        <SetBackgroundButton />
        <ImportButton />
      {/if}
    </div>
  </div>

  <HorizontalLine
    color={'white'}
    thickness={2}
    marginY={8}
    marginX={2}
  />

  <div class="main">
    <Grid
      {items}
      on:consider={(e) => handleConsider(e as CustomEvent<DndEvent<TreeNode>>)}
      on:finalize={(e) => handleDrop(e as CustomEvent<DndEvent<TreeNode>>)}
    >
      {#each $displayedBookmarks as item (item.id)}
        {#if isBookmarkNode(item)}
          <GridBookmark
            bookmarkNode={item}
          />
        {:else if isFolderNode(item)}
          <GridFolder
            onClick={() => loadLevel(item, depth)}
            folderNode={item}
          />
        {/if}
      {/each}
      <GridNewFolder parentId={folder ? folder.id : '1'} />
    </Grid>
  </div>
</div>

<style>
  .FolderLevel {
    flex: 1
  }

  .header {
    padding: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .header-left {
    margin-left: auto;
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
  }

  .main {
    padding: 1rem 0rem;
  }
</style>
