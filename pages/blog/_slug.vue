<template>
  <article>
    <v-card flat max-width="960" class="content pa-4">
      <p>{{ fmtDate(article.updatedAt) }}</p>
      <div class="content-box">
        <nuxt-content :document="article" />
      </div>
    </v-card>
    <pagination :prev="prev" :next="next"></pagination>
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    return { article, prev, next }
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
.content {
  margin: auto;
  &-box {
    margin: 0px;
  }
  .nuxt-content {
    code {
      background-color: transparent;
      font-weight: 300;
      font-size: 1rem;
      padding: 0;
      font-family: inherit;
    }
    &-highlight {
      .filename {
        position: absolute;
        top: 48px;
        color: #fff;
        right: 8px;
      }
    }
    p {
      margin: 8px 0;
    }
  }
}
</style>
