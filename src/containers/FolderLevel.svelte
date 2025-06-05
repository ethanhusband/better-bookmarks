<script lang="ts">
  import HorizontalLine from "@/components/HorizontalLine.svelte";
  import Grid from "@/components/Grid.svelte";
  import GridBookmark from "@/components/GridBookmark.svelte";
  import GridFolder from "@/components/GridFolder.svelte";
  import type { LevelNavigator } from "@/lib/levelNavigator";
  import type { FolderNode } from "@/types/bookmarks";
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

  const {
    displayedBookmarks,
    displayedFolders,
    folder,
  } = levelNavigator;
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
    <Grid>
      {#each $displayedBookmarks as item (item.id)}
        <GridBookmark
          bookmarkNode={item}
        />
      {/each}
      {#each $displayedFolders as item (item.id)}
        <GridFolder
          onClick={() => loadLevel(item, depth)}
          folderNode={item}
        />
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
