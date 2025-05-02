<script lang="ts">
  export let onClick: () => void;
</script>

<button class="ListItem" on:click={onClick}>
  <slot></slot>
</button>

<style>
  .ListItem {
    height: 40px;
    flex-direction: row;
    padding: 6px;

    /* remove default button styling */
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font: inherit;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
</style>