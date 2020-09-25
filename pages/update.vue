<template>
  <v-row justify="center">
    <v-col xl="6" md="6" xs="12">
      <v-layout column justify-center align-start>
        <div class="display-3 font-weight-black mt-4 mx-4">UPDATES</div>
        <div class="title font-weight-light mx-4">
          Update logs of this blog.
        </div>
        <client-only placeholder="Loading...">
          <Timeline :feed="feed" />
        </client-only>
      </v-layout>
    </v-col>
  </v-row>
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
      e.date = new Date(e.date)
      feed.push(e)
    }
    return {
      feed,
    }
  },
}
</script>

<style></style>
