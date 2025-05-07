import type { FolderNode } from "./bookmarks";

export interface Breadcrumb {
  id: string | null; 
  title: string;
  node: FolderNode | null;
}
