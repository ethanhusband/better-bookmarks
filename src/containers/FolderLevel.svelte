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
  export let navigatorLevels: LevelNavigator[];
  export let handleDrop: (e: CustomEvent<DndEvent<TreeNode>>, depth: number) => void;
  export let handleConsider: (e: CustomEvent<DndEvent<TreeNode>>, depth: number) => void;
  export let loadLevel: (folderNode: FolderNode | null, fromDepth: number) => void;

  let items: TreeNode[];
  const {
    displayedBookmarks,
    folder
  } = navigatorLevels[depth];

  displayedBookmarks.subscribe((bookmarks) => items = bookmarks);
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

  <Grid
    on:consider={(e) => handleConsider(e as CustomEvent<DndEvent<TreeNode>>, depth)}
    on:finalize={(e) => handleDrop(e as CustomEvent<DndEvent<TreeNode>>, depth)}
    items={items}
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
</style>
