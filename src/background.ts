chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'FETCH_HTML') {
    fetch(msg.url)
      .then(r => r.text())
      .then(html => sendResponse({ html }))
      .catch(err => sendResponse({ error: err.message }));
    return true; // keep the message channel open
  }
});