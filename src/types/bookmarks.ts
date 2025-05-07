export type TreeNode = chrome.bookmarks.BookmarkTreeNode;

export type BookmarkNode = TreeNode & { url: string};
export type FolderNode = TreeNode & { children: TreeNode[] };


export function extractBookmarks(tree: TreeNode[]) {
  return tree.filter((node) => isBookmarkNode(node));
}

export function extractFolders(tree: TreeNode[]) {
  return tree.filter((node) => isFolderNode(node));
}

export function isBookmarkNode(node: TreeNode): node is BookmarkNode {
  return !!node.url;
}

export function isFolderNode(node: TreeNode): node is FolderNode {
  return Array.isArray(node.children);
}
