<script lang="ts">
  import { afterUpdate } from "svelte";
  import { messages, activeReceiverId } from "$lib/stores/chat";

  export let currentUser: { id: number; username: string } | null = null;

  let receiverId: number | null = null;
  $: receiverId = $activeReceiverId;

  let container: HTMLDivElement;

  // Scroll to bottom only when messages change
  afterUpdate(() => {
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  });
</script>

<div bind:this={container} class="flex-1 p-4 overflow-y-auto bg-gray-50">
  {#if receiverId !== null}
    {#each $messages[receiverId] || [] as msg}
      <div
        class="my-1 flex {msg.sender?.id === currentUser?.id ? 'justify-end' : 'justify-start'}"
      >
        <div
          class="p-2 rounded-lg max-w-xs break-words 
          {msg.sender?.id === currentUser?.id 
            ? 'bg-green-200 text-right' 
            : 'bg-gray-200 text-left'}"
        >
          <strong>{msg.sender?.username}:</strong> {msg.text}
        </div>
      </div>
    {/each}
  {/if}
</div>
