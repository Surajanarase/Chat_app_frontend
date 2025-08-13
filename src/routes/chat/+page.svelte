<script lang="ts">
  import ChatSidebar from "$lib/components/chatSidebar.svelte";
  import ChatHeader from "$lib/components/chatHeader.svelte";
  import ChatMessages from "$lib/components/chatMessages.svelte";
  import ChatInput from "$lib/components/chatInput.svelte";
</script>

<div class="h-screen flex bg-gray-950">
  <!-- Sidebar -->
  <ChatSidebar />

  <!-- Main chat section -->
  <div class="flex flex-col flex-1">
    <ChatHeader />
    <!-- Messages area -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <ChatMessages />
    </div>
    <!-- Input box -->
    <ChatInput />
  </div>
</div>
