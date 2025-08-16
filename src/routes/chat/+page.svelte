<script lang="ts">
  import { onMount } from "svelte";

  let messages: { id: number; userId: number; text: string }[] = [];
  let newMessage = "";
  let token = localStorage.getItem("token");

  // Fetch messages
  async function loadMessages() {
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Failed to fetch messages");
      messages = await res.json();
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  }

  // Send a message
  async function sendMessage() {
    if (!newMessage.trim()) return;
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text: newMessage })
      });

      if (!res.ok) throw new Error("Failed to send message");
      const msg = await res.json();
      messages = [...messages, msg]; // append new msg
      newMessage = "";
    } catch (err) {
      console.error("Error sending message:", err);
    }
  }

  onMount(() => {
    loadMessages();
  });
</script>

<h1 class="text-2xl font-bold">Chat Room</h1>

<div class="border p-4 h-80 overflow-y-scroll bg-gray-50 rounded">
  {#each messages as msg}
    <div class="p-2 my-1 rounded bg-white shadow">
      <strong>User {msg.userId}:</strong> {msg.text}
    </div>
  {/each}
</div>

<form
  class="flex gap-2 mt-4"
  on:submit|preventDefault={sendMessage}
>
  <input
    type="text"
    bind:value={newMessage}
    placeholder="Type a message..."
    class="flex-1 border rounded p-2"
  />
  <button
    type="submit"
    class="bg-blue-500 text-white px-4 rounded"
  >
    Send
  </button>
</form>
