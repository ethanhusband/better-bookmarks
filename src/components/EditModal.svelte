<script lang="ts">
  import { closeModal, handleDelete, handleSave } from '@/services/edit';
  import { isFolderNode, type TreeNode } from '@/types/bookmarks';

  export let node: TreeNode;

  async function onDelete() {
    const confirmed = window.confirm(`Are you sure you want to delete ${node.title}?`);
    if (!confirmed) {
      return;
    }

    await handleDelete(node);
    window.location.reload(); // TODO improve this solution
  }

  // local editable copies
  let editTitle = node.title;
  let editUrl = node.url;
</script>

{#if node}
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
        if (e.key === 'Escape') {
          closeModal()
        }
      }}
    >
      <h2>{isFolderNode(node) ? 'Edit Folder' : 'Edit Bookmark'}</h2>

      <div class="field">
        <label for="edit-title">Title</label>
        <input
          id="edit-title"
          type="text"
          bind:value={editTitle}
        />
      </div>

      {#if !isFolderNode(node)}
        <div class="field">
          <label for="edit-url">URL</label>
          <input
            id="edit-url"
            type="text"
            bind:value={editUrl}
          />
        </div>
      {/if}

      <div class="buttons">
        <button type="button" class="delete" on:click={onDelete}>
          {isFolderNode(node) ? "Delete Folder" : "Delete Bookmark"}
        </button>
        <button type="button" class="save" on:click={() => handleSave(node, { title: editTitle, url: editUrl })}>Save</button>
        <button type="button" on:click={closeModal}>Cancel</button>
      </div>
    </div>
  </div>
{/if}

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

  .delete {
    background: #e53e3e;
    color: white;
  }

  .save {
    background: #1976d2;
    color: white;
    margin-left: auto;
  }
</style>