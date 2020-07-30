<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      right
      temporary
      app
      :color="this.$vuetify.theme.dark ? 'grey darken-4' : 'white'"
    >
      dfdfd
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
      elevate-on-scroll
      :color="this.$vuetify.theme.dark ? 'indigo' : 'white'"
    >
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <span
        class="text-uppercase title font-weight-light"
        v-text="title"
      ></span>
      <v-spacer />
      <v-btn icon @click="turnTheme">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer class="d-flex justify-end">
      <span>&copy; {{ new Date().getFullYear() }}</span>
      <span class="ml-1">parz1</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      themeStat: false,
      clipped: false,
      drawer: false,
      fixed: false,
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
      miniVariant: false,
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
  // computed: {
  //   theme() {
  //     return this.$vuetify.theme.dark === this.themeStat
  //   },
  // },
}
</script>
