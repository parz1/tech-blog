<template>
  <article>
    <v-card flat max-width="960" min-height="85vh" class="content py-4 mt-lg-4">
      <v-btn text class="my-0 mx-2 px-2 d-flex justify-start align-center">
        <span class="body-1"> {{ fmtDate(article.updatedAt) + '发布' }}</span>
        <v-icon>mdi-calendar-edit</v-icon>
      </v-btn>
      <p class="display-2 font-weight-bold my-0 px-4 content-title">
        {{ article.title }}
      </p>
      <p class="py-2 px-4 body-2">
        <span class="text--secondary"
          >约{{ article.readingTime.words }}个字,{{
            parseInt(article.readingTime.minutes + 1)
          }}分钟内读完</span
        >
      </p>
      <div class="content-box px-4">
        <nuxt-content :document="article" />
      </div>
      <v-spacer></v-spacer>
      <pagination :prev="prev" :next="next"></pagination>
    </v-card>
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content('leetcode', params.slug).fetch()

    const [prev, next] = await $content('leetcode')
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
  head() {
    return {
      title: this.article.title,
    }
  },
}
</script>

<style lang="scss">
@import '~/assets/style/md.scss';
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
    @include markdown-scss;
  }
}
</style>
