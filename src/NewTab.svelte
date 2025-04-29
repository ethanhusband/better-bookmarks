<script lang="ts">
  import { onMount } from 'svelte';

  import Bookmark from '@/components/Bookmark.svelte';
  import Folder from '@/components/Folder.svelte';
  import Breadcrumbs from '@/components/Breadcrumbs.svelte';

  import type { BookmarkTreeNode } from '@/types/bookmarkTreeNode';
  import type { Breadcrumb } from '@/types/breadcrumb';
    import BackgroundImage from './components/BackgroundImage.svelte';

  let breadcrumbs: Breadcrumb[] = [];
  let displayedBookmarks: BookmarkTreeNode[] = [];
  let selectedFolderId: string | null = null; // null = root level

  function loadFolder(folderId: string | null) {
    _updateBreadcrumbs(folderId);
    _updateDisplayedBookmarks(folderId);
    selectedFolderId = folderId;
  }

  function _updateDisplayedBookmarks(folderId: string | null) {
    if (folderId === null) {
      chrome.bookmarks.getTree((tree) => {
        // chrome by default will return [bookmarksBar, otherBookmarks]
        // as the root children - we need to flatten these to get the actual root children.
        const rootChildren = tree[0].children; 
        if (!rootChildren) {
          throw new Error('bookmark API error');
        }

        const rootUserBookmarks: BookmarkTreeNode[] = [];
        rootChildren.forEach((child) => {
          if (!child.children) {
            throw new Error('no children in chrome root bookmark folders?')
          }

          rootUserBookmarks.push(...child.children)
        });

        displayedBookmarks = rootUserBookmarks;
      });
      return;
    }

    chrome.bookmarks.getChildren(folderId, (children) => {
      displayedBookmarks = children;
    });
  }

  function _updateBreadcrumbs(folderId: string | null) {
    if (folderId === null) {
      breadcrumbs = [{ id: null, title: 'Your Bookmarks' }];
      return;
    }

    const i = breadcrumbs.findIndex((c) => c.id === folderId);
    if (i !== -1) {
      breadcrumbs = breadcrumbs.slice(0, i + 1);
    } else {
      const title = displayedBookmarks.find((bookmark) => bookmark.id === folderId)?.title || '…';
      breadcrumbs = [...breadcrumbs, { id: folderId, title }];
    }
  }

  onMount(() => {
    loadFolder(null);
  });
</script>

<BackgroundImage>
  <div class="NewTab">
    <Breadcrumbs
      breadcrumbs={breadcrumbs}
      onCrumbClick={loadFolder}
    />

    <div class="grid">
      {#each displayedBookmarks as item (item.id)}
        {#if item.children}
          <Folder title={item.title} on:click={() => loadFolder(item.id)} />
        {:else if item.url}
          <Bookmark title={item.title} url={item.url} />
        {/if}
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