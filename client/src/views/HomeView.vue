<script>
import { mapActions, mapState } from 'pinia'
import { useGameStore } from '../stores/game'
import sidebar from '../components/sidebar.vue'
import axios from 'axios'

export default {
  components: {
    sidebar
  },
  data() {
    return {
      gamesLoad: [],
      search: '',
      dates: '',
      page: 1,
      platforms: '',
      token: localStorage.access_token
    }
  },
  computed: {
    ...mapState(useGameStore, ['games'])
  },
  methods: {
    ...mapActions(useGameStore, ['fetchGames', 'donateAdmin']),
    async loadGames() {
      try {
        let query = {
          search: this.search,
          dates: this.dates,
          page: this.page,
          platforms: this.platforms
        }
        let fetch = await this.fetchGames(query)
        this.gamesLoad = this.games
        this.$router.push('/home')
      } catch (error) {
        console.log(error)
      }
    },
    donateAdminHandler() {
      this.donateAdmin()
    },
    async loadMore() {
      this.page++
      try {
        let query = {
          search: this.search,
          dates: this.dates,
          page: this.page,
          platforms: this.platforms
        }
        let fetch = await this.fetchGames(query)
        this.gamesLoad.push(...this.games)
      } catch (error) {}
    },
    infiniteScroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + document.documentElement.clientHeight >=
          document.documentElement.scrollHeight
        if (bottomOfWindow && this.$route.matched.some(({ name }) => name === 'main')) {
          this.loadMore()
        }
      }
    },
    fetchByYear(val) {
      this.page = 1
      this.dates = val
      this.loadGames()
    },
    fetchByPlatform(val) {
      this.page = 1
      this.platforms = val
      this.loadGames()
    },
    searchHandler() {
      this.page = 1
      this.loadGames()
    }
  },
  created() {
    this.loadGames()
  },
  mounted() {
    this.infiniteScroll()
  }
}
</script>

<template>
  <section class="">
    <div class="flex" style="background-color: #07080a">
      <sidebar @fetchByYear="fetchByYear" @fetchByPlatform="fetchByPlatform"></sidebar>

      <div class="ml-48 flex-grow">
        <div
          class="fixed top-0 left-0 right-0 bg-gray-800 text-white h-16 flex items-center justify-center px-6 z-10 gap-7"
        >
          <form
            action=""
            class="flex justify-center bg-white text-gray-700 rounded-lg border-2 w-80 overflow-hidden"
          >
            <input
              v-model="search"
              type="search"
              placeholder="Search..."
              class="block rounded-md border-0 focus:outline-none focus:ring-0 focus:border-blue-500 flex-grow p-2"
            />
            <button @click.prevent="searchHandler" type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 my-auto m-2"
                style="color: gray"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
          <button
            @click.prevent="donateAdminHandler"
            class="bg-teal-600 text-white/75 py-2 px-4 rounded flex"
          >
            Donate
          </button>
          <ul v-if="!token" class="flex items-center gap-6 text-md">
            <li>
              <RouterLink to="/login" class="text-white/75 transition hover:text-white"
                >Login</RouterLink
              >
            </li>
            <li>
              <RouterLink to="/register" class="text-white/75 transition hover:text-white"
                >Register
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Main Content with Cards -->
        <router-view :gamesLoad="gamesLoad" />
      </div>
    </div>
  </section>
</template>
