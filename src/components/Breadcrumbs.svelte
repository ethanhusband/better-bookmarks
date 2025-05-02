<script lang="ts">
  import { isDarkMode } from "@/services/theme";
  import { type Breadcrumb } from "@/types/breadcrumb";

  export let breadcrumbs: Breadcrumb[] = [];
  export let onCrumbClick: (folderId: string | null) => void;

  const MAX_VISIBLE = 2;

  $: displayCrumbs = (() => {
    console.log(breadcrumbs);

    if (breadcrumbs.length <= MAX_VISIBLE) {
      // show all (or root will be handled below when length === 0)
      console.log('returning breadcrumbs raw');
      return breadcrumbs.length
        ? breadcrumbs
        : [{ id: null, title: 'Your Bookmarks' }];
    }

    const first = breadcrumbs[0];
    const last = breadcrumbs[breadcrumbs.length - 1];
    return [
      first,
      { id: null, title: '…' },
      last
    ];
  })();
</script>

<nav
  class="crumbs"
  class:dark={$isDarkMode}
  class:light={!$isDarkMode}
>
  <button class="crumb" on:click={() => onCrumbClick(null)}>
    <img src="/assets/icon_256.png" alt="Better Bookmarks" class="root-icon" />
  </button>

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
      on:click={() => crumb.title !== '…' && onCrumbClick(crumb.id)}>
      <p class="crumb-title">{crumb.title}</p>
    </button>
  {/each}
</nav>

<style>
  .crumbs {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 1rem;
    user-select: none;
    padding: 0.5rem 0.5rem;
    background: var(--bg, #fff);
    color: var(--fg, #333);
    height: 35px;
  }

  .crumbs.light {
    background: #fff;
    color: #333;
  }

  .crumbs.dark {
    background: #333;
    color: #eee;
  }

  .root-icon {
    width: 24px;
    height: 24px;
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
    font-size: 16px;
    text-align: center;
  }

  .separator {
    margin-right: 4px;
    font-size: 24px;
    line-height: 24px;
    text-align: center;
  }

  .separator.light {
    color: #333;
  }

  .separator.dark {
    color: #eee;
  }
</style>