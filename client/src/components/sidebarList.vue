<script>
export default {
  props: ['type', 'val'],
  emits: ['fetchByYear', 'fetchByPlatform'],
  methods: {
    fetchByYear() {
      this.$emit('fetchByYear', this.val)
    },
    fetchByPlatform() {
      this.$emit('fetchByPlatform', this.type)
    }
  }
}
</script>

<template>
  <li v-if="type === 'year'">
    <a
      @click.prevent="fetchByYear()"
      href=""
      class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
    >
      {{ val }}
    </a>
  </li>

  <li v-else>
    <a
      @click.prevent="fetchByPlatform()"
      href=""
      class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
    >
      {{ val }}
    </a>
  </li>
</template>
