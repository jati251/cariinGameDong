<script>
import { mapActions } from 'pinia'
import { useGameStore } from '../stores/game'

export default {
  props: ['game'],
  methods: {
    ...mapActions(useGameStore, ['getGameDetail']),
    detailHandler() {
      this.getGameDetail(this.game.id)
    }
  },
  computed: {
    formatDate() {
      const date = new Date(this.game.released)

      const year = date.getFullYear()
      const month = date.toLocaleString('default', { month: 'long' })
      const day = date.getDate()

      return `${day} ${month} ${year} `
    }
  }
}
</script>

<template>
  <a @click.prevent="detailHandler" href="">
    <div
      class="flex flex-col overflow-hidden transition duration-100 ease-in-out transform rounded-lg shadow-2xl hover:scale-105"
      style="background-color: #1a2026"
    >
      <img class="h-56 rounded-t-lg" alt="article image" :src="game.background_image" />
      <div class="px-6 pt-4 mb-2 text-xl font-bold">
        <span>{{ game.name }}</span>
      </div>
      <div class="px-6 overflow-hidden h-16">
        {{ formatDate }}
      </div>
      <div class="px-6 pb-4">
        <div v-for="(tag, index) in game.tags" key:tag.id>
          <a
            v-if="tag.language === 'eng' && index < 3"
            href="#"
            class="inline-block px-3 py-1 my-1 mr-2 text-sm font-semibold text-white bg-teal-600 rounded-full"
            >{{ tag.name }}</a
          >
        </div>
      </div>
    </div>
  </a>
</template>
