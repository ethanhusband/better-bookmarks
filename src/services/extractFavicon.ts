export async function extractFavicon(url: string) {
  const html = await loadPageHtml(url);

  const iconHref = extractFaviconFromHtml(html, url);
  if (iconHref && await testImage(iconHref)) {
    return iconHref;
  }

  // fallback - just guess it's the relative favico.ico file
  return `${new URL(url).origin}/favicon.ico`;
}

function testImage(src: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

async function loadPageHtml(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { type: 'FETCH_HTML', url },
      response => {
        if (response?.html) resolve(response.html);
        else reject(response?.error || 'Unknown');
      }
    );
  });
}

// this will provide whatever the website has in it's tab icon
export function extractFaviconFromHtml(html: string, url: string): string | null {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  if (!doc.head) return null;

  // for all links in the html head, try to find one containing icon, and extract it's href
  const links = Array.from(doc.head.querySelectorAll('link'));
  for (const link of links) {
    const rel = (link.getAttribute('rel') || '').toLowerCase();
    if (rel.includes('icon')) {
      let href = link.getAttribute('href');
      if (!href) {
        console.log('[warning] found icon link without href!')
        continue;
      };
      

      if (href.startsWith('http')) {
        return href;
      } else if (href.startsWith('/')) {
        return url + href;
      } else {
        return url + '/' + href;
      }
    }
  }

  return null;
}
