<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { socket } from "$lib/socket/socket";
  import { authToken, authUser } from "$lib/stores/auth";
  import { users, messages, activeReceiverId, addMessage } from "$lib/stores/chat";
  import { fetchUsers, fetchMessages } from "$lib/api/chatApi";
  import UserList from "$lib/components/UserList.svelte";
  import ChatBox from "$lib/components/ChatBox.svelte";
  import MessageInput from "$lib/components/MessageInput.svelte";


  let currentUser: any = null;

  // Load users and setup socket
  onMount(async () => {
    currentUser = get(authUser);
    const token = get(authToken);
    if (!token) return;

    try {
      const data = await fetchUsers(token);
      users.set(data);
    } catch (err) {
      console.error("Failed to load users:", err);
    }

    // Listen for incoming socket messages
    socket.on("receiveMessage", (msg) => {
      const currentUserId = currentUser?.id;

      if (msg.sender.id === currentUserId || msg.receiverId === currentUserId) {
        const otherUserId =
          msg.sender.id === currentUserId ? msg.receiverId : msg.sender.id;
        addMessage(otherUserId, msg);
      }
    });
  });

  // Load chat history
  async function loadChatHistory(userId: number) {
    activeReceiverId.set(userId);
    const token = get(authToken);
    if (!token) return;

    const $messages = get(messages);
    if ($messages[userId] && $messages[userId].length > 0) return;

    try {
      const data = await fetchMessages(token, userId);
      messages.update((m) => ({ ...m, [userId]: data }));
    } catch (err) {
      console.error("Failed to load messages:", err);
    }
  }

  // Send message via socket
  function sendMessage(newMessage: string) {
    const receiverId = get(activeReceiverId);
    if (!newMessage.trim() || !currentUser || !receiverId) return;

    const msg = {
      senderId: currentUser.id,
      receiverId,
      text: newMessage,
      sender: { id: currentUser.id, username: currentUser.username },
    };

    socket.emit("sendMessage", msg);
  }
</script>

<h1 class="text-2xl font-bold mb-2">
  Welcome {currentUser?.username}
</h1>

<div class="flex h-[600px] border rounded overflow-hidden">
  <!-- Left sidebar -->
  <UserList on:selectUser={(e) => loadChatHistory(e.detail)} />

  <!-- Right chat area -->
  <div class="w-2/3 flex flex-col">
    {#if $activeReceiverId}
      <ChatBox {currentUser} />
      <MessageInput on:send={(e) => sendMessage(e.detail)} />
    {:else}
      <div class="flex-1 flex items-center justify-center text-gray-500">
        Select a user to start chatting
      </div>
    {/if}
  </div>
</div>
