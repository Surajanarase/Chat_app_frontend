<script lang="ts">
  import { writable } from 'svelte/store';
  import { registerSchema } from '$lib/validation/registerSchema';
  import { goto } from '$app/navigation';
  import { setSession } from '$lib/stores/auth';

  let fullName = '';
  let email = '';
  let password = '';
  let confirmPassword = '';

  let errors = writable<{ [key: string]: string }>({});
  let loading = writable(false);

  const handleRegister = async () => {
    // 1️⃣ Validate form
    const { error } = registerSchema.validate(
      { fullName, email, password, confirmPassword },
      { abortEarly: false }
    );

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
      // 2️⃣ Send data to backend using the expected field name 'username'
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: fullName, email, password })
      });

      let data: any = {};
      try { data = await res.json(); } catch {}

      if (!res.ok) {
        errors.set({ general: data.error || 'Registration failed' });
        return;
      }

      // 3️⃣ Save token in localStorage/store if backend returns one
      if (data.token) setSession(data.token, { username: fullName, email });

      // 4️⃣ Redirect to login or chat
      alert('Registration successful! Please login.');
      goto('/login');
    } catch (err) {
      console.error('Registration error:', err);
      errors.set({ general: 'Something went wrong, try again.' });
    } finally {
      loading.set(false);
    }
  };
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-900 text-white">
  <div class="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
    <h1 class="text-2xl font-bold mb-6 text-center">Register</h1>

    <form on:submit|preventDefault={handleRegister} class="space-y-4">
      <!-- Full Name -->
      <div>
        <label for="fullName" class="block mb-1">Full Name</label>
        <input
          id="fullName"
          bind:value={fullName}
          placeholder="Enter full name"
          class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
        />
        {#if $errors.fullName}
          <p class="text-red-400 text-sm mt-1">{$errors.fullName}</p>
        {/if}
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block mb-1">Email</label>
        <input
          id="email"
          bind:value={email}
          type="email"
          placeholder="Enter email"
          class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
        />
        {#if $errors.email}
          <p class="text-red-400 text-sm mt-1">{$errors.email}</p>
        {/if}
      </div>

      <!-- Password -->
      <div>
        <label for="password" class="block mb-1">Password</label>
        <input
          id="password"
          bind:value={password}
          type="password"
          placeholder="Enter password"
          class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
        />
        {#if $errors.password}
          <p class="text-red-400 text-sm mt-1">{$errors.password}</p>
        {/if}
      </div>

      <!-- Confirm Password -->
      <div>
        <label for="confirmPassword" class="block mb-1">Confirm Password</label>
        <input
          id="confirmPassword"
          bind:value={confirmPassword}
          type="password"
          placeholder="Confirm password"
          class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
        />
        {#if $errors.confirmPassword}
          <p class="text-red-400 text-sm mt-1">{$errors.confirmPassword}</p>
        {/if}
      </div>

      <!-- General errors -->
      {#if $errors.general}
        <p class="text-red-400 text-center mt-2">{$errors.general}</p>
      {/if}

      <!-- Submit button -->
      <button
        type="submit"
        class="w-full p-2 mt-4 bg-blue-600 hover:bg-blue-700 rounded font-semibold"
        disabled={$loading}
      >
        {#if $loading}Registering...{:else}Register{/if}
      </button>
    </form>
  </div>
</div>
