<template>
  <div>
    <v-navigation-drawer v-model="mDrawer" absolute left temporary>
      <v-list nav>
        <v-list-item-group
          v-model="value"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
            v-for="(navi, idx) in naviList"
            :key="`navi-${idx}`"
            :to="{ path: navi.to }"
          >
            <v-list-item-title>{{ navi.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  inject: ['naviList'],
  props: {
    drawer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: null,
    }
  },
  computed: {
    mDrawer: {
      get() {
        return this.drawer
      },
      set(val) {
        this.$emit('update:drawer', val)
      },
    },
  },
}
</script>

<style></style>
