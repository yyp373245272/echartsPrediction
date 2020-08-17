<template>
  <div class="main-warehouse">
    <div class="com-warehouse" ref="warehouse_ref">
    </div>
    <div class="com-input">
    </div>
  </div>
</template>
<script>
export default {
  props: ['skuData'],
  data () {
    return {
      chartInstance: null,
      allData: [],
      repo: ['北京', '上海', '广州', '成都', '武汉', '沈阳', '西安', '德州'],
      percent: [0.16, 0.2, 0.24, 0.08, 0.12, 0.04, 0.04, 0.12],
      total: 0
    }
  },
  mounted () {
    this.initChart()
    setTimeout(() => {
      this.chartInstance.resize()
    }, 10)
    this.updateChart()
    window.addEventListener('resize', () => {
      this.chartInstance.resize()
    })
  },
  activated () {
  },
  methods: {
    // 初始化
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.warehouse_ref, 'dark')
    },
    updateChart () {
      console.log('init warehouse')
      // const totalData = this.skuData.history.concat(this.skuData.output)
      // console.log(totalData)
      var data = []
      this.total = 0
      if (this.skuData !== undefined) {
        let prediction = this.skuData.output.map((item) => {
          return item.qtty
        })
        prediction.forEach(element => {
          this.total += element
        })
        this.percent.forEach(element => {
          data.push(Math.round(element * this.total))
        })
      }
      const option = {
        title: {
          text: '▐ 库存分配',
          textStyle: {
            fontSize: 30,
            color: 'rgb(11, 240, 250)'
          },
          left: 20,
          top: 10
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          name: '数目',
          type: 'value',
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
          data: this.repo,
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
            type: 'bar',
            data: data,
            barWidth: 30,
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'white'
              }
            },
            itemStyle: {
              color: 'rgb(11, 240, 250)'
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