<template>
  <article>
    <v-container>
      <div>
        <p
          class="display-1 display-sm-2 font-weight-bold mb-0 mt-8 content-title"
        >
          {{ article.title }}
        </p>
        <p class="py-2 body-1">
          <span class="text--secondary">
            {{ fmtDate(article.updatedAt) + '发布' }}
          </span>
          <span class="ml-2 text--secondary">
            约{{ article.readingTime.words }}个字,{{
              parseInt(article.readingTime.minutes + 1)
            }}分钟内读完
          </span>
        </p>
      </div>
      <v-row>
        <v-col cols="12" sm="8" class="pa-0 pa-sm-3">
          <v-sheet
            min-height="85vh"
            class="d-flex flex-column content pa-4 py-sm-8 elevation-2"
          >
            <div class="content-box px-sm-4">
              <nuxt-content :document="article" />
            </div>
            <v-spacer></v-spacer>
            <pagination :prev="prev" :next="next"></pagination>
          </v-sheet>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card>
            <v-card-text>
              <div v-for="link of article.toc" :key="link.id">
                <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
              </div>
            </v-card-text>
          </v-card>
          <v-card tile>
            <v-card-text>
              <div class="text-center">
                <v-avatar size="80">
                  <img src="~/assets/imgs/avatar.jpg" alt="avatar" />
                </v-avatar>
              </div>
              <div class="text-center">parz1</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'desc')
      .surround(params.slug)
      .fetch()

    return { article, prev, next }
  },
  computed: mapState(['ifCustomTitle']),
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapMutations(['setCustomTitle', 'closeCustomTitle']),
    handleScroll() {
      // ...
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (scrollTop >= 130) {
        if (this.ifCustomTitle === false)
          this.setCustomTitle({ title: this.article.title })
      } else if (this.ifCustomTitle === true) this.closeCustomTitle()
    },
    fmtDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      // local i18n
      return new Date(date).toLocaleDateString('zh-tw', options)
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/style/md.scss';
.v-application code {
  background-color: transparent;
  padding: 0;
}
pre code {
  color: #fff !important;
}
p code {
  background-color: #eee !important;
  padding-left: 8px !important;
  padding-right: 8px !important;
}
.icon.icon-link {
  // background: #000;
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: 20px 20px;
}
.icon.icon-link::after {
  content: '#';
}
.content {
  margin: auto;
  &-box {
    margin: 0px;
  }
  .nuxt-content {
    code,
    pre {
      // background-color: transparent;
      text-shadow: none;
      font-weight: 300;
      font-size: 1rem;
      font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    }
    &-highlight {
      // background-color: #f8f8f8;
      .filename {
        position: absolute;
        top: 48px;
        color: #fff;
        right: 8px;
      }
    }
    @include markdown-scss;
  }
}
</style>
