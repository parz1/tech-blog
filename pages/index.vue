<template>
  <v-layout class="view" column justify-center align-center>
    <div class="display-4 font-weight-light text-uppercase">
      parz1's tech blog
    </div>
    <div class="headline">Version 0.1.0</div>
    <v-flex v-if="false" xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">
          Three.js 3D DEMO
        </v-card-title>
        <v-card-text
          ><client-only>
            <three-demo></three-demo>
          </client-only>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire">
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {
    ThreeDemo: process.browser
      ? () => import('~/components/Threejsdemo.vue')
      : null,
  },
  head() {
    return {
      title: null,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.view {
  width: 100vw;
  height: 90vh;
}
</style>
