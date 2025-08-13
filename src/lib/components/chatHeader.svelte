<script lang="ts">
  export let currentUser = { name: "Suraj Anarase" };
</script>

<div class="flex items-center justify-between p-4 bg-gray-800 text-white border-b border-gray-700">
  <div class="flex items-center">
    <img src={currentUser.avatar} alt={currentUser.name} class="w-10 h-10 rounded-full mr-3" />
    <div class="font-medium">{currentUser.name}</div>
  </div>
  <button class="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
</div>
