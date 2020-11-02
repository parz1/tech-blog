<template>
  <div class="d-flex flex-column justify-start fill-height">
    <div class="d-flex justify-space-between align-center">
      <theme-picker></theme-picker>
      <v-btn icon class="ma-4" @click="$emit('close')">
        <v-icon large>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
    <div class="d-flex flex-column align-center mt-4">
      <v-avatar size="80">
        <img src="~/assets/imgs/avatar.jpg" alt="avatar" />
      </v-avatar>
      <span class="headline font-weight-light mt-1">parz1</span>
      <span class="body-2 text--secondary mt-1">生活所迫 || 兴趣使然</span>
      <v-btn outlined class="mt-2"
        >关于我
        <v-icon right>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
    <v-spacer></v-spacer>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import ThemePicker from './ThemePicker'
export default {
  components: {
    ThemePicker,
  },
  data() {
    return {
      forums: [
        {
          name: 'Goder',
          mdicon: 'alpha-g',
        },
        {
          name: '游戏博客',
          mdicon: 'nintendo-game-boy',
        },
      ],
    }
  },
  methods: {
    ...mapMutations(['changeTheme']),
    turnTheme() {
      this.$vuetify.theme.themes.name = 'dark'
    },
  },
}
</script>
