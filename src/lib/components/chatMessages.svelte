<script lang="ts">
  import { messages } from '$lib/stores/messages';
  import { tick } from 'svelte';

  let messagesContainer: HTMLDivElement;
  let lastMessageCount = 0;

  $: if ($messages.length > lastMessageCount) {
    lastMessageCount = $messages.length;

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
  {#each $messages as msg}
    <div class="p-2 rounded-lg bg-gray-800 text-white max-w-xs">
      <div class="font-bold">{msg.sender}</div>
      <div>{msg.text}</div>
      <div class="text-xs text-gray-400">{msg.timestamp}</div>
    </div>
  {/each}
</div>
