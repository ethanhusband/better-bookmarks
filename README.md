# Better Bookmarks

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Svelte](https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000?logo=bun&style=for-the-badge&logoColor=white)

> Lightweight chrome extension to improve bookmark management and sharable bookmarks

## Summary

How often do you find yourself opening a new tab, only to either open a bookmark or search in the top bar? 
The default search bar that typically fills that New Tab space is some of the most wasted screen real estate in your day.

Better Bookmarks overrides the default New Tab screen, providing a cleaner looking bookmark navigator more reminiscent of an App Store - making use of that otherwise wasted New Tab space. When opening a new tab to access bookmarks, you no longer have to misclick and then click those tiny links at the top of your screen.

![better-bookmarks-0 4 0-1](https://github.com/user-attachments/assets/67458711-152e-446f-9dab-b8d730aa31e6)
![chrome-extension___emnlpalookinhkceincdepnkeijokngm_src_entrypoints_newtab html (1)](https://github.com/user-attachments/assets/55845f89-6c95-436b-91cd-6eaf1d5f0a32)

## Development

Start with installing key dependencies:
```sh
npm i -g bun vite
bun i
```

Then to run the extension:
1. Run `vite build`, which will generate the `dist` directory
2. Go into `chrome://extensions`, hit "Load Unpacked"
3. Open to the `dist` directory
4. Anytime you make changes, rerun `vite build` and hit refresh on the extension in `chrome://extensions`

## Deploy

To create a package for the Chrome webstore

1. Bump the version in `manifest.json` and `git tag` the version
2. Run `vite build` to create the dist directory
3. Zip the contents of the directory `zip -r dist.zip dist/*`
4. Upload the .zip file, renamed to `better-bookmarks-<version>.zip`
5. Add the release to Github

## License

This project is licensed under the GNU General Public License v3.0 or later.

See the [LICENSE](./LICENSE) file for details.
