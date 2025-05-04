import { getCachedIcon, setCachedIcon } from "@/services/iconCache";

export async function extractFavicon(url: string) {
  const cachedIcon = await getCachedIcon(url);
  if (cachedIcon) {
    return cachedIcon;
  }

  const fetchedIcon = await fetchIconFromHtml(url);
  if (fetchedIcon) {
    setCachedIcon(url, fetchedIcon)
    return fetchedIcon;
  }
  
  return '/assets/placeholder-icon.png';
}

async function fetchIconFromHtml(url: string) {
  const html = await loadPageHtml(url);

  const iconHref = extractFaviconFromHtml(html, url);
  if (iconHref && await testImage(iconHref)) {
    return iconHref;
  }

  const fallbackUrl = `${new URL(url).origin}/favicon.ico`
  if (await testImage(fallbackUrl)) {
    return fallbackUrl;
  }

  return null;
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
