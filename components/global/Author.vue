<template>
  <div>
    <div>
      <h4>Author</h4>
      <p>{{ author.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    author: {
      type: Object,
      require: true,
      default: () => {
        return {
          name: 'parz1',
          email: 'parz1zhou@gmail.com',
          github: 'https://github.com/parz1',
        }
      },
    },
  },
}
</script>
