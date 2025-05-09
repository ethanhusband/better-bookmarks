<script lang="ts">
  import ActionButton from "@/components/ActionButton.svelte";
  import { setBackgroundImage } from "@/services/backgroundImage";

  async function handleFileChange(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const selectedFile = input.files?.[0] ?? null;

    if (!selectedFile) {
      console.debug('no file selected');
      return;
    }

    try {
      setBackgroundImage(selectedFile);
    } catch (error) {
      console.error(`Error uploading file: ${error}`);
    }
  }
</script>

<ActionButton
  onClick={() => null}
>
  <label class="BackgroundButton">
    <img
      src="/assets/set-wallpaper.svg"
      alt="Wallpaper Icon"
      width="24"
      height="24"
    />
    <p class="pin-text">
      Set Background 
    </p>
    <input
      type="file"
      on:change={handleFileChange}
      style="position: absolute; opacity: 0; width: 0; height: 0;"
    />
  </label>
</ActionButton>

<style>
  .BackgroundButton {
    cursor: pointer;
    height: 40px;
    padding: 0px 1rem;
    display: flex;
    gap: 4px;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
    background: rgba(0,0,0,0.5);
    color: white;
  }

  .BackgroundButton:hover {
    background: #1976d2;
  }

  .pin-text {
    white-space: nowrap;
    font-size: 18px;
    font-family: 'Inter', sans-serif;
  }
</style>