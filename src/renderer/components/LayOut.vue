<template>
    <div id="main-layout" v-loading="loading">
        <div id="head-bar">
            <el-button @click="addFile()" id="add-btn" type="primary" round icon="el-icon-plus"></el-button>
        </div>
        <div id="main-graph">
          <el-tabs tab-position="left" style="height: 100%;">
            <el-tab-pane 
            :key="item.sku"
            v-for="(item,i) in allData.input" 
            :label="item.sku"
            :id="i">
            <pic-page/>
            </el-tab-pane>
          </el-tabs>
        </div>
    </div>
</template>

<script>
import PicPage from './PicPage'
const xlsx = require('node-xlsx')
const {dialog} = require('electron').remote
export default {
  components: {
    PicPage: PicPage
  },
  data () {
    return {
      loading: false,
      file: null,
      allData: {
        input: null,
        output: null
      }
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
      console.log(this.file)
    },
    initData () {
      this.loadInput(this.file.path)
      this.loadOutpu('F:\\github\\EchartsDemo\\output\\output.xlsx')
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
          data: []
        })
      }
      sheet.forEach((row, index) => {
        if (index !== 0) {
          skuData[skuArr.indexOf(row[1])].data.push({
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
      this.allData.input = skuData
      console.log(this.allData.input)
    },
    loadOutpu (file) {
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
          data: []
        })
      }
      sheet.forEach((row, index) => {
        if (index !== 0) {
          skuData[skuArr.indexOf(row[1])].data.push({
            date: this.dateToString(row[0]),
            sku: row[1],
            qtty: row[2]
          })
        }
      })
      this.allData.output = skuData
      console.log(this.allData.output)
    },
    dateToString (num) {
      var date = new Date(1900, 0, num - 1)
      var dateStr = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
      return dateStr.toString()
    }
  }
}
</script>

<style>
#main-layout {
  border: 2px solid;
  min-width: 1024px;
  max-width: 1920px;
  margin: 0 auto;
  background-color: pink;
  padding: 10px;
  height: 100%;
}
#head-bar {
  background-color: aqua;
}
#main-graph {
  height: 100%;
  background-color: green;
}
.el-tabs__item.is-active{
   color: rgb(21, 250, 0);
}

</style>