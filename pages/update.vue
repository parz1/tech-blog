<template>
  <v-container class="">
    <v-row justify="center">
      <v-col cols="12" sm="4">
        <v-sheet min-height="280"></v-sheet>
      </v-col>
      <v-col cols="12" sm="8">
        <div class="display-1 font-weight-black mt-4 mx-4">UPDATES</div>
        <div class="title font-weight-light mx-4 mb-4">
          Update logs of this blog.
        </div>
        <client-only placeholder="Loading...">
          <Timeline :feed="feed" />
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import doc from '~/update.yaml'
export default {
  components: {
    Timeline: process.browser
      ? () => import('~/components/Timeline.vue')
      : null,
  },
  asyncData({ store }) {
    const feed = []
    for (const key in doc) {
      const e = doc[key]
      // e.date = new Date(e.date)
      feed.push(e)
    }
    return {
      feed,
    }
  },
  head() {
    return {
      title: '更新日志',
    }
  },
}
</script>

<style></style>
