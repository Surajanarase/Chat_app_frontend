<script lang="ts">
  import { onMount } from "svelte";
  import { socket } from "$lib/socket/socket";
  import { authToken, authUser } from "$lib/stores/auth";
  import { get } from "svelte/store";

  let messages: any[] = [];
  let newMessage = "";

  let users: any[] = [];          // all registered users
  let receiverId: number | null = null;  // selected user

  // Load users on mount
  onMount(async () => {
    const token = get(authToken);
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      users = await res.json();
    } catch (err) {
      console.error("Failed to load users:", err);
    }

    // Listen for incoming messages
    socket.on("receiveMessage", (msg) => {
      messages = [...messages, msg];
    });
  });

  // Send a message
  function sendMessage() {
    const sender = get(authUser)?.id;
    if (!newMessage.trim() || !sender || !receiverId) return;

    socket.emit("sendMessage", {
      senderId: sender,
      receiverId,
      text: newMessage
    });

    // Removed local append to prevent duplication
    newMessage = "";
  }
</script>

<h1 class="text-2xl font-bold mb-4">Chat Room</h1>

<!-- Select user to chat with -->
<select bind:value={receiverId} class="border p-2 rounded mb-4 w-full">
  <option disabled selected value={null}>Select user to chat with</option>
  {#each users as u}
    <option value={u.id}>{u.username} ({u.email})</option>
  {/each}
</select>

<!-- Chat messages -->
<div class="border p-4 h-80 overflow-y-scroll bg-gray-50 rounded">
  {#each messages as msg}
    <div
      class="p-2 my-1 rounded {msg.senderId === get(authUser)?.id 
        ? 'bg-green-200 text-right' 
        : 'bg-gray-200 text-left'}"
    >
      <strong>User {msg.senderId}:</strong> {msg.text}
    </div>
  {/each}
</div>

<!-- Input form -->
<form class="flex gap-2 mt-4" on:submit|preventDefault={sendMessage}>
  <input
    type="text"
    bind:value={newMessage}
    placeholder="Type a message..."
    class="flex-1 border rounded p-2"
  />
  <button type="submit" class="bg-blue-500 text-white px-4 rounded">Send</button>
</form>
