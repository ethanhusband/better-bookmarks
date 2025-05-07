import type { FolderNode } from "@/types/bookmarks";
import type { Breadcrumb } from "@/types/breadcrumb";

export function parseBreadcrumb(folderNode: FolderNode | null): Breadcrumb {
  if (!folderNode) {
    return ({ id: null, title: 'Your Bookmarks', node: null });
  }

  return ({ id: folderNode.id, title: folderNode.title, node: folderNode });
}
