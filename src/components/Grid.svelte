<script lang="ts">
</script>


<div class="Grid">
  <slot></slot>
</div>

<style>
  .Grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);   /* create as many 100px columns as will fit, then wrap */
    grid-auto-rows: auto;
    gap: 1rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
  }
</style>