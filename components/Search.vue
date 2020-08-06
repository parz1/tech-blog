<template>
  <div>
    <v-text-field
      v-model="query"
      label="搜索文章"
      append-icon="mdi-magnify"
    ></v-text-field>
    <v-list>
      <v-list-item
        v-for="(article, index) in articles"
        :key="index"
        three-line
        link
        :to="{ name: 'blog-slug', params: { slug: article.slug } }"
      >
        <v-list-item-content>
          <v-list-item-title>{{ article.title }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ article.description }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            {{ fmtDate(article.createdAt) }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      articles: [],
    }
  },
  watch: {
    async query(val) {
      if (!val) {
        this.articles = []
        return
      }
      this.articles = await this.$content('articles')
        .limit(5)
        .search(val)
        .fetch()
    },
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

<style></style>
