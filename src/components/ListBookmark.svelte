<script lang="ts">
  import { onMount } from 'svelte';
  import { extractFavicon } from '@/lib/extractFavicon';
  import ListItem from './ListItem.svelte';

  export let title: string;
  export let url: string;

  let faviconUrl: string;

  function openUrlInNewTab(url: string) {
    chrome.tabs.create({ url });
  }

  onMount(async () => {
    faviconUrl = await extractFavicon(url);
  });
</script>

<ListItem onClick={() => openUrlInNewTab(url)}>
  <div class="ListBookmark">
    {#if faviconUrl}
      <img class="bookmark-icon " src={faviconUrl} alt="favicon for {title}" />
    {:else}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#999">
        <path d="M6 2L18 2C19.1 2 20 2.9 20 4L20 20C20 21.1 19.1 22 18 22L6 22C4.9 22 4 21.1 4 20L4 4C4 2.9 4.9 2 6 2ZM6 4L6 20L18 20L18 4L6 4Z" />
      </svg>
    {/if}
    <div class="bookmark-title">{title || url}</div>
  </div>
</ListItem>

<style>
  .ListBookmark {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    padding: 8px;
    gap: 8px;
  }

  .bookmark-icon {
    width: 20px;
    height: 20px;
  }

  .bookmark-title {
    font-size: 14px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>