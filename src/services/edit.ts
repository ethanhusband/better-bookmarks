import { isFolderNode, type TreeNode } from "@/types/bookmarks";
import { modal } from "./modal";

export async function handleSave(node: TreeNode, changes: { title: string, url?: string }) {
  await chrome.bookmarks.update(node.id, changes);
  modal.set(null);
}

export async function handleDelete(node: TreeNode) {
  if (isFolderNode(node)) {
    chrome.bookmarks.removeTree(node.id);
  } else {
    chrome.bookmarks.remove(node.id);
  }
  modal.set(null);
}
