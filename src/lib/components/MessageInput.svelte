<script lang="ts">
  import { createEventDispatcher } from "svelte";

  let newMessage = "";

  // Typed dispatcher: event "send" carries a string (the message text)
  const dispatch = createEventDispatcher<{ send: string }>();

  function handleSubmit() {
    if (!newMessage.trim()) return;
    dispatch("send", newMessage);
    newMessage = "";
  }
</script>

<form class="flex gap-2 p-2 border-t" on:submit|preventDefault={handleSubmit}>
  <input
    type="text"
    bind:value={newMessage}
    placeholder="Type a message..."
    class="flex-1 border rounded p-2"
  />
  <button type="submit" class="bg-blue-500 text-white px-4 rounded">Send</button>
</form>
