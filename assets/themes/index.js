import colors from 'vuetify/lib/util/colors'

export default {
  base: {
    name: '琉璃',
    dark: {
      primary: colors.blue,
      accent: colors.grey.darken3,
      secondary: colors.amber.darken3,
      info: colors.teal.lighten1,
      warning: colors.amber.base,
      error: colors.deepOrange.accent4,
      success: colors.green.accent3,
    },
    light: {
      primary: {
        base: colors.blue.darken2,
        darken1: colors.purple.darken2,
      },
      secondary: colors.grey.darken1,
      accent: colors.shades.black,
      error: colors.red.accent3,
    },
  },
  Theme2: {
    name: '鹅黄',
    dark: {
      primary: '#21CFF3',
      accent: '#FF4081',
      secondary: '#21dc79',
      success: '#86af3f',
      info: '#f34fc6',
      warning: '#FB8C00',
      error: '#FF5252',
    },
    light: {
      primary: '#22daff',
      accent: '#ff6b99',
      secondary: '#26ff8c',
      success: '#a5d64c',
      info: '#ff53d0',
      warning: '#ff8e00',
      error: '#ff5252',
    },
  },
  Theme3: {
    name: '淡绿',
    dark: {
      primary: '#E65100',
      accent: '#7CB342',
      secondary: '#689F38',
      success: '#4CAF50',
      info: '#6156d8',
      warning: '#1565C0',
      error: '#FF7043',
    },
    light: {
      primary: '#ffa450',
      accent: '#a1e754',
      secondary: '#92de4e',
      success: '#6dff74',
      info: '#7365ff',
      warning: '#2e8ac0',
      error: '#ff5e3c',
    },
  },
}
