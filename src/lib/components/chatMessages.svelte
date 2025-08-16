<script lang="ts">
  // Match the same type you used in chat/page.svelte
  type ChatMessage = {
    id: number;
    sender: string;
    message: string;
    createdAt: string;
  };

  // ✅ Declare the prop and type it correctly
  export let chatData: ChatMessage[] = [];

  let messagesContainer: HTMLDivElement;
  let lastMessageCount = 0;

  import { tick } from 'svelte';

  $: if (chatData.length > lastMessageCount) {
    lastMessageCount = chatData.length;

    tick().then(() => {
      if (messagesContainer) {
        const isAtBottom =
          Math.abs(
            messagesContainer.scrollHeight -
              messagesContainer.scrollTop -
              messagesContainer.clientHeight
          ) < 50;

        if (isAtBottom) {
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
      }
    });
  }
</script>

<div
  bind:this={messagesContainer}
  class="p-4 space-y-2 overflow-y-auto flex-1"
>
  {#each chatData as msg}
    <div class="p-2 rounded-lg bg-gray-800 text-white max-w-xs">
      <div class="font-bold">{msg.sender}</div>
      <div>{msg.message}</div>
      <div class="text-xs text-gray-400">{msg.createdAt}</div>
    </div>
  {/each}
</div>
