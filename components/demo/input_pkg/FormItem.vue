<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <p v-if="errMsg">{{ errMsg }}</p>
  </div>
</template>

<script>
import Schema from 'async-validator'
export default {
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: '',
    },
    prop: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      errMsg: '',
    }
  },
  mounted() {
    this.$on('validate', () => {
      this.validate()
    })
  },
  methods: {
    validate() {
      const value = this.form.model[this.prop]
      const rules = this.form.rules[this.prop]
      const desc = { [this.prop]: rules }
      const schema = new Schema(desc)
      return schema.validate({ [this.prop]: value }, (errs) => {
        if (errs) {
          this.errMsg = errs[0].message
        } else this.errMsg = 0
      })
    },
  },
}
</script>

<style></style>
