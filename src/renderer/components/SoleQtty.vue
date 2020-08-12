<template>
  <div class="com-container">
    <div class="com-chart" ref="qtty_ref">
    </div>
  </div>
</template>
<script>
const xlsx = require('node-xlsx')
export default {
  props: ['fileName'],
  data () {
    return {
      chartInstance: null,
      allData: []
    }
  },
  mounted () {
    this.initChart()
    this.getData()
  },
  methods: {
    // 初始化
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.qtty_ref, 'dark')
      this.chartInstance.on('click', (arg) => {
        console.log(arg.dataIndex)
      })
    },
    getData () {
      // 获得表一数据
      const sheet1 = xlsx.parse(this.fileName)[0].data
      sheet1.forEach((row, index) => {
        if (index !== 0) {
          this.allData.push({
            date: this.numToDate(row[0]),
            sku: row[1],
            sku_offer_amt: row[2],
            couopn_val: row[3],
            full_minus_amt: row[4],
            is_gift_promt: row[5],
            qtty: Math.ceil(Math.random() * 10) * 60
          })
        }
      })
      console.log(this.allData)
      this.updateChart()
    },
    updateChart () {
      const date = this.allData.map((item) => {
        return item.date
      })
      const qtty = this.allData.map((item) => {
        return item.qtty
      })
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
        xAxis: {
          type: 'value'
        },
        yAxis: {
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
            barWidth: 30,
            label: {
              show: true,
              position: 'right',
              textStyle: {
                color: 'white'
              }
            },
            itemStyle: {
              barBorderRadius: [0, 15, 15, 0],
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
    },
    numToDate (num) {
      var date = new Date(1900, 0, num)
      var dateStr = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
      return dateStr.toString()
    }
  }
}
</script>