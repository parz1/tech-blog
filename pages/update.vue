<template>
  <div class="d-flex justify-center">
    <TimeLine :feed="feed" />
  </div>
</template>

<script>
import doc from '~/update.yaml'
import TimeLine from '~/components/TimeLine'
export default {
  components: {
    TimeLine,
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
