<script lang="ts">
  import { loginSchema } from '$lib/validation/loginSchema';
  import { writable } from 'svelte/store';

  let email = '';
  let password = '';
  let errors = writable<{ email?: string; password?: string }>({});

  const handleLogin = () => {
    const { error } = loginSchema.validate({ email, password }, { abortEarly: false });

    if (error) {
      let errObj: Record<string, string> = {};
      error.details.forEach((e) => {
        errObj[e.path[0] as string] = e.message;
      });
      errors.set(errObj);
    } else {
      errors.set({});
      console.log("Form data ready to send:", { email, password });
      //Later: send to backend via fetch()
    }
  };
</script>

<div class="flex flex-col items-center">
  <img src="/logo.jpg" alt="Namaste Logo" class="w-60 h-30" />
  <h1 class="text-3xl font-bold text-gray-800">नमस्ते,Welcome!!!</h1>
</div>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="bg-white rounded-lg shadow p-8 w-full max-w-sm transform -translate-y-16">
    <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>

    <!-- Email -->
    <div class="mb-4">
      <label for="email" class="block text-sm font-medium mb-1">Email</label>
      <input
        id="email"
        type="email"
        bind:value={email}
        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your email"
      />
      {#if $errors.email}
        <p class="text-red-500 text-sm mt-1">{$errors.email}</p>
      {/if}
    </div>

    <!-- Password -->
    <div class="mb-6">
      <label for="password" class="block text-sm font-medium mb-1">Password</label>
      <input
        id="password"
        type="password"
        bind:value={password}
        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your password"
      />
      {#if $errors.password}
        <p class="text-red-500 text-sm mt-1">{$errors.password}</p>
      {/if}
    </div>

    <!-- Login Button -->
    <button 
      on:click={handleLogin}
      class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
    >
      Login
    </button>

    <p class="text-sm text-center mt-4">
      Don’t have an account?
      <a href="/register" class="text-blue-600 hover:underline">Register</a>
    </p>
  </div>
</div>
