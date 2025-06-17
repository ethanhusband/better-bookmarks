<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';

  import BackgroundImage from '@/components/BackgroundImage.svelte';
  import { LevelNavigator } from '@/lib/levelNavigator';
  import { range } from '@/lib/range';
  import FolderLevel from '@/containers/FolderLevel.svelte';
  import { extractFolders, type FolderNode } from '@/types/bookmarks';
  import { getPinPath, pinPath } from '@/services/pinned';
  import { modal } from '@/services/modal';

  let navigatorLevels: LevelNavigator[] = [];

  function loadLevel(folderNode: FolderNode | null, fromDepth: number) {
    const navigator = new LevelNavigator(folderNode);
    const depth = fromDepth + 1;

    const newNavigatorLevels = [ ...navigatorLevels];
    newNavigatorLevels.splice(depth);
    newNavigatorLevels.push(navigator);
    navigatorLevels = newNavigatorLevels;
  }

  function setupNavigator() {
    // initialise root level bookmarks
    const rootlevelNavigator = new LevelNavigator(null);

    // iterate on the pin path to open the pinned folder initially
    getPinPath().then((path) => {
      const startingPath = path ? path.split(',') : ['root'];
      pinPath.set(startingPath);

      const initialNavigatorLevels = [rootlevelNavigator];

      // this logic can be improved
      if (startingPath.length > 1) {
        // index 0 should always be a placeholder for root
        startingPath.slice(1).forEach((id, i) => {
          const folders = extractFolders(get(initialNavigatorLevels[i].displayedBookmarks))

          const pinnedPathFolder = folders.find((folder) => folder.id === id);
          if (!pinnedPathFolder) {
            console.warn('could not find pinned path folder', id, 'in', folders);
            navigatorLevels = initialNavigatorLevels;
            return;
          }

          initialNavigatorLevels.push(new LevelNavigator(pinnedPathFolder))
        })
      }

      navigatorLevels = initialNavigatorLevels;
    });
  }

  onMount(() => {
    setupNavigator();
  });
</script>

<BackgroundImage>
  <div class="NewTab">
    {#each navigatorLevels as navigator, depth (navigator.folder)}
      <FolderLevel
        levelNavigator={navigator}
        loadLevel={loadLevel}
        depth={depth}
        path={range(0,depth).map((num) => navigatorLevels[num].folder ? navigatorLevels[num].folder.id : 'root')}
      />
    {/each}
  </div>

  {#if $modal}
    <svelte:component this={$modal[0]} {...$modal[1]} />
  {/if}
</BackgroundImage>

<style>
  .NewTab {
    flex: 1;
    padding: 1rem;
  }
</style>
