<template>
  <article>
    <p>{{ fmtDate(article.updatedAt) }}</p>
    <v-icon>mdi-link</v-icon>
    <nuxt-content :document="article" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()
    return { article }
  },
  methods: {
    fmtDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      // local i18n
      return new Date(date).toLocaleDateString('zh-tw', options)
    },
  },
}
</script>

<style lang="scss">
.nuxt-content code {
  background-color: transparent;
  font-weight: 300;
  font-size: 0.8rem;
}
</style>
