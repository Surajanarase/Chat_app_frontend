<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import { authUser, clearSession } from "$lib/stores/auth";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores"; // detect current route

  function logout() {
    clearSession();
    goto("/login");
  }
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen flex flex-col">
  <!-- Navbar/Header -->
  <header class="p-4 flex justify-between bg-gray-800 text-white">
    <h1 class="font-bold text-xl">Chat App</h1>

    <!-- Hide on login/register -->
    {#if $authUser && $page.url.pathname !== "/login" && $page.url.pathname !== "/register"}
      <div class="flex items-center gap-4">
        <span>Hi, {$authUser.username}</span>
        <button
          on:click={logout}
          class="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    {/if}
  </header>

  <!-- Page content -->
  <main class="flex-1 p-4">
    <slot />
  </main>
</div>
