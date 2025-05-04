<script lang="ts">
  import { onMount } from 'svelte';

  import BackgroundImage from '@/components/BackgroundImage.svelte';
  import Bookmark from '@/components/Bookmark.svelte';
  import Breadcrumbs from '@/components/Breadcrumbs.svelte';
  import Folder from '@/components/Folder.svelte';
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
      <div class="grid">
        {#each $displayedBookmarks as item (item.id)}
          <Bookmark
            title={item.title}
            url={item.url}
          />
        {/each}
      </div>
      <div class="grid">
        {#each $displayedFolders as item (item.id)}
          <Folder
            onClick={() => navigator.loadFolder(item.id)}
            title={item.title}
          />
        {/each}
      </div>
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

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);   /* create as many 100px columns as will fit, then wrap */
    grid-auto-rows: auto;
    gap: 1rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
  }
</style>