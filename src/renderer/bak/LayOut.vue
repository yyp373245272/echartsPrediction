<template>
  <section class="layer">
    <div class="side-bar">
      <div>
        <el-button type="primary" round @click="addFile()">导入</el-button>
      </div>
      <div>
        <el-button type="primary" round>导出</el-button>
      </div>
      <div class="menu">
        <div class="menu-item" 
        v-for="(item,index) in allData"
        :key="item.sku"
        :id="index">
          <router-link :to="'/page/'+item.sku + '' ">
          {{ item.sku }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="main-page">
      <router-view :allData="allData"/>
    </div>
  </section>
</template>
<script>
const xlsx = require('node-xlsx')
const {dialog} = require('electron').remote
export default {
  data () {
    return {
      loading: false,
      file: null,
      allData: [],
      activeIndex: '1'
    }
  },
  methods: {
    addFile () {
      this.windowChoose()
      this.loading = true
      setTimeout(() => {
        this.initData()
        this.loading = false
      }, 1000)
      this.$router.push({
        name: ''
      })
    },
    // 弹出文件选择窗口，返回文件绝对路径
    windowChoose () {
      let filePath = dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
          { name: 'Custom File Type', extensions: ['xls', 'xlsx', 'txt'] }
        ]
      })
      if (filePath !== null) {
        var fileName = filePath[0].split('\\').slice(-1)
        this.file = {
          name: fileName[0],
          path: filePath[0]
        }
      }
    },
    initData () {
      this.loadInput(this.file.path)
      this.loadOutpu('F:\\github\\EchartsDemo\\output\\output.xlsx')
      this.loadHistory('F:\\github\\EchartsDemo\\output\\tmp.xlsx')
      console.log(this.allData)
    },
    loadInput (file) {
      // 读取表格
      const sheet = xlsx.parse(file)[0].data
      // 获取sku
      var sku = new Set()
      sheet.forEach((row, index) => {
        if (index !== 0) {
          sku.add(row[1])
        }
      })
      // 添加数据到
      let skuData = []
      let skuArr = []
      for (const item of sku) {
        skuArr.push(item)
        skuData.push({
          sku: item,
          input: [],
          output: [],
          history: []
        })
      }
      sheet.forEach((row, index) => {
        if (index !== 0) {
          skuData[skuArr.indexOf(row[1])].input.push({
            date: this.dateToString(row[0]),
            sku: row[1],
            sku_off: row[2],
            cop: row[3],
            full_budget: row[4],
            gift: row[5],
            qtty: Math.ceil(Math.random() * 10) * 20
          })
        }
      })
      this.allData = skuData
    },
    loadOutpu (file) {
      // 读取表格
      const sheet = xlsx.parse(file)[0].data
      // 获取sku
      const skuArr = this.allData.map((item) => {
        return item.sku
      })
      sheet.forEach((row, index) => {
        if (index !== 0) {
          this.allData[skuArr.indexOf(row[1])].output.push({
            date: this.dateToString(row[0]),
            sku: row[1],
            qtty: row[2]
          })
        }
      })
    },
    loadHistory (file) {
      // 读取表格
      const sheet = xlsx.parse(file)[0].data
      // 获取sku
      const skuArr = this.allData.map((item) => {
        return item.sku
      })
      sheet.forEach((row, index) => {
        if (index !== 0) {
          this.allData[skuArr.indexOf(row[1])].history.push({
            date: this.dateToString(row[0]),
            sku: row[1],
            qtty: row[2]
          })
        }
      })
    },
    dateToString (num) {
      var date = new Date(1900, 0, num - 1)
      var dateStr = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
      return dateStr.toString()
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style>
.layer {
  width: 100%;
  height: 100%;
  display: flex;
}
.side-bar {
  width: 100%;
  height: 100%;
  flex: 2;
}
.main-page {
  width: 100%;
  height: 100%;
  background-color: pink;
  flex: 8;
}
</style>