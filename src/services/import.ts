import JSZip from 'jszip';

export async function importFolderFromZip(file: File) {
  const buf = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(buf);

  const names = Object.keys(zip.files).filter(n => n.endsWith('.json'));
  if (!names.length) throw new Error('No JSON file found in ZIP');
  const text = await zip.file(names[0])!.async('string');
  const root = JSON.parse(text) as chrome.bookmarks.BookmarkTreeNode;

  // helper to create one node (bookmark or folder)
  async function createNode(
    title: string,
    url: string | undefined,
    parentId: string
  ): Promise<chrome.bookmarks.BookmarkTreeNode> {
    return new Promise((res, rej) => {
      chrome.bookmarks.create(
        { parentId, title, url },
        node => chrome.runtime.lastError ? rej(chrome.runtime.lastError) : res(node)
      );
    });
  }

  // recursive function to walk the tree
  async function recurse(
    node: chrome.bookmarks.BookmarkTreeNode,
    parentId: string
  ) {
    // 1) create the folder itself
    const folder = await createNode(node.title, undefined, parentId);

    // 2) for each child, either recurse (folder) or create a bookmark
    if (node.children) {
      for (const child of node.children) {
        if (child.children) {
          await recurse(child, folder.id);
        } else {
          await createNode(child.title, child.url, folder.id);
        }
      }
    }
  }

  // 3) kick off under the Bookmarks Bar (id="1")
  await recurse(root, '1');
}