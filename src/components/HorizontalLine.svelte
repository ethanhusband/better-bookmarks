<script lang="ts">
  export let color: string;
  export let thickness: number;
  export let marginX: number;
  export let marginY: number
</script>

<hr
  class="divider HorizontalLine"
  style="
    height: {thickness}px;
    background: {color};
    margin: {marginY}px {marginX}px;
  "
/>

<style>
  .HorizontalLine {
    border: none;
  }
</style>