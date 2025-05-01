<script lang="ts">
  import { onMount } from 'svelte';

  import BackgroundImage from '@/components/BackgroundImage.svelte';
  import Bookmark from '@/components/Bookmark.svelte';
  import Breadcrumbs from '@/components/Breadcrumbs.svelte';
  import Folder from '@/components/Folder.svelte';
  import { Navigator } from '@/services/navigation';

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
    />

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
</BackgroundImage>

<style>
  .NewTab {
    width: 100%;
    height: 100%;
    padding: 2rem;
  }

  .grid {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 100px;
    gap: 1rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
  }
</style>