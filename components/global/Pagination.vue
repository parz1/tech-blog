<template>
  <div class="d-flex justify-space-between mt-8">
    <nuxt-link
      v-if="prev"
      :to="{ name: 'blog-slug', params: { slug: prev.slug } }"
    >
      <v-btn text>
        <v-icon>mdi-chevron-left</v-icon>
        <span class="body-1 text-truncate" style="max-width: 30vw;">
          {{ prev.title }}</span
        >
      </v-btn>
    </nuxt-link>
    <v-spacer></v-spacer>
    <nuxt-link
      v-if="next"
      :to="{ name: 'blog-slug', params: { slug: next.slug } }"
    >
      <v-btn text class="d-flex justify-center">
        <span class="body-1 text-truncate" style="max-width: 30vw;">
          {{ next.title }}</span
        >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    prev: {
      type: Object,
      default: () => null,
    },
    next: {
      type: Object,
      default: () => null,
    },
  },
}
</script>

<style scoped>
nuxt-link {
  text-decoration-line: none;
}
</style>
