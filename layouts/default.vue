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
    <v-app-bar fixed app elevate-on-scroll class="py-0">
      <v-container class="py-0 fill-height">
        <div>
          <v-tabs
            class="hidden-sm-and-down fill-height"
            color="grey darken-1"
            background-color="transparent"
            height="60"
            :grow="false"
          >
            <v-tab
              v-for="link in items"
              :key="link.title"
              :to="link.to"
              :grow="false"
            >
              <v-icon class="mr-2">{{ link.icon }}</v-icon>
              <span class="body-1 font-weight-light">{{ link.title }}</span>
            </v-tab>
          </v-tabs>
        </div>
        <div class="hidden-md-and-up">
          <v-btn icon class="ml-n2" @click="mDrawer = !mDrawer">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </div>
        <v-spacer />
        <div class="hidden-sm-and-down">
          <!-- <v-btn icon @click="turnTheme">
            <v-icon>mdi-application</v-icon>
          </v-btn>
          <v-btn icon @click="search = !search">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn style="z-index: 100" icon @click="drawer = !drawer">
            <v-icon>mdi-apps</v-icon>
          </v-btn> -->
          <v-responsive max-width="260">
            <v-text-field
              append-icon="mdi-magnify"
              dense
              rounded
              flat
              hide-details
              solo
              clearable
            ></v-text-field>
          </v-responsive>
        </div>
        <v-btn class="ml-2" icon color="primary" @click="drawer = !drawer">
          <v-icon>mdi-apps</v-icon>
        </v-btn>
      </v-container>
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
import { mapState } from 'vuex'
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
      searchWidth: 64,
      items: [
        {
          icon: 'mdi-home',
          title: '首页',
          to: '/',
        },
        {
          icon: 'mdi-post-outline',
          title: '博客',
          to: '/blog',
        },
        {
          icon: 'mdi-play-speed',
          title: '样例',
          to: '/demo',
        },
        {
          icon: 'mdi-code-tags',
          title: '算法',
          to: '/leetcode',
        },
      ],
      right: true,
      title: 'parz1.blog',
    }
  },
  computed: {
    ...mapState({
      theme: (state) => state.theme,
    }),
  },
  mounted() {},
}
</script>

<style scoped>
.viewbox {
  max-width: 100vw;
  overflow-x: hidden;
}
</style>
