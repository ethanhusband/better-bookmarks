<script lang="ts">
  import { onMount } from 'svelte';
  import { extractFavicon } from '@/lib/extractFavicon';

  export let title: string;
  export let url: string;

  let faviconUrl: string;
  
  onMount(async () => {
    faviconUrl = await extractFavicon(url);
  });
</script>

<a href={url} target="_blank" rel="noopener noreferrer" class="bookmark-card">
  <div class="icon-wrapper">
    {#if faviconUrl}
      <img class="icon" src={faviconUrl} alt="favicon for {title}" />
    {:else}
      <svg width="32" height="32" viewBox="0 0 24 24" fill="#999">
        <path d="M6 2L18 2C19.1 2 20 2.9 20 4L20 20C20 21.1 19.1 22 18 22L6 22C4.9 22 4 21.1 4 20L4 4C4 2.9 4.9 2 6 2ZM6 4L6 20L18 20L18 4L6 4Z" />
      </svg>
    {/if}
  </div>
  <div class="bookmark-title">{title || url}</div>
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
    width: 40px;
    height: 40px;
  }

  .icon-wrapper {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f7f7f7;
    border-radius: 25px;
    padding: 4px;
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
