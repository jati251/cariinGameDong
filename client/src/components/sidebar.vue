<script>
import Swal from 'sweetalert2'
import sidebarList from '../components/sidebarList.vue'
export default {
  data() {
    return {
      dates: [
        2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009,
        2008
      ],
      token: localStorage.access_token
    }
  },
  emits: ['fetchByYear', 'fetchByPlatform'],
  methods: {
    fetchByYear(val) {
      this.$emit('fetchByYear', val)
    },
    fetchByPlatform(val) {
      this.$emit('fetchByPlatform', val)
    },
    logoutHandler() {
      localStorage.clear()
      this.token = null
      this.$router.push('/login')
      Swal.fire({
        title: 'Account has been logged out',
        showConfirmButton: false,
        timer: 1500
      })
    }
  },
  components: {
    sidebarList
  }
}
</script>

<template>
  <div
    class="absolute top-0 left-0 text-white w-40 h-screen z-10"
    style="background-color: #07080a"
  >
    <div class="p-10">
      <h1 class="text-xl font-semibold"></h1>
    </div>
    <ul class="mt-6 space-y-1">
      <li>
        <RouterLink
          to="/home"
          class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >Home</RouterLink
        >
      </li>

      <li>
        <details class="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <span class="text-sm font-medium"> Platforms </span>

            <span class="shrink-0 transition duration-300 group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <ul class="mt-2 space-y-1 px-4">
            <li>
              <a
                @click.prevent="fetchByPlatform('')"
                href=""
                class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Show all
              </a>
            </li>
            <sidebarList
              :val="'Playstation 5'"
              :type="187"
              @fetchByYear="fetchByYear"
              @fetchByPlatform="fetchByPlatform"
            ></sidebarList>
            <sidebarList
              :val="'Playstation 4'"
              :type="18"
              @fetchByYear="fetchByYear"
              @fetchByPlatform="fetchByPlatform"
            ></sidebarList>
            <sidebarList
              :val="'Xbox One'"
              :type="1"
              @fetchByYear="fetchByYear"
              @fetchByPlatform="fetchByPlatform"
            ></sidebarList>
            <sidebarList
              :val="'PC'"
              :type="4"
              @fetchByYear="fetchByYear"
              @fetchByPlatform="fetchByPlatform"
            ></sidebarList>
            <sidebarList
              :val="'iOS'"
              :type="3"
              @fetchByYear="fetchByYear"
              @fetchByPlatform="fetchByPlatform"
            ></sidebarList>
            <sidebarList
              :val="'Android'"
              :type="21"
              @fetchByYear="fetchByYear"
              @fetchByPlatform="fetchByPlatform"
            ></sidebarList>
            <sidebarList
              :val="'Nintendo'"
              :type="7"
              @fetchByYear="fetchByYear"
              @fetchByPlatform="fetchByPlatform"
            ></sidebarList>
          </ul>
        </details>
      </li>

      <li>
        <details class="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <span class="text-sm font-medium"> Year </span>

            <span class="shrink-0 transition duration-300 group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <ul class="mt-2 space-y-1 px-4">
            <li>
              <a
                @click.prevent="fetchByYear('')"
                href=""
                class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Show all
              </a>
            </li>
            <sidebarList
              v-for="date in dates"
              key="date"
              :val="date"
              :type="'year'"
              @fetchByYear="fetchByYear"
              @fetchByPlatform="fetchByPlatform"
            ></sidebarList>
          </ul>
        </details>
      </li>

      <li v-if="token">
        <details class="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <span class="text-sm font-medium"> Account </span>

            <span class="shrink-0 transition duration-300 group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <ul class="mt-2 space-y-1 px-4">
            <li>
              <router-link
                class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                to="/wishlist"
                >My Wishlist</router-link
              >
            </li>
            <!-- <li>
              <a
                href=""
                class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                My Reviews
              </a>
            </li> -->

            <li>
              <form action="/logout">
                <button
                  @click.prevent="logoutHandler"
                  type="submit"
                  class="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                >
                  Logout
                </button>
              </form>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</template>
