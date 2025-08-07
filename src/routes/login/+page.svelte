<div class="flex flex-col items-center ">
  <img src="/logo.jpg" alt="Namaste Logo" class="w-60 h-30 " />
  <h1 class="text-3xl font-bold text-gray-800">नमस्ते,Welcome!!!</h1>
</div>


<div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="bg-white rounded-lg shadow p-8 w-full max-w-sm transform -translate-y-16">
    <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>

    <div class="mb-4">
      <label for="email" class="block text-sm font-medium mb-1">Email</label>
      <input
        id="email"
        type="email"
        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your email"
      />
    </div>

    <div class="mb-6">
      <label for="password" class="block text-sm font-medium mb-1">Password</label>
      <input
        id="password"
        type="password"
        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your password"
      />
    </div>

    <button class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
      Login
    </button>

    <p class="text-sm text-center mt-4">
      Don’t have an account?
      <a href="/register" class="text-blue-600 hover:underline">Register</a>
    </p>
  </div>
</div>
