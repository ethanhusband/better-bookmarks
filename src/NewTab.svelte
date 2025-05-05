<script lang="ts">
  import { onMount } from 'svelte';

  import BackgroundImage from '@/components/BackgroundImage.svelte';
  
  import Breadcrumbs from '@/components/Breadcrumbs.svelte';
  import Grid from './components/Grid.svelte';
  import GridBookmark from '@/components/GridBookmark.svelte';
  import GridFolder from '@/components/GridFolder.svelte';
  import HorizontalLine from '@/components/HorizontalLine.svelte';
  import { Navigator } from '@/lib/navigation';

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

<BackgroundImage>
  <div class="NewTab">
    <Breadcrumbs
      breadcrumbs={$breadcrumbs}
      onCrumbClick={(folderId: string | null) => navigator.loadFolder(folderId)}
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
            onClick={() => navigator.loadFolder(item.id)}
            title={item.title}
          />
        {/each}
      </Grid>
    </div>
  </div>
</BackgroundImage>

<style>
  .NewTab {
    flex: 1;
    padding: 1rem;
  }

  .main {
    padding: 1rem 0rem;
  }
</style>