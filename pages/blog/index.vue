<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3">
        <v-sheet rounded="lg" min-height="268">
          <!--  -->
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="6">
        <v-sheet min-height="70vh" rounded="lg" color="transparent">
          <v-card
            v-for="(article, index) in articles"
            :key="index"
            :to="{ name: 'blog-slug', params: { slug: article.slug } }"
            class="my-4"
          >
            <v-img :src="article.cover"></v-img>
            <v-card-title class="display-1 font-weight-regular">{{
              article.title
            }}</v-card-title>
            <v-card-text>
              {{ article.description }}
              <!-- {{ article }} -->
              <div>{{ article.createdAt }}</div>
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="3">
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
      .only([
        'title',
        'description',
        'img',
        'slug',
        'author',
        'createdAt',
        'updatedAt',
        'cover',
      ])
      .sortBy('createdAt', 'desc')
      .fetch()

    return { articles }
  },
}
</script>
