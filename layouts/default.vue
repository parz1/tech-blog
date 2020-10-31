<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      right
      temporary
      app
      :color="this.$vuetify.theme.dark ? 'grey darken-4' : 'white'"
    >
      <drawer-cnt @close="drawer = false"></drawer-cnt>
    </v-navigation-drawer>
    <v-app-bar fixed app elevate-on-scroll>
      <div v-if="this.$vuetify.breakpoint.smAndUp">
        <v-btn text class="mr-4" :to="{ path: '/' }">
          <v-icon>mdi-home</v-icon>
          <span
            class="text-uppercase title font-weight-light"
            v-text="title"
          ></span>
        </v-btn>
        <v-btn text class="px-2 mx-0" :to="{ path: '/blog' }">
          <v-icon size="20">mdi-post-outline</v-icon>
          BLOG
        </v-btn>
        <v-btn text class="px-2 mx-0" :to="{ path: '/demo' }">
          <v-icon size="20">mdi-play-speed</v-icon>
          DEMO
        </v-btn>
        <v-btn text class="px-2 mx-0" :to="{ path: '/leetcode' }">
          <v-icon size="20">mdi-code-tags</v-icon>
          LEETCODE
        </v-btn>
      </div>
      <div v-else>
        <v-btn icon class="ml-n2" @click="mDrawer = !mDrawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </div>
      <v-spacer />
      <v-btn icon @click="turnTheme">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click="search = !search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn style="z-index: 100" icon @click="drawer = !drawer">
        <v-icon>mdi-apps</v-icon>
      </v-btn>
    </v-app-bar>
    <navi-sider :drawer.sync="mDrawer"></navi-sider>
    <v-main>
      <v-container class="pa-0 viewbox">
        <nuxt />
      </v-container>
    </v-main>
    <v-dialog v-model="search" max-width="720">
      <v-card>
        <v-card-title>搜索</v-card-title>
        <v-card-text>
          <search @change="search = !search"></search>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-footer class="d-flex justify-end">
      <span>&copy; {{ new Date().getFullYear() }}</span>
      <span class="ml-1">parz1</span>
    </v-footer>
  </v-app>
</template>

<script>
import Search from '~/components/Search'
import DrawerCnt from '~/components/DrawerCnt'
import NaviSider from '~/components/NaviSider'
export default {
  provide() {
    return {
      naviList: this.items,
    }
  },
  components: {
    Search,
    DrawerCnt,
    NaviSider,
  },
  data() {
    return {
      themeStat: false,
      drawer: false,
      mDrawer: false,
      search: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      right: true,
      title: 'parz1.blog',
    }
  },
  mounted() {},
  methods: {
    turnTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
  },
}
</script>

<style scoped>
.viewbox {
  max-width: 100vw;
  overflow-x: hidden;
}
</style>
