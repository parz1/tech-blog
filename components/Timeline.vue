<style lang="scss" scoped>
.wrapper {
  background: transparent;
}
.timeline {
  background-color: transparent;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 64px;
    left: 40px;
    height: 100%;
    width: 2px;
    background-color: #90a4ae;
  }
  &:nth-last-child(1)::after {
    display: none;
  }
  &-title {
    cursor: pointer;
    background-color: transparent;
  }
  .ctx {
    &-list {
      padding-left: 16px;
      &::before {
        content: '-';
        position: absolute;
        left: 16px;
      }
    }
  }
}
</style>

<template>
  <v-item-group mandatory>
    <v-item v-for="(version, idx) in feed" :key="idx">
      <template v-slot="{ active, toggle }">
        <v-sheet class="px-4 pb-4 pt-2 d-flex timeline" tile max-width="960px">
          <div>
            <v-avatar color="blue">
              <v-icon dark>{{ 'mdi-' + icon[version.tag[0]] }}</v-icon>
            </v-avatar>
          </div>
          <div>
            <v-card
              flat
              :ripple="false"
              class="pl-2 mx-2 timeline-title"
              @click.native="toggle"
            >
              <div>
                <span class="headline font-weight-bold primary--text">{{
                  `${version.desc}`
                }}</span>
              </div>
              <span class="body-1 font-weight-black">{{
                `ver${version.ver}`
              }}</span>
              <span class="body-1 font-weight-light">
                {{ version.vername }}
                <v-icon v-if="active" small>mdi-chevron-up</v-icon>
                <v-icon v-else small>mdi-chevron-down</v-icon>
              </span>

              <div class="mb-2">
                <v-chip
                  v-for="tag in version.tag"
                  :key="tag"
                  :color="color[tag]"
                  label
                  x-small
                  class="mr-4 text-uppercase overline"
                  >{{ tag }}</v-chip
                >
              </div>
            </v-card>

            <v-expand-transition>
              <v-responsive v-if="active">
                <div class="ctx px-4">
                  <!-- <v-list-item-title>{{ version.ctx }}</v-list-item-title> -->
                  <div
                    v-for="ctx in version.ctx"
                    :key="ctx"
                    class="ctx-list body-2"
                  >
                    {{ ctx }}
                  </div>
                </div>
                <span class="text--disabled px-4">
                  {{ version.date }}
                </span>
              </v-responsive>
            </v-expand-transition>
          </div>
        </v-sheet>
      </template>
    </v-item>
  </v-item-group>
</template>

<script>
export default {
  name: 'TimeLine',
  props: {
    feed: {
      type: Array,
      require: true,
      default: () => {
        return [
          {
            ver: '',
            desc: '',
            ctx: [],
            tag: [],
            link: [],
            date: new Date(),
          },
        ]
      },
    },
  },
  data() {
    return {
      color: {
        content: 'primary',
        setup: 'accent',
        enhancement: 'success',
      },
      icon: {
        content: 'draw',
        setup: 'apps',
        enhancement: 'update',
      },
    }
  },
  methods: {
    fmtDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      // local i18n
      return new Date(date).toLocaleDateString('zh-tw', options)
    },
  },
}
</script>
