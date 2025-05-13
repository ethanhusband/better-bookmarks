export function isDevMode() {
  return new Promise(resolve => {
    chrome.management.getSelf(info => {
      resolve(info.installType === 'development');
    });
  });
}