<script lang="ts">
  import { onMount } from 'svelte';
  import { get, writable } from 'svelte/store';

  import BackgroundImage from '@/components/BackgroundImage.svelte';
  import { LevelNavigator } from '@/lib/levelNavigator';
  import FolderLevel from '@/containers/FolderLevel.svelte';
  import type { FolderNode } from './types/bookmarks';

  let navigatorLevels = writable<LevelNavigator[]>([]);

  function loadLevel(folderNode: FolderNode | null, fromDepth: number) {
    const navigator = new LevelNavigator(folderNode);
    const depth = fromDepth + 1;

    const newNavigatorLevels = [ ...get(navigatorLevels)];
    newNavigatorLevels.splice(depth);
    newNavigatorLevels.push(navigator);
    navigatorLevels.set(newNavigatorLevels);
  }

  onMount(() => {
    // initialise root children and initialise as zeroth level
    const rootlevelNavigator = new LevelNavigator(null);
    navigatorLevels.set([...get(navigatorLevels), rootlevelNavigator]);
  });
</script>

<BackgroundImage>
  <div class="NewTab">
    {#each $navigatorLevels as navigator, depth (navigator.folder)}
      <FolderLevel levelNavigator={navigator} loadLevel={loadLevel} depth={depth} />
    {/each}
  </div>
</BackgroundImage>

<style>
  .NewTab {
    flex: 1;
    padding: 1rem;
  }
</style>
