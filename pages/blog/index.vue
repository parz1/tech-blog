<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="2">
        <v-sheet rounded="lg" min-height="268">
          <!--  -->
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="8">
        <v-sheet min-height="70vh" rounded="lg">
          <v-card
            v-for="(article, index) in articles"
            :key="index"
            :to="{ name: 'blog-slug', params: { slug: article.slug } }"
            class="my-4"
          >
            <v-card-title>{{ article.title }}</v-card-title>
            <v-card-text>
              {{ article.description }}
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="2">
        <v-sheet rounded="lg" min-height="268">
          <!--  -->
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const articles = await $content('articles', params.slug)
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'asc')
      .fetch()

    return { articles }
  },
}
</script>
