import { writable, get } from 'svelte/store';

import {
  type TreeNode,
  type FolderNode,
} from '@/types/bookmarks';

export class LevelNavigator {
  public folder: FolderNode | null = null;

  public breadcrumbs = writable<FolderNode[]>([]);
  public folderLevels = writable<Record<number, TreeNode[]>>({});

  public displayedBookmarks = writable<TreeNode[]>([]);

  constructor(folderNode: FolderNode | null) {
    this.loadFolder(folderNode);    
  }

  public loadFolder(folderNode: FolderNode | null) {
    console.log('loading folder', folderNode);
    let title = 'Your Bookmarks';
    if (folderNode !== null) {
      title = folderNode.title;
    }

    this._updateDisplayed(folderNode);
    this._updateBreadcrumbs(folderNode);

    this.folder = folderNode;
  }

  private _updateDisplayed(folderNode: FolderNode | null) {
    let allDisplayed: TreeNode[] = [];
    if (folderNode === null) {
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

        this.displayedBookmarks.set(allDisplayed);
      });      
    } else {
      chrome.bookmarks.getChildren(folderNode.id, (children) => {
        // this segment is deliberately repeated - it needs to run inside this block for proper synchronicity
        this.displayedBookmarks.set(children);
      });
    }
  }

  private _updateBreadcrumbs(folderNode: FolderNode | null) {
    if (folderNode === null) {
      this.breadcrumbs.set([]);
      return;
    }

    const currentBreadcrumbs = get(this.breadcrumbs);
    const i = currentBreadcrumbs.findIndex((c) => c.id === folderNode.id);
    if (i === -1) {
      this.breadcrumbs.set([...currentBreadcrumbs, folderNode]);
    } else {
      const newBreadcrumbs = [...currentBreadcrumbs];
      newBreadcrumbs.slice(0, i + 1);
      this.breadcrumbs.set(newBreadcrumbs);
    }
  }
}
