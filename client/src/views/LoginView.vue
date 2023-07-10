<script>
import { mapActions } from 'pinia'
import { useUserStore } from '../stores/user'
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useUserStore, ['login'])
  }
}
</script>

<template>
  <div
    class="bg-cover bg-center h-screen w-screen fixed"
    :style="`background-image: url('https://wallpaperaccess.com/full/3046885.jpg')`"
  >
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div class="relative z-10">
      <!-- Your main content goes here -->
      <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-lg rounded-lg shadow-lg bg-black/75">
          <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl p-4">
            Login Now !
          </h1>

          <p class="mx-auto mt-4 max-w-md text-center text-gray-300">
            Get access to one of the biggest games library on all platforms in the world !
          </p>

          <form action="" class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
            <div>
              <label class="block mb-2 text-sm font-bold text-gray-200" for="email">Email</label>
              <input
                v-model="email"
                class="w-full rounded-lg border border-gray-400 p-3 text-sm"
                placeholder="Insert your email here"
                type="email"
                id="email"
              />
            </div>
            <div>
              <label class="block mb-2 text-sm font-bold text-gray-200" for="password"
                >Password</label
              >
              <input
                v-model="password"
                class="w-full rounded-lg border border-gray-400 p-3 text-sm"
                placeholder="Insert your password here"
                type="password"
                id="password"
              />
            </div>
            <div class="flex justify-center gap-3">
              <button
                @click.prevent="login({ email, password })"
                type="submit"
                class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
              >
                Login
              </button>
              <RouterLink
                to="/"
                class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm text-center font-medium text-white"
              >
                Cancel</RouterLink
              >
            </div>
            <div class="text-center">
              <p class="text-sm text-gray-500">
                Don't have an account?
                <a class="underline" href="#" @click.prevent="$router.push('/register')"
                  >Register now</a
                >
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div
      class="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-black via-transparent to-transparent"
    ></div>
  </div>
</template>
