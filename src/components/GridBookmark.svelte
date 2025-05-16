<script lang="ts">
  import { onMount } from 'svelte';
  import { extractFavicon } from '@/lib/extractFavicon';
  import GridIcon from './GridIcon.svelte';
  import type { BookmarkNode } from '@/types/bookmarks';
    import { openModal } from '@/services/edit';

  export let bookmarkNode: BookmarkNode;

  let faviconUrl: string;
  
  onMount(async () => {
    faviconUrl = await extractFavicon(bookmarkNode.url);
  });
</script>

<a
  href={bookmarkNode.url}
  rel="noopener noreferrer"
  class="bookmark-card"
  on:contextmenu|preventDefault={() => openModal(bookmarkNode)}
>
  <GridIcon backgroundColor="#f7f7f7">
    {#if faviconUrl}
      <img class="icon" src={faviconUrl} alt="favicon for {bookmarkNode.title}" />
    {:else}
      <svg width="32" height="32" viewBox="0 0 24 24" fill="#999">
        <path d="M6 2L18 2C19.1 2 20 2.9 20 4L20 20C20 21.1 19.1 22 18 22L6 22C4.9 22 4 21.1 4 20L4 4C4 2.9 4.9 2 6 2ZM6 4L6 20L18 20L18 4L6 4Z" />
      </svg>
    {/if}
  </GridIcon>
  <div class="bookmark-title">{bookmarkNode.title || bookmarkNode.url}</div>
</a>

<style>
  .bookmark-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    padding: 8px;
    gap: 8px;
  }

  .icon {
    max-width: 40px;
    max-height: 40px;
  }

  .bookmark-title {
    font-size: 14px;
    color: white;
    text-align: center;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
