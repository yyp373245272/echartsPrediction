<template>
    <div id="graph-page">
      <div id="graph-top">
        <div id="total-line" :skuData="skuData"/>
        <total-line :skuData="skuData"/>
        </div>
        <div id="graph-bottom">
          <section id="graph-lr">
          <div id="graph-left"><sole-qtty :skuData="skuData"/></div>
          <div id="graph-right">
            <ware-house :skuData="skuData"/>
          </div>
        </section>
      </div>
    </div>
</template>

<script>
import SoleQtty from './SoleQtty'
import TotalLine from './TotalLine'
import WareHouse from './WareHouse'
export default {
  components: {
    SoleQtty: SoleQtty,
    TotalLine: TotalLine,
    WareHouse: WareHouse
  },
  props: ['skuData'],
  methods: {
  }
}
</script>

<style>
#graph-page {
  height: 100%;
  width: 100%;
}
#graph-top {
  height: 350px;
  margin-bottom: 10px;
}
#graph-bottom {
  height: 400px;
}
#graph-lr {
  height: 100%;
  display: flex;
  color: rgb(11, 240, 250);
}
#graph-left {
  height: 95%;
  flex: 5;
    background: linear-gradient(to left, rgb(11, 240, 250), rgb(11, 240, 250)) left top no-repeat,
              linear-gradient(to bottom, rgb(11, 240, 250), rgb(11, 240, 250)) left top no-repeat,
              linear-gradient(to left, rgb(11, 240, 250), rgb(11, 240, 250)) right top no-repeat, 
              linear-gradient(to bottom, rgb(11, 240, 250), rgb(11, 240, 250)) right top no-repeat,
              linear-gradient(to left, rgb(11, 240, 250), rgb(11, 240, 250)) left bottom no-repeat, 
              linear-gradient(to bottom, rgb(11, 240, 250), rgb(11, 240, 250)) left bottom no-repeat,
              linear-gradient(to left, rgb(11, 240, 250), rgb(11, 240, 250)) right bottom no-repeat,
              linear-gradient(to left, rgb(11, 240, 250), rgb(11, 240, 250)) right bottom no-repeat;
  background-size: 3px 40px, 40px 3px, 3px 40px, 40px 3px;
  padding: 4px;
  margin: 10px;
}
#graph-right {
  height: 95%;
  flex: 5;
  background: linear-gradient(to left, rgb(11, 240, 250), rgb(11, 240, 250)) left top no-repeat,
              linear-gradient(to bottom, rgb(11, 240, 250), rgb(11, 240, 250)) left top no-repeat,
              linear-gradient(to left, rgb(11, 240, 250), rgb(11, 240, 250)) right top no-repeat, 
              linear-gradient(to bottom, rgb(11, 240, 250), rgb(11, 240, 250)) right top no-repeat,
              linear-gradient(to left, rgb(11, 240, 250), rgb(11, 240, 250)) left bottom no-repeat, 
              linear-gradient(to bottom, rgb(11, 240, 250), rgb(11, 240, 250)) left bottom no-repeat,
              linear-gradient(to left, rgb(11, 240, 250), rgb(11, 240, 250)) right bottom no-repeat,
              linear-gradient(to left, rgb(11, 240, 250), rgb(11, 240, 250)) right bottom no-repeat;
  background-size: 3px 40px, 40px 3px, 3px 40px, 40px 3px;
  padding: 4px;
  margin: 10px;
}
#graph-top {
  background: linear-gradient(to left, rgb(11, 240, 250), rgb(11, 240, 250)) left top no-repeat,
              linear-gradient(to bottom, rgb(11, 240, 250), rgb(11, 240, 250)) left top no-repeat,
              linear-gradient(to left, rgb(11, 240, 250), rgb(11, 240, 250)) right top no-repeat, 
              linear-gradient(to bottom, rgb(11, 240, 250), rgb(11, 240, 250)) right top no-repeat,
              linear-gradient(to left, rgb(11, 240, 250), rgb(11, 240, 250)) left bottom no-repeat, 
              linear-gradient(to bottom, rgb(11, 240, 250), rgb(11, 240, 250)) left bottom no-repeat,
              linear-gradient(to left, rgb(11, 240, 250), rgb(11, 240, 250)) right bottom no-repeat,
              linear-gradient(to left, rgb(11, 240, 250), rgb(11, 240, 250)) right bottom no-repeat;
  background-size: 3px 40px, 40px 3px, 3px 40px, 40px 3px;
  padding: 4px;
  margin: 10px;
}
</style>