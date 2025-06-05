<script lang="ts">
  import { createFolder } from '@/services/create';
  import { closeModal } from '@/services/modal';
  import type { ID } from '@/types/abstract';

  export let parentId: ID;

  async function onSave() {
    createFolder(parentId, editTitle);
    // window.location.reload(); // TODO improve this solution
  }

  // local editable copy
  let editTitle: string;
</script>

<div 
  class="backdrop"
  role="button"
  tabindex={-1}
  on:click={closeModal}
  on:keydown={(e) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  }}
  >
  <div 
    class="modal" 
    role="button"
    tabindex={1}
    on:click|stopPropagation
    on:keydown={(e) => {
      console.log("key clicked", e.key);
      if (e.key === 'Enter') {
        onSave();
      }
      if (e.key === 'Escape') {
        closeModal();
      }
    }}
  >
    <h2>New Folder</h2>

    <div class="field">
      <label for="edit-title">Title</label>
      <input
        id="edit-title"
        type="text"
        bind:value={editTitle}
      />
    </div>

    <div class="buttons">
      <button type="button" on:click={closeModal}>Cancel</button>
      <button type="button" class="save" on:click={onSave}>Save</button>
    </div>
  </div>
</div>

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }

  .modal {
    background: white;
    padding: 1rem;
    border-radius: 6px;
    width: 320px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }

  h2 {
    margin: 0 0 0.75rem 0;
    font-size: 1.25rem;
  }

  .field {
    margin-bottom: 0.75rem;
  }

  label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  input[type="text"] {
    width: 100%;
    padding: 0.4rem;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  button {
    padding: 0.4rem 0.8rem;
    font: inherit;
    cursor: pointer;
    border: 1px solid #777;
    border-radius: 4px;
    background: #f0f0f0;
  }

  button:hover {
    border: 1px solid #000;
    opacity: 80%;
  }

  .save {
    background: #1976d2;
    color: white;
    margin-left: auto;
  }
</style>