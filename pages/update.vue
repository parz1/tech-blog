<template>
  <div class="d-flex justify-center">
    <TimeLine :feed="feed" />
  </div>
</template>

<script>
import doc from '~/update.yaml'
export default {
  components: {
    TimeLine: process.browser
      ? () => import('~/components/TimeLine.vue')
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
