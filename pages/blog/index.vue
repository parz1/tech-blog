<template>
  <div class="d-flex justify-center">
    <v-card max-width="720" flat>
      <v-card-title class="display-1">POSTS</v-card-title>
      <v-card-text>
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
      </v-card-text>
    </v-card>
  </div>
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
