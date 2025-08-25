<script lang="ts">
  import { onMount } from "svelte";
  import { socket } from "$lib/socket/socket";
  import { authToken, authUser } from "$lib/stores/auth";
  import { get } from "svelte/store";

  let users: any[] = [];             // all registered users
  let receiverId: number | null = null; // selected user
  let messages: Record<number, any[]> = {}; // store chats per user { userId: messages[] }
  let newMessage = "";

  let currentUser: any = null; // store logged in user

  // Load users on mount
  onMount(async () => {
    currentUser = get(authUser); // fetch logged in user

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

    // Listen for incoming socket messages
    socket.on("receiveMessage", (msg) => {
      const currentUserId = currentUser?.id;

      if (msg.sender.id === currentUserId || msg.receiverId === currentUserId) {
        const otherUserId =
          msg.sender.id === currentUserId ? msg.receiverId : msg.sender.id;

        if (!messages[otherUserId]) messages[otherUserId] = [];
        messages[otherUserId] = [...messages[otherUserId], msg];
      }
    });
  });

  // Load chat history when user is selected
  async function loadChatHistory(userId: number) {
    receiverId = userId;
    const token = get(authToken);
    if (!receiverId || !token) return;

    // if already loaded, don’t fetch again
    if (messages[receiverId] && messages[receiverId].length > 0) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/chat/messages?receiverId=${receiverId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      messages[receiverId] = await res.json();
    } catch (err) {
      console.error("Failed to load messages:", err);
    }
  }

  // Send a message
  function sendMessage() {
    if (!newMessage.trim() || !currentUser || !receiverId) return;

    const msg = {
      senderId: currentUser.id,
      receiverId,
      text: newMessage,
      sender: { id: currentUser.id, username: currentUser.username }
    };

    // only emit, don't push locally (socket will handle it)
    socket.emit("sendMessage", msg);

    newMessage = "";
  }
</script>

<!-- Show welcome message -->
<h1 class="text-2xl font-bold mb-2">
  Welcome {currentUser?.username}
</h1>

<div class="flex h-[600px] border rounded overflow-hidden">
  <!-- Left sidebar (users list) -->
  <div class="w-1/3 border-r bg-gray-100">
    <h2 class="p-2 font-semibold">Users</h2>
    <ul>
      {#each users as u}
        <li>
          <button
            type="button"
            class="w-full text-left p-2 hover:bg-gray-200 {receiverId === u.id ? 'bg-gray-300' : ''}"
            on:click={() => loadChatHistory(u.id)}
          >
            {u.username}
          </button>
        </li>
      {/each}
    </ul>
  </div>

  <!-- Right chat area -->
  <div class="w-2/3 flex flex-col">
    {#if receiverId}
      <!-- Chat messages -->
      <div class="flex-1 p-4 overflow-y-scroll bg-gray-50">
        {#each messages[receiverId] || [] as msg}
          <div
            class="p-2 my-1 rounded {msg.sender?.id === currentUser?.id 
              ? 'bg-green-200 text-right' 
              : 'bg-gray-200 text-left'}"
          >
            <strong>{msg.sender?.username}:</strong> {msg.text}
          </div>
        {/each}
      </div>

      <!-- Input form -->
      <form class="flex gap-2 p-2 border-t" on:submit|preventDefault={sendMessage}>
        <input
          type="text"
          bind:value={newMessage}
          placeholder="Type a message..."
          class="flex-1 border rounded p-2"
        />
        <button type="submit" class="bg-blue-500 text-white px-4 rounded">Send</button>
      </form>
    {:else}
      <div class="flex-1 flex items-center justify-center text-gray-500">
        Select a user to start chatting
      </div>
    {/if}
  </div>
</div>
