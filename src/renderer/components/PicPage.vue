<template>
    <div id="graph-page">
      <div id="graph-top"></div>
        <div id="graph-bottom">
          <section id="graph-lr">
          <div id="graph-left"></div>
          <div id="graph-right"></div>
        </section>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
#graph-page {
  height: 100%;
  width: 100%;
}
#graph-top {
  height: 480px;
  background-color: rgb(215, 255, 151);
  margin-bottom: 12px;
}
#graph-bottom {
  height: 480px;
  background-color: rgb(157, 255, 0);
}
#graph-lr {
  height: 100%;
  display: flex;
  background-color: rgb(255, 0, 0);
}
#graph-left {
  height: 100%;
  background-color: rgb(255, 0, 234);
  flex: 5;
}
#graph-right {
  height: 100%;
  background-color: rgb(255, 142, 246);
  flex: 5;
}
</style>