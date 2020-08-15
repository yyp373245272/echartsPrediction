<template>
    <div id="main-layout" v-loading="loading">
      <section class="main-two-section">
        <div class=side-bar>
          <div class="btn">
            <el-button @click="addFile()" id="input-btn" type="primary" round icon="el-icon-plus">导入文件</el-button>
          </div>
          <div class="btn">
            <el-button @click="addFile()" id="output-btn" type="primary" round icon="el-icon-plus">导出文件</el-button>
          </div>
          <div class="sku-list" 
          v-for="(item,index) in allData"
          :key="index"
          :class="index==activited?'hover':'sku-item'"
          @click="enterX(index)">
          {{ item.sku }}
          </div>
        </div>
        <div id="main-graph"
        :key="item.sku"
        v-for="(item,index) in allData" >
          <div class="graph-item" v-if="index==activited">
          <pic-page :skuData="allData[activited]"/>
          </div>
        </div>
      </section>
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
      allData: [],
      activited: 0
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
      // console.log(this.file)
    },
    initData () {
      this.loadInput(this.file.path)
      this.loadOutpu('F:\\github\\EchartsDemo\\output\\output.xlsx')
      this.loadHistory('F:\\github\\EchartsDemo\\output\\tmp.xlsx')
      // console.log(this.allData)
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
    enterX (index) {
      // console.log(index)
      this.activited = index
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
  padding: 10px;
  height: 100%;
}
.main-two-section {
  height: 100%;
  width: 100%;
}
.side-bar {
  border-right:2px solid #000;
}
#main-graph {
}
.graph-item {
  width: 100%;
  height: 100%;
}
.sku-list {
  margin: 10px;
  background-color: rgb(32, 32, 32);
  padding-top: 15px;
  height: 60px;
  font-size: 20px;
  color: aliceblue;
  font-weight: normal;
  border-radius: 10px;
}
.hover {
  background-color: rgb(0, 0, 0);
  font-weight: 700;
}
</style>