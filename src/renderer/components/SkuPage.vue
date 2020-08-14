<template>
  <div id="sku-page">
      {{ msg }}
  </div>
</template>

<script>
export default {
  mounted () {
    console.log(this.$route.params)
  },
  data () {
    return {
      msg: this.$route.params
    }
  }
}
</script>

<style>

</style>