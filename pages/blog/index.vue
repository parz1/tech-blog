<template>
  <div class="d-flex justify-center">
    <v-card max-width="720">
      <v-card-title>BLOG POSTS</v-card-title>
      <v-card-text>
        <v-card v-for="(article, index) in articles" :key="index">
          <nuxt-link
            :to="{ name: 'blog-slug', params: { slug: article.slug } }"
          >
            <div>
              <h2>{{ article.title }}</h2>
            </div>
          </nuxt-link>
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
