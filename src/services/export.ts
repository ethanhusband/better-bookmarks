import JSZip from "jszip";

export async function exportFolderAsZip(folderId: string) {
  // 1) pull down the subtree
  const [rootNode] = await new Promise<chrome.bookmarks.BookmarkTreeNode[]>((res, rej) => {
    chrome.bookmarks.getSubTree(folderId, nodes => {
      chrome.runtime.lastError ? rej(chrome.runtime.lastError) : res(nodes);
    });
  });

  // 2) serialize to JSON
  const json = JSON.stringify(rootNode, null, 2);

  // 3) pack that JSON into a ZIP
  const zip = new JSZip();
  zip.file(`${rootNode.title || 'bookmarks'}.json`, json);
  const blob = await zip.generateAsync({ type: 'blob' });

  // 4) download the ZIP
  const url = URL.createObjectURL(blob);
  const a   = document.createElement('a');
  a.href    = url;
  a.download = `${rootNode.title || 'bookmarks'}-bookmark.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}