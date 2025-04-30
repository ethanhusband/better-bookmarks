<script lang="ts">
  import { onMount } from 'svelte';

  import Bookmark from '@/components/Bookmark.svelte';
  import Folder from '@/components/Folder.svelte';
  import Breadcrumbs from '@/components/Breadcrumbs.svelte';

  import { type BookmarkTreeNode, type BookmarkNode, type FolderNode, isFolderNode, isBookmarkNode, extractBookmarks, extractFolders } from '@/types/bookmarks';
  import type { Breadcrumb } from '@/types/breadcrumb';
  import BackgroundImage from './components/BackgroundImage.svelte';

  let breadcrumbs: Breadcrumb[] = [];
  let displayedBookmarks: BookmarkNode[] = [];
  let displayedFolders: FolderNode[] = [];
  let selectedFolderId: string | null = null; // null = root level

  function loadFolder(folderId: string | null) {
    _updateDisplayed(folderId);
    _updateBreadcrumbs(folderId);
    selectedFolderId = folderId;
  }

  function _updateDisplayed(folderId: string | null) {
    let allDisplayed: BookmarkTreeNode[] = [];
    if (folderId === null) {
      chrome.bookmarks.getTree((tree) => {
        // chrome by default will return [bookmarksBar, otherBookmarks]
        // as the root children - we need to flatten these to get the actual root children.
        const rootChildren = tree[0].children; 
        if (!rootChildren) {
          throw new Error('bookmark API error');
        }

        rootChildren.forEach((child) => {
          if (!child.children) {
            throw new Error('no children in chrome root bookmark folders (?)')
          }

          allDisplayed.push(...child.children);
        });

        displayedBookmarks = extractBookmarks(allDisplayed);
        displayedFolders = extractFolders(allDisplayed);
      });      
    } else {
      chrome.bookmarks.getChildren(folderId, (children) => {
        // this segment is deliberately repeated - it needs to run inside this block for proper synchronicity
        displayedBookmarks = extractBookmarks(children);
        displayedFolders = extractFolders(children);
      });
    }
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
        <Bookmark
          title={item.title}
          url={item.url}
        />
      {/each}
    </div>
    <div class="grid">
      {#each displayedFolders as item (item.id)}
        <Folder
          onClick={() => loadFolder(item.id)}
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