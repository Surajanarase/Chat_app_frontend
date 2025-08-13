<script lang="ts">
  export let messages = [
    { id: 1, text: "Hey there!", sender: "other" },
    { id: 2, text: "Hi! How are you?", sender: "me" },
    { id: 3, text: "I’m good, thanks!", sender: "other" }
  ];
</script>

<div class="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-950 text-white">
  {#each messages as msg}
    <div class={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
      <div class={`px-4 py-2 rounded-lg max-w-xs ${msg.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-700'}`}>
        {msg.text}
      </div>
    </div>
  {/each}
</div>
