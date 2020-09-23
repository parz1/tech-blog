<template>
  <v-sheet class="overflow-y-auto" max-height="600" tile>
    <v-item-group mandatory>
      <v-item v-for="(version, idx) in feed" :key="idx">
        <template v-slot="{ active, toggle }">
          <v-sheet class="pa-4 d-flex timeline" tile max-width="960px">
            <div>
              <v-avatar color="blue">
                <v-icon dark>{{ 'mdi-' + icon[version.tag[0]] }}</v-icon>
              </v-avatar>
            </div>
            <div>
              <v-card
                flat
                :ripple="false"
                class="px-2 pb-2 mx-2 timeline-title"
                @click="toggle"
              >
                <span class="headline font-weight-black">{{
                  version.ver
                }}</span>
                <span class="title font-weight-light ml-2">{{
                  version.desc
                }}</span>
                <v-icon v-if="active">mdi-chevron-up</v-icon>
                <v-icon v-else>mdi-chevron-down</v-icon>
                <div class="mb-2">
                  <v-chip
                    v-for="tag in version.tag"
                    :key="tag"
                    :color="color[tag]"
                    label
                    small
                    class="mr-4 text-uppercase body-2"
                    >{{ tag }}</v-chip
                  >
                </div>
              </v-card>

              <v-expand-transition>
                <v-responsive v-if="active">
                  <div class="ctx px-4">
                    <!-- <v-list-item-title>{{ version.ctx }}</v-list-item-title> -->
                    <div v-for="ctx in version.ctx" :key="ctx" class="ctx-list">
                      {{ ctx }}
                    </div>
                  </div>
                </v-responsive>
              </v-expand-transition>
            </div>
          </v-sheet>
        </template>
      </v-item>
    </v-item-group>
  </v-sheet>
</template>

<script>
export default {
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
        build: 'success',
      },
      icon: {
        content: 'draw',
        build: 'apps',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.timeline {
  overflow: hidden;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 72px;
    left: 40px;
    height: 100%;
    width: 2px;
    background-color: #90a4ae;
  }
  &:nth-last-child(1)::after {
    display: none;
  }
  &-title {
    border-radius: 25px;
  }
  .ctx {
    &-list::before {
      content: '-';
      margin-right: 4px;
    }
  }
}
</style>
