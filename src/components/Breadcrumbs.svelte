<script lang="ts">
  import { parseBreadcrumb } from "@/lib/parseBreadcrumb";
  import { isDarkMode } from "@/services/theme";
  import type { FolderNode } from "@/types/bookmarks";
  import { type Breadcrumb } from "@/types/breadcrumb";

  export let breadcrumbs: FolderNode[] = [];
  export let onCrumbClick: (folderNode: FolderNode | null) => void;
  export let scale: number = 1;

  const MAX_VISIBLE = 2;

  $: displayCrumbs = ((): Breadcrumb[] => {
    const prefixCrumb = { id: null, title: 'Your Bookmarks', node: null };
    if (breadcrumbs.length <= MAX_VISIBLE) {
      // show all (or root will be handled below when length === 0)
      console.log('returning breadcrumbs raw');
      return [
        prefixCrumb, 
        ...breadcrumbs.map((breadcrumb) => parseBreadcrumb(breadcrumb))
      ]
    }

    const first = breadcrumbs[0];
    const last = breadcrumbs[breadcrumbs.length - 1];
    return [
      prefixCrumb,
      parseBreadcrumb(first),
      { id: null, title: '…', node: breadcrumbs[breadcrumbs.length - MAX_VISIBLE] },
      parseBreadcrumb(last)
    ];
  })();
</script>

<nav
  class="Breadcrumbs"
  class:dark={$isDarkMode}
  class:light={!$isDarkMode}
  style="--scale: {scale}"
>
  <button class="crumb" on:click={() => onCrumbClick(null)}>
    <img src="/assets/icon_256.png" alt="Better Bookmarks" class="root-icon" />
  </button>

  <div class="crumbs">
    {#each displayCrumbs as crumb, i}
      <span
        class="separator"
        class:dark={$isDarkMode}
        class:light={!$isDarkMode}
      >
        ›
      </span>

      <button
        class="crumb {crumb.title === '…' ? 'ellipsis' : ''} {i === displayCrumbs.length - 1 ? 'current' : ''}"
        on:click={() => crumb.title !== '…' && onCrumbClick(crumb.node)}>
        <p class="crumb-title">{crumb.title}</p>
      </button>
    {/each}
  </div>
</nav>

<style>
  .Breadcrumbs {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: calc(16px * var(--scale));
    user-select: none;
    padding: 0.5rem 0.5rem;
    background: transparent;
    height: calc(35px * var(--scale));
  }

  .Breadcrumbs.light {
    color: #333;
  }

  .Breadcrumbs.dark {
    color: #eee;
  }

  .root-icon {
    width: calc(24px * var(--scale));
    height: calc(24px * var(--scale));
  }

  .crumbs {
    display: flex;
    flex-direction: row;
    gap: 4px;
  }

  .crumb {
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    width: auto;

    display: flex;
    align-items: center;
    justify-content: center;

    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
  }

  .crumb.current {
    font-weight: bold;
    cursor: default;
  }

  .crumb.ellipsis {
    cursor: default;
  }

  .crumb-title {
    text-align: center;
    margin: 0;
    line-height: 1;
    display: inline-block;
  }

  .separator {
    text-align: center;
  }

  .separator.light {
    color: #333;
  }

  .separator.dark {
    color: #eee;
  }
</style>
