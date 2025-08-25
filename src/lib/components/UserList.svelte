<script lang="ts">
  import { users, activeReceiverId } from "$lib/stores/chat";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function selectUser(id: number) {
    dispatch("selectUser", id);
  }
</script>

<div class="w-1/3 border-r bg-gray-100">
  <h2 class="p-2 font-semibold">Users</h2>
  <ul>
    {#each $users as u}
      <li>
        <button
          type="button"
          class="w-full text-left p-2 hover:bg-gray-200 {$activeReceiverId === u.id ? 'bg-gray-300' : ''}"
          on:click={() => selectUser(u.id)}
        >
          {u.username}
        </button>
      </li>
    {/each}
  </ul>
</div>
