<template>
  <div class="d-flex flex-column justify-start align-stretch fill-height">
    <div class="text-right ma-2">
      <span class="text-uppercase body-1">parz1's tech blog</span>
      <v-btn icon x-large @click="$emit('close')">
        <v-icon>mdi-chevron-right</v-icon>
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
  </div>
</template>

<script>
export default {
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
}
</script>
