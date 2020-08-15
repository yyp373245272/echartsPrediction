<template>
  <div class="com-container">
    <div class="com-chart" ref="qtty_ref">
    </div>
  </div>
</template>
<script>
export default {
  props: ['skuData'],
  data () {
    return {
      chartInstance: null,
      allData: []
    }
  },
  mounted () {
    this.initChart()
    setTimeout(() => {
      this.chartInstance.resize()
    }, 10)
    this.updateChart()
  },
  activated () {
  },
  methods: {
    // 初始化
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.qtty_ref, 'dark')
      this.chartInstance.on('click', (arg) => {
        console.log(arg.dataIndex)
      })
      window.addEventListener('resize', () => {
        this.chartInstance.resize()
      })
    },
    updateChart () {
      // const totalData = this.skuData.history.concat(this.skuData.output)
      // console.log(totalData)
      const dateHis = this.skuData.history.map((item) => {
        return item.date
      })
      const datePre = this.skuData.output.map((item) => {
        return item.date
      })
      const qttyHis = this.skuData.history.map((item) => {
        return item.qtty
      })
      const qttyPre = this.skuData.output.map((item) => {
        return item.qtty
      })
      var date = dateHis.concat(datePre)
      var qtty = qttyHis.concat(qttyPre)
      var pointMid = qttyHis.length
      var pointEnd = qtty.length
      const option = {
        title: {
          text: '▐ 销量统计',
          textStyle: {
            fontSize: 30
          },
          left: 20,
          top: 20
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          type: 'value'
        },
        xAxis: {
          type: 'category',
          data: date
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            z: 0
          }
          // formatter: function (params) {
          //   console.log(params[0])
          //   return params
          // }
        },
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [{
            lt: pointMid,
            color: 'green'
          }, {
            gte: pointMid,
            lt: pointEnd,
            color: 'red'
          }]
        },
        series: [
          {
            type: 'line',
            data: qtty,
            barWidth: 10,
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'white'
              }
            },
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: '#5052EE'
                },
                {
                  offset: 1,
                  color: '#AB6EE5'
                }
              ])
            }
          }
        ]
      }
      this.chartInstance.setOption(option)
    }
  }
}
</script>
<style scoped>
div {
  height: 100%;
  width: 100%;
}
</style>