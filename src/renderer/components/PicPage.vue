<template>
    <div id="graph-page">
      <div id="graph-top">
        <total-line :skuData="skuData"/>
        <!-- <button @click="debug()">here</button> -->
        </div>
        <div id="graph-bottom">
          <section id="graph-lr">
          <div id="graph-left"><sole-qtty :skuData="skuData"/></div>
          <div id="graph-right"></div>
        </section>
      </div>
    </div>
</template>

<script>
import SoleQtty from './SoleQtty'
import TotalLine from './TotalLine'
export default {
  components: {
    SoleQtty: SoleQtty,
    TotalLine: TotalLine
  },
  props: ['skuData'],
  mounted () {
  },
  methods: {
    debug () {
      console.log(this.skuData)
    }
  }
}
</script>

<style>
#graph-page {
  height: 100%;
  width: 100%;
}
#graph-top {
  height: 260px;
}
#graph-bottom {
  height: 400px;
}
#graph-lr {
  height: 100%;
  display: flex;
}
#graph-left {
  height: 95%;
  flex: 5;
    background: linear-gradient(to left, #196aa8, #196aa8) left top no-repeat,
              linear-gradient(to bottom, #196aa8, #196aa8) left top no-repeat,
              linear-gradient(to left, #196aa8, #196aa8) right top no-repeat, 
              linear-gradient(to bottom, #196aa8, #196aa8) right top no-repeat,
              linear-gradient(to left, #196aa8, #196aa8) left bottom no-repeat, 
              linear-gradient(to bottom, #196aa8, #196aa8) left bottom no-repeat,
              linear-gradient(to left, #196aa8, #196AA8) right bottom no-repeat,
              linear-gradient(to left, #196aa8, #196aa8) right bottom no-repeat;
  background-size: 3px 40px, 40px 3px, 3px 40px, 40px 3px;
  padding: 4px;
  margin: 10px;
}
#graph-right {
  height: 95%;
  flex: 5;
    background: linear-gradient(to left, #196aa8, #196aa8) left top no-repeat,
              linear-gradient(to bottom, #196aa8, #196aa8) left top no-repeat,
              linear-gradient(to left, #196aa8, #196aa8) right top no-repeat, 
              linear-gradient(to bottom, #196aa8, #196aa8) right top no-repeat,
              linear-gradient(to left, #196aa8, #196aa8) left bottom no-repeat, 
              linear-gradient(to bottom, #196aa8, #196aa8) left bottom no-repeat,
              linear-gradient(to left, #196aa8, #196AA8) right bottom no-repeat,
              linear-gradient(to left, #196aa8, #196aa8) right bottom no-repeat;
  background-size: 3px 40px, 40px 3px, 3px 40px, 40px 3px;
  padding: 4px;
  margin: 10px;
}
#graph-top {
  background: linear-gradient(to left, #196aa8, #196aa8) left top no-repeat,
              linear-gradient(to bottom, #196aa8, #196aa8) left top no-repeat,
              linear-gradient(to left, #196aa8, #196aa8) right top no-repeat, 
              linear-gradient(to bottom, #196aa8, #196aa8) right top no-repeat,
              linear-gradient(to left, #196aa8, #196aa8) left bottom no-repeat, 
              linear-gradient(to bottom, #196aa8, #196aa8) left bottom no-repeat,
              linear-gradient(to left, #196aa8, #196AA8) right bottom no-repeat,
              linear-gradient(to left, #196aa8, #196aa8) right bottom no-repeat;
  background-size: 3px 40px, 40px 3px, 3px 40px, 40px 3px;
  padding: 4px;
  margin: 10px;
}
</style>