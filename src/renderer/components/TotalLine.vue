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
  methods: {
    // 初始化
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.qtty_ref, 'dark')
      window.addEventListener('resize', () => {
        this.chartInstance.resize()
      })
    },
    updateChart () {
      // const totalData = this.skuData.history.concat(this.skuData.output)
      // console.log(totalData)
      var date = []
      var qtty = []
      var dateHis = []
      var datePre = []
      var qttyPre = []
      var qttyHis = []
      if (this.skuData !== undefined) {
        dateHis = this.skuData.history.map((item) => {
          return item.date
        })
        datePre = this.skuData.output.map((item) => {
          return item.date
        })
        qttyHis = this.skuData.history.map((item) => {
          return item.qtty
        })
        qttyPre = this.skuData.output.map((item) => {
          return item.qtty
        })
        for (var i = 0; i < qttyHis.length; i++) {
          qtty.push('-')
        }
        date = dateHis.concat(datePre)
        qtty = qtty.concat(qttyPre)
        qtty[qttyHis.length - 1] = qttyHis[qttyHis.length - 1]
      }
      // var pointEnd = qtty.length
      // var pointMid = qttyHis.length
      const option = {
        title: {
          text: '▐ 销量统计',
          textStyle: {
            fontSize: 30,
            color: 'rgb(11, 240, 250)'
          },
          left: 20,
          top: 10
        },
        legend: {
          show: true,
          orient: 'vertical',
          right: '10%',
          data: ['历史销量', '预测销量']
        },
        grid: {
          top: '30%',
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          type: 'value',
          name: '销量',
          nameLocation: 'end',
          nameTextStyle: {
            lineHeight: 0
          },
          axisTick: {
            inside: true
          }
        },
        xAxis: {
          type: 'category',
          data: date,
          axisTick: {
            inside: true
          }
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
        series: [
          {
            name: '历史销量',
            type: 'line',
            data: qttyHis,
            symbol: 'triangle',
            symbolSize: 10,
            barWidth: 10,
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: 'white'
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(11, 240, 250)',
                lineStyle: {
                  type: 'dashed',
                  color: 'rgb(11, 240, 250)'
                }
              },
              color: 'rgb(11, 240, 250)'
            }
          },
          {
            name: '预测销量',
            type: 'line',
            data: qtty,
            symbolSize: 10,
            barWidth: 10,
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: 'white'
              }
            },
            itemStyle: {
              color: 'rgb(11, 240, 250)',
              type: 'dashed'
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