<script lang="ts">
  import { writable } from 'svelte/store';
  import { loginSchema } from '$lib/validation/loginSchema';
  import { goto } from '$app/navigation';
  import { setSession } from '$lib/stores/auth';
  import { joinUserRoom } from "$lib/socket/socket";
  import { login } from "$lib/api/authApi";

  let email = '';
  let password = '';

  let errors = writable<{ [key: string]: string }>({});
  let loading = writable(false);

  const handleLogin = async () => {
    // Validate with Joi
    const { error } = loginSchema.validate({ email, password }, { abortEarly: false });

    if (error) {
      const errObj: Record<string, string> = {};
      error.details.forEach((e) => {
        errObj[e.path[0] as string] = e.message;
      });
      errors.set(errObj);
      return;
    }

    errors.set({});
    loading.set(true);

    try {
      const data = await login(email, password);

      if (!data?.token) {
        errors.set({ general: data.error || "Login failed" });
        return;
      }

      // Save session
      setSession(data.token, data.user);

      // Join socket room
      joinUserRoom(data.user.id);

      // Redirect
      goto("/chat");
    } catch (err) {
      console.error("Login error:", err);
      errors.set({ general: "Something went wrong, try again." });
    } finally {
      loading.set(false);
    }
  };
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-900 text-white">
  <div class="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
    <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>

    <form on:submit|preventDefault={handleLogin} class="space-y-4">
      <!-- Email -->
      <div>
        <label for="email" class="block mb-1">Email</label>
        <input id="email" type="email" bind:value={email}
          placeholder="Enter email"
          class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600" />
        {#if $errors.email}<p class="text-red-400 text-sm mt-1">{$errors.email}</p>{/if}
      </div>

      <!-- Password -->
      <div>
        <label for="password" class="block mb-1">Password</label>
        <input id="password" type="password" bind:value={password}
          placeholder="Enter password"
          class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600" />
        {#if $errors.password}<p class="text-red-400 text-sm mt-1">{$errors.password}</p>{/if}
      </div>

      <!-- General errors -->
      {#if $errors.general}
        <p class="text-red-400 text-center mt-2">{$errors.general}</p>
      {/if}

      <!-- Submit button -->
      <button type="submit"
        class="w-full p-2 mt-4 bg-blue-600 hover:bg-blue-700 rounded font-semibold"
        disabled={$loading}>
        {#if $loading}Logging in...{:else}Login{/if}
      </button>
    </form>
  </div>
</div>
