import type { ID } from "@/types/abstract";

export function createFolder(parentId: ID, title: string) {
  chrome.bookmarks.create({
    parentId,
    title
  }, function(newFolder) {
    console.log('Created folder:', newFolder);
  });
}
