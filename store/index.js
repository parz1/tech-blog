export const state = () => ({
  theme: 'base',
  dark: false,
  ifCustomTitle: false,
  customTitle: '',
})

export const mutations = {
  setDark(state, mode) {
    state.dark = mode
  },
  setTheme(state, { name }) {
    state.theme = name
  },
  setCustomTitle(state, { title }) {
    state.customTitle = title
    state.ifCustomTitle = true
  },
  closeCustomTitle(state) {
    state.ifCustomTitle = false
  },
}
