<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-click="false"
      :close-on-content-click="false"
      offset-overflow
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          class="ma-4 float-btn"
          outlined
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-palette</v-icon>
        </v-btn>
      </template>

      <v-card class="float-card">
        <v-list>
          <v-list-item>
            <v-list-item-avatar color="primary">
              <v-icon dark small>mdi-circle-slice-8</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{
                themes[globalTheme].name
              }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ globalTheme }}
                {{
                  themes[globalTheme][globalDarkMode].primary.base ||
                  themes[globalTheme][globalDarkMode].primary
                }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn text @click="switchTheme = !switchTheme">
                {{ switchTheme ? '使用中' : '切换' }}
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-expand-transition>
            <v-responsive v-if="switchTheme">
              <v-list-item
                v-for="(theme, idx) in themes"
                v-show="idx != globalTheme"
                :key="idx"
              >
                <v-list-item-avatar
                  :color="
                    theme[globalDarkMode].primary.base ||
                    theme[globalDarkMode].primary
                  "
                >
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ theme.name }}</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ idx }}
                    {{ theme.light.primary.base || theme.light.primary }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn text @click="setTheme(theme, idx)">切换</v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-responsive>
          </v-expand-transition>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-switch
                v-model="darkMode"
                color="primary"
                @change="turnDarkMode"
              ></v-switch>
            </v-list-item-action>
            <v-list-item-title>黑暗模式</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-switch
                v-model="switchMode"
                color="primary"
                disabled
              ></v-switch>
            </v-list-item-action>
            <v-list-item-title>日落切换</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="menu = false"> 取消 </v-btn>
          <v-btn color="primary" text @click="menu = false"> 保存 </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import themes from '~/assets/themes'
export default {
  data: () => ({
    switchTheme: false,
    menu: false,
    darkMode: false,
    switchMode: false,
  }),
  computed: {
    globalTheme() {
      return this.$store.state.theme
    },
    globalDarkMode() {
      return this.$vuetify.theme.dark ? 'dark' : 'light'
    },
    themes() {
      return themes
    },
  },
  methods: {
    turnDarkMode(mode) {
      this.$vuetify.theme.dark = mode
    },
    setTheme(theme, key) {
      // close menu
      const name = key
      const dark = theme.dark
      const light = theme.light
      // set themes
      Object.keys(dark).forEach((i) => {
        this.$vuetify.theme.themes.dark[i] = dark[i]
      })
      Object.keys(light).forEach((i) => {
        this.$vuetify.theme.themes.light[i] = light[i]
      })
      // also save theme name to disable selection
      this.$vuetify.theme.themes.name = name
      this.$store.commit('setTheme', { name })
    },
  },
}
</script>

<style lang="scss"></style>
