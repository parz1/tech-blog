<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
import { load } from '~/utils/theWorld'
export default {
  name: 'ThreeDemo',
  data() {
    return {}
  },
  mounted() {
    const tw = load('container', 800, 800)
    tw.update()
    // console.log(tw)
  },
  methods: {},
}
</script>

<style scoped>
#container {
  height: 800px;
  width: 800px;
}
</style>
