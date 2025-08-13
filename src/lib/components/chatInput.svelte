<script lang="ts">
  let newMessage = "";
  const sendMessage = () => {
    if (newMessage.trim()) {
      console.log("Send:", newMessage);
      newMessage = "";
    }
  };
</script>

<div class="p-4 bg-gray-800 flex items-center space-x-2">
  <input
    type="text"
    bind:value={newMessage}
    placeholder="Type a message..."
    class="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
  />
  <button
    on:click={sendMessage}
    class="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
  >
    Send
  </button>
</div>
