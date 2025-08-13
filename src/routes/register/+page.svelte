<script lang="ts">
  import { writable } from 'svelte/store';
  import { registerSchema } from '$lib/validation/registerSchema';

  let fullName = '';
  let email = '';
  let password = '';
  let confirmPassword = '';

  let errors = writable<{ [key: string]: string }>({});

  const handleRegister = () => {
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
    } else {
      errors.set({});
      console.log("Registration data ready:", { fullName, email, password });
      // Later: send to backend
    }
  };
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>

    <form on:submit|preventDefault={handleRegister} class="space-y-4">

      <!-- Full Name -->
      <div>
        <input
          type="text"
          placeholder="Full Name"
          bind:value={fullName}
          class="border p-2 w-full rounded"
        />
        {#if $errors.fullName}
          <p class="text-red-500 text-sm">{$errors.fullName}</p>
        {/if}
      </div>

      <!-- Email -->
      <div>
        <input
          type="email"
          placeholder="Email"
          bind:value={email}
          class="border p-2 w-full rounded"
        />
        {#if $errors.email}
          <p class="text-red-500 text-sm">{$errors.email}</p>
        {/if}
      </div>

      <!-- Password -->
      <div>
        <input
          type="password"
          placeholder="Password"
          bind:value={password}
          class="border p-2 w-full rounded"
        />
        {#if $errors.password}
          <p class="text-red-500 text-sm">{$errors.password}</p>
        {/if}
      </div>

      <!-- Confirm Password -->
      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          bind:value={confirmPassword}
          class="border p-2 w-full rounded"
        />
        {#if $errors.confirmPassword}
          <p class="text-red-500 text-sm">{$errors.confirmPassword}</p>
        {/if}
      </div>

      <!-- Submit -->
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Register
      </button>

    </form>

    <p class="text-sm text-center mt-4">
      Already have an account?
      <a href="/login" class="text-blue-600 hover:underline">Login</a>
    </p>
  </div>
</div>
