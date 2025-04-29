<script lang="ts">
  export let src: string = "/assets/default_bg.jpg";
  export let alt: string = "Default Background";
</script>

<div class="background-container">
  <img src={src} alt={alt} class="background-image" />
  <div class="foreground-content">
    <slot></slot>
  </div>
</div>

<style>
  .background-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }

  .foreground-content {
    position: relative;
    z-index: 1;
  }
</style>