<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import { get } from 'svelte/store';

  import BackgroundImage from '@/components/BackgroundImage.svelte';
  import EditModal from '@/components/EditModal.svelte';
  import { LevelNavigator } from '@/lib/levelNavigator';
  import FolderLevel from '@/containers/FolderLevel.svelte';
  import type { FolderNode } from '@/types/bookmarks';
  import { getPinPath, pinPath } from '@/services/pinned';
  import { range } from '@/lib/range';
  import { showModal } from './services/edit';

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
          const pinnedPathFolder = get(initialNavigatorLevels[i].displayedFolders).find((folder) => folder.id === id);
          if (!pinnedPathFolder) {
            console.warn('could not find pinned path folder', id, 'in', get(initialNavigatorLevels[i].displayedFolders));
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

  {#if $showModal}
    <EditModal
      node={$showModal}
    />
  {/if}
</BackgroundImage>

<style>
  .NewTab {
    flex: 1;
    padding: 1rem;
  }
</style>
