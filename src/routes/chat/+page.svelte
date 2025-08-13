<script lang="ts">
  import { onMount } from "svelte";
  import ChatSidebar from "$lib/components/chatSidebar.svelte";
  import ChatHeader from "$lib/components/chatHeader.svelte";
  import ChatMessages from "$lib/components/chatMessages.svelte";
  import ChatInput from "$lib/components/chatInput.svelte";

  let messagesContainer: HTMLDivElement;

  onMount(() => {
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  });
</script>

<div class="h-screen flex bg-gray-950">
  <ChatSidebar />

  <div class="flex flex-col flex-1">
    <ChatHeader />
    <div class="flex-1 overflow-y-auto" bind:this={messagesContainer}>
      <ChatMessages />
    </div>
    <ChatInput />
  </div>
</div>

