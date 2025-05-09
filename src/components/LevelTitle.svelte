<script lang="ts">
  import { isDarkMode } from "@/services/theme";

  export let iconScale: number = 1;
  export let iconUrl: string;
  export let scale: number = 1;
  export let title: string;
</script>

<div
  class="LevelTitle"
  class:dark={$isDarkMode}
  class:light={!$isDarkMode}
  style="--scale: {scale}; --icon_scale: {iconScale}"
>
  <img src={iconUrl} alt={title + " Icon"} class="icon" />
  <p class="title">{title}</p>
</div>

<style>
  .LevelTitle {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    user-select: none;
    padding: 0.5rem 0.5rem;
    background: transparent;
    height: calc(50px * var(--scale));
  }

  .LevelTitle.light {
    color: #333;
  }

  .LevelTitle.dark {
    color: #eee;
  }

  .icon {
    width: calc(48px * var(--icon_scale));
    height: calc(48px * var(--icon_scale));
  }

  .title {
    font-size: calc(32px * var(--scale));
    font-weight: bold;
    text-align: center;
    margin: 0;
    line-height: 1;
    display: inline-block;
  }
</style>