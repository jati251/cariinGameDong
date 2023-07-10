<script>
import { mapActions, mapState } from 'pinia'
import { useGameStore } from '../stores/game'
export default {
  methods: {
    ...mapActions(useGameStore, ['getWishlist', 'getGameDetail', 'deleteWishlist']),
    detailHandler(id) {
      this.getGameDetail(id)
    },
    deleteHandler(id) {
      this.deleteWishlist(id)
    }
  },
  computed: {
    ...mapState(useGameStore, ['wishlists'])
  },
  created() {
    this.getWishlist()
  }
}
</script>

<template>
  <section class="text-gray-500 body-font">
    <div class="container flex px-5 py-24 justify-center flex-col">
      <table class="table-auto border">
        <thead>
          <tr>
            <th>Game</th>
            <th>Image</th>
            <th>Detail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="wishlist in wishlists" :key="wishlist.id">
            <td class="flex justify-center">{{ wishlist.gameName }}</td>
            <td><img class="h-20 rounded-t-sm" alt="article image" :src="wishlist.imgUrl" /></td>
            <td class="">
              <button
                @click.prevent="detailHandler(wishlist.gameId)"
                class="bg-teal-600 text-white/75 py-2 px-4 rounded m-5"
              >
                Go to game page
              </button>
            </td>
            <td class="flex justify-center">
              <button
                @click.prevent="deleteHandler(wishlist.id)"
                class="bg-red-600 text-white/75 py-2 px-4 rounded m-5"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
