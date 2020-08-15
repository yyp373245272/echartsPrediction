<template>
  <div id="sku-page">
    <p>{{ sku }}</p>
    <p>{{ data }}</p>
  </div>
</template>

<script>
export default {
  props: ['allData'],
  mounted () {
    this.sku = this.$route.params.id
    this.initOnce()
    this.init(this.sku)
  },
  beforeRouteUpdate (to, from, next) {
    this.sku = this.$route.params.id
    this.init(to.id)
    // console.log(this.allData)
    next()
  },
  data () {
    return {
      sku: null,
      data: null,
      skuArr: []
    }
  },
  methods: {
    initOnce () {
      this.allData.forEach(element => {
        this.skuArr.push(element.sku)
      })
    },
    init (sku) {
      var index = this.skuArr.indexOf(sku)
      // console.log('index = ' + index)
      this.data = this.allData[index]
    }
  }
}
</script>

<style>

</style>