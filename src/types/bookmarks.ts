export type BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode;

export type BookmarkNode = BookmarkTreeNode & { url: string};
export type FolderNode = BookmarkTreeNode & { children: BookmarkTreeNode[] };


export function extractBookmarks(tree: BookmarkTreeNode[]) {
  return tree.filter((node) => isBookmarkNode(node));
}

export function extractFolders(tree: BookmarkTreeNode[]) {
  return tree.filter((node) => isFolderNode(node));
}

export function isBookmarkNode(node: BookmarkTreeNode): node is BookmarkNode {
  return !!node.url;
}

export function isFolderNode(node: BookmarkTreeNode): node is FolderNode {
  return Array.isArray(node.children);
}
