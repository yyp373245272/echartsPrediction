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
    this.$nextTick(function () {
      this.initChart()
      setTimeout(() => {
        this.updateChart()
        this.chartInstance.resize()
      }, 50)
    })
  },
  updated () {
    this.updateChart()
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
      const date = this.skuData.output.map((item) => {
        return item.date
      })
      const qtty = this.skuData.output.map((item) => {
        return item.qtty
      })
      console.log(date, qtty)
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
            type: 'line',
            z: 0,
            lineStyle: {
              width: 30,
              color: '#2D3443'
            }
          }
        },
        series: [
          {
            type: 'bar',
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