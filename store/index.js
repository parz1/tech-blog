export const state = () => ({
  theme: 'base',
  dark: false,
})

export const mutations = {
  setDark(state, mode) {
    state.dark = mode
  },
  setTheme(state, { name }) {
    state.theme = name
  },
}
