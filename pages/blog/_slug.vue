<template>
  <article>
    <v-sheet
      max-width="960"
      min-height="85vh"
      class="d-flex flex-column content pa-8 py-sm-4 my-sm-8 elevation-2"
    >
      <p class="display-2 font-weight-bold mb-0 mt-8 content-title">
        {{ article.title }}
      </p>
      <p class="py-2 body-1">
        <span class="text--secondary">
          {{ fmtDate(article.updatedAt) + '发布' }}
        </span>
        <span class="ml-2 text--secondary">
          约{{ article.readingTime.words }}个字,{{
            parseInt(article.readingTime.minutes + 1)
          }}分钟内读完
        </span>
      </p>
      <div class="content-box px-4">
        <nuxt-content :document="article" />
      </div>
      <v-spacer></v-spacer>
      <pagination :prev="prev" :next="next"></pagination>
    </v-sheet>
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
@import '~/assets/style/md.scss';
.v-application code {
  background-color: transparent;
  color: #fff;
}
.content {
  margin: auto;
  &-box {
    margin: 0px;
  }
  .nuxt-content {
    code,
    pre {
      // background-color: transparent;
      text-shadow: none;
      font-weight: 300;
      font-size: 1rem;
      font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    }
    &-highlight {
      // background-color: #f8f8f8;
      .filename {
        position: absolute;
        top: 48px;
        color: #fff;
        right: 8px;
      }
    }
    @include markdown-scss;
  }
}
</style>
