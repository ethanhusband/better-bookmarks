import { writable, get } from 'svelte/store';

import {
  type TreeNode,
  type BookmarkNode,
  type FolderNode,
  extractBookmarks,
  extractFolders
} from '@/types/bookmarks';
import type { Breadcrumb } from '@/types/breadcrumb';


export class Navigator {
  private _selectedFolderId: string | null = null;

  public breadcrumbs = writable<Breadcrumb[]>([]);
  public folderLevels = writable<Record<number, TreeNode[]>>({});

  public displayedBookmarks = writable<BookmarkNode[]>([]);
  public displayedFolders = writable<FolderNode[]>([]);

  public loadFolder(folderId: string | null, depth: number) {
    console.log('loading folder', folderId);
    let title = '';
    if (folderId !== null) {
      const folder = get(this.displayedFolders).find((folder) => folder.id === folderId);
      if (!folder) {
        throw new Error('tried to load folder that should be in scope');
      }
      title = folder.title;
    }

    this._updateDisplayed(folderId);
    this._updateBreadcrumbs(folderId, title);

    this._selectedFolderId = folderId;
  }

  private _updateDisplayed(folderId: string | null) {
    let allDisplayed: TreeNode[] = [];
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

        this.displayedBookmarks.set(extractBookmarks(allDisplayed));
        this.displayedFolders.set(extractFolders(allDisplayed));
      });      
    } else {
      chrome.bookmarks.getChildren(folderId, (children) => {
        // this segment is deliberately repeated - it needs to run inside this block for proper synchronicity
        this.displayedBookmarks.set(extractBookmarks(children));
        this.displayedFolders.set(extractFolders(children));
      });
    }
  }

  private _updateBreadcrumbs(folderId: string | null, title: string) {
    if (folderId === null) {
      this.breadcrumbs.set([]);
      return;
    }

    const currentBreadcrumbs = get(this.breadcrumbs);
    const i = currentBreadcrumbs.findIndex((c) => c.id === folderId);
    if (i === -1) {
      this.breadcrumbs.set([...currentBreadcrumbs, { id: folderId, title }]);
    } else {
      const newBreadcrumbs = [...currentBreadcrumbs];
      newBreadcrumbs.slice(0, i + 1);
      this.breadcrumbs.set(newBreadcrumbs);
    }
  }
}

