<template>
  <div id="app">
    <lay-out/>
  </div>
</template>

<script>
import PicPage from './components/PicPage'
import LayOut from './components/LayOut'
export default {
  name: 'echart-demo',
  components: {
    picPage: PicPage,
    LayOut: LayOut
  }
}
</script>

<style>
  /* CSS */
</style>
