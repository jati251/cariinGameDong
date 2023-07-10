<script>
import gameCard from '../components/gameCard.vue'
export default {
  props: ['gamesLoad'],
  components: {
    gameCard
  }
}
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold mb-4">.</h2>
    <div class="grid grid-cols-4 lg:grid-cols-3 gap-3 w-full text-gray-100">
      <gameCard v-for="game in gamesLoad" :key="game.id" :game="game"></gameCard>
    </div>
  </div>
</template>
