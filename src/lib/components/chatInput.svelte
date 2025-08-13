<script lang="ts">
  import { messages } from '$lib/stores/messages';

  let newMessage = '';

  function sendMessage() {
    if (newMessage.trim()) {
      messages.update(msgs => [
        ...msgs,
        {
          id: msgs.length + 1,
          sender: "Suraj Anarase", // Later, make this dynamic
          text: newMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      newMessage = '';
    }
  }
</script>

<div class="p-2 flex">
  <input
    type="text"
    bind:value={newMessage}
    placeholder="Type a message..."
    class="flex-1 p-2 rounded-l-lg bg-gray-800 text-white"
    on:keydown={(e) => e.key === 'Enter' && sendMessage()}
  />
  <button
    on:click={sendMessage}
    class="bg-blue-500 px-4 rounded-r-lg text-white"
  >
    Send
  </button>
</div>
