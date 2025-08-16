<script lang="ts">
  export let users = [
    { id: 1, name: "Suraj anarase", lastMessage: "See you soon"  },
    { id: 2, name: "Inflection_zone", lastMessage: "Typing..." },
    { id: 3, name: "Fullstack", lastMessage: "Okay"   }
  ];
</script>

<div class="w-64 bg-gray-900 text-white flex flex-col">
  <div class="p-4 font-bold text-lg border-b border-gray-700">Chats</div>
  <div class="flex-1 overflow-y-auto">
    {#each users as user}
      <div class="flex items-center p-3 hover:bg-gray-800 cursor-pointer">
        <img src=Image.jpeg alt={user.name} class="w-10 h-10 rounded-full mr-3" />
        <div>
          <div class="font-medium">{user.name}</div>
          <div class="text-sm text-gray-400 truncate w-40">{user.lastMessage}</div>
        </div>
      </div>
    {/each}
  </div>
</div>
