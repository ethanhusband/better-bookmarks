<script lang="ts">
  import Breadcrumbs from "@/components/Breadcrumbs.svelte";
  import HorizontalLine from "@/components/HorizontalLine.svelte";
  import Grid from "@/components/Grid.svelte";
  import GridBookmark from "@/components/GridBookmark.svelte";
  import GridFolder from "@/components/GridFolder.svelte";
  import type { LevelNavigator } from "@/lib/levelNavigator";
    import type { FolderNode } from "@/types/bookmarks";
    import { parseBreadcrumb } from "@/lib/parseBreadcrumb";

  export let depth: number;
  export let levelNavigator: LevelNavigator;
  export let loadLevel: (folderNode: FolderNode | null, fromDepth: number) => void;

  const {
    displayedBookmarks,
    displayedFolders,
    folder,
  } = levelNavigator;
</script>

<div class="FolderLevel">
  <Breadcrumbs
    breadcrumbs={$displayedFolders}
    rawCrumbs={[parseBreadcrumb(folder)]}
    onCrumbClick={(folderNode: FolderNode | null) => loadLevel(folderNode, depth)}
    scale={1.5}
  />

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
          title={item.title}
          url={item.url}
        />
      {/each}
      {#each $displayedFolders as item (item.id)}
        <GridFolder
          onClick={() => loadLevel(item, depth)}
          title={item.title}
        />
      {/each}
    </Grid>
  </div>
</div>

<style>
  .FolderLevel {
    flex: 1
  }

  .main {
      padding: 1rem 0rem;
    }
</style>
