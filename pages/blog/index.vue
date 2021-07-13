<template>
  <v-container>
    <div class="mt-8 display-2 font-weight-black">parz1's BLOG</div>
    <div class="mb-9 headline font-weight-light">对技术的小总结</div>
    <v-row>
      <!-- <v-col cols="12" sm="3">
        <v-sheet rounded="lg" min-height="268">
          11
        </v-sheet>
      </v-col> -->

      <v-col cols="12" sm="8">
        <v-sheet min-height="70vh" rounded="lg" color="transparent">
          <v-card
            v-for="(article, index) in articles"
            :key="index"
            :to="{ name: 'blog-slug', params: { slug: article.slug } }"
            class="mb-4"
          >
            <v-img :src="article.cover"></v-img>

            <div class="px-2 pt-2 overline">
              <span class="ml-2 text--secondary">
                约{{ article.readingTime.words }}个字,{{
                  parseInt(article.readingTime.minutes + 1)
                }}分钟内读完
              </span>
            </div>
            <v-card-title class="display-1 font-weight-regular py-0">{{
              article.title
            }}</v-card-title>
            <v-card-text>
              {{ article.description }}
              <nuxt-content :document="{ body: article.excerpt }" />
              <div>{{ fmtDate(article.createdAt) }}</div>
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="4">
        <v-card rounded="lg" min-height="268" class="pa-2">
          <v-chip
            v-for="(tag, index) in tags"
            :key="index"
            class="ma-2 pa-4"
            :color="tag.color"
            outlined
          >
            <v-icon left> mdi-wrench </v-icon>
            {{ tag.name }}
          </v-chip>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const articles = await $content('articles', params.slug)
      .only([
        'title',
        'description',
        'excerpt',
        'img',
        'slug',
        'author',
        'createdAt',
        'updatedAt',
        'cover',
        'readingTime',
      ])
      .sortBy('createdAt', 'desc')
      .fetch()

    return { articles }
  },
  data() {
    return {
      tags: [
        {
          name: '前端架构',
          color: 'blue',
        },
      ],
    }
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
