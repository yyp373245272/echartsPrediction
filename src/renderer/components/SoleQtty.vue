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
      var date = []
      var optData = []
      var qtty = []
      var threshold = 0
      console.log(threshold)
      if (this.skuData !== undefined) {
        date = this.skuData.output.map((item) => {
          return item.date
        })
        qtty = this.skuData.output.map((item) => {
          return item.qtty
        })
        var tmp = Math.floor(qtty.min / 100) * 100 - 150
        threshold = tmp > 0 ? tmp : 0
        optData = this.skuData.opt.map((item) => {
          return {
            value: item.qtty,
            date: item.date,
            sku_off_origin: item.sku_off_origin,
            sku_off_opt: item.sku_off_opt,
            coupon_origin: item.coupon_origin,
            coupon_opt: item.coupon_opt
          }
        })
      }
      // console.log(optData)
      // console.log(date, qtty)
      console.log(threshold)
      const option = {
        title: {
          text: '▐ 未来14天预测销量',
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
          data: ['预测销量', '优化后销量']
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
          min: threshold,
          axisTick: {
            inside: true
          },
          splitLine: {
            show: true,
            type: 'dashed'
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
            type: 'line',
            z: 0
          },
          formatter: function (params) {
            console.log(params)
            return '日期：' + params[1].data.date + '<br>预测销量：' + params[0].data + '<br>' + '优化后销量：' + params[1].data.value + '<br>' + '直降' + params[1].data.sku_off_origin + '->' + params[1].data.sku_off_opt + '<br>' + '优惠券' + params[1].data.coupon_origin + '->' + params[1].data.coupon_opt
          }
        },
        series: [
          {
            name: '预测销量',
            type: 'bar',
            data: qtty,
            barWidth: 10,
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: 'rgb(11, 240, 250)'
              }
            },
            itemStyle: {
              color: 'rgb(11, 240, 250)'
            }
          },
          {
            name: '优化后销量',
            type: 'bar',
            data: optData,
            barWidth: 10,
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: 'rgba(120, 11, 240, 250)'
              }
            },
            itemStyle: {
              color: 'rgba(11, 240, 250, 0.3)'
            }
          }
        ]
      }
      this.chartInstance.setOption(option)
    }
  }
}
</script>