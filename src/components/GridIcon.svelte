<script lang="ts">
  export let backgroundColor: string;
  export let backgroundColorHover: string = backgroundColor;
</script>


<div class="GridIcon" style="--bg: {backgroundColor}; --bg-hover: {backgroundColorHover};">
  <slot></slot>
</div>

<style>
  .GridIcon {
    background: var(--bg);

    transition: transform 0.15s ease-in-out;
    transform-origin: center center;

    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    padding: 4px;
  }

  .GridIcon:hover {
    background: var(--bg-hover);
    transform: scale(1.1);
  }
</style>