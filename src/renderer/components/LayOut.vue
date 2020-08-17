<template>
  <div id="main-layout" v-loading="loading">
    <section class="main-two-section">
      <div class=side-bar>
        <div class="function-btn">
          <div class="btn">
            <el-button @click="addFile()" id="input-btn" type="primary" round icon="el-icon-plus">导入文件</el-button>
          </div>
          <div class="btn">
            <el-button @click="addFile()" class="output-btn" type="primary" round icon="el-icon-download">导出文件</el-button>
          </div>
        </div>
        <div class="sub-title">
          SKU列表
        </div>
        <div class="sku-list" 
        v-for="(item,index) in allData"
        :key="index"
        :class="index==activited?'sku-item ' + 'hover-item':'sku-item'"
        @click="enterX(index)"
        >
        {{ item.input[0].name }}<br>{{ item.sku }}
        <!--  + ':' +  -->
        </div>
      </div>
      <div 
      id="default-main"
      v-if="home"
      >
        <pic-page/>
      </div>
      <div id="main-graph"
      :key="item.sku"
      v-for="(item,index) in allData"
      :class="index==activited?'graph-item activity-graph':'graph-item'">
        <div 
          v-if="index==activited">
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
      activited: 0,
      activecolor: null,
      home: true
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
        this.home = false
      }
      // console.log(this.file)
    },
    initData () {
      this.loadInput(this.file.path)
      this.loadOutput('./output/销量预测output.xlsx')
      this.loadHistory('./output/历史销量tmp.xlsx')
      this.loadTarget('./output/销量目标input.xlsx')
      this.loadOpt('./output/优化方案明细output.xlsx')
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
          history: [],
          target: null,
          opt: []
        })
      }
      sheet.forEach((row, index) => {
        if (index !== 0) {
          skuData[skuArr.indexOf(row[1])].input.push({
            date: this.dateToString(row[0]),
            sku: row[1],
            name: row[2],
            sku_off: row[3],
            cop: row[4],
            full_budget: row[5],
            gift: row[6]
          })
        }
      })
      this.allData = skuData
    },
    loadOutput (file) {
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
            qtty: row[2],
            name: row[3]
          })
        }
      })
    },
    loadOpt (file) {
      // 读取表格
      const sheet = xlsx.parse(file)[0].data
      // 获取sku
      const skuArr = this.allData.map((item) => {
        return item.sku
      })
      sheet.forEach((row, index) => {
        if (index !== 0) {
          console.log()
          this.allData[skuArr.indexOf(row[1])].opt.push({
            date: this.dateToString(row[0]),
            sku: row[1],
            sku_off_origin: row[2],
            coupon_origin: row[3],
            sku_off_opt: row[4],
            coupon_opt: row[5],
            qtty: row[6]
          })
        }
      })
    },
    loadTarget (file) {
      const sheet = xlsx.parse(file)[0].data
      // 获取sku
      const skuArr = this.allData.map((item) => {
        return item.sku
      })
      sheet.forEach((row, index) => {
        if (index !== 0) {
          this.allData[skuArr.indexOf(row[0])].target = row[1]
        }
      })
    },
    dateToString (num) {
      if (typeof (num) !== 'string') {
        var date = new Date(1900, 0, num - 1)
        var dateStr = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
        return dateStr.toString()
      } else {
        return num
      }
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
  min-width: 1024px;
  max-width: 1920px;
  margin: 0 auto;
  height: 100%;
}
.main-two-section {
  display: flex;
  height: 100%;
  width: 100%;
}
.side-bar {
  width: 300px;
  border-right:2px solid white;
}
.graph-item {
  flex: 0;
}
.activity-graph {
  flex: 1;
}
.sku-list {
  height: 60px;
  font-size: 15px;
  color: aliceblue;
  font-weight: 300;
  cursor: pointer;
  padding-left: 35px;
  padding-top: 10px;
  font-family:'Microsoft YaHei';
}
.hover-item {
  background-color: rgb(0, 0, 0);
  font-weight: 500;
}
.sku-item:hover {
  background-color: rgb(31, 31, 31);
}
#default-main {
  flex: 1;
}
.btn {
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 20px;
}
.function-btn {
  border-bottom: 2px solid white;
}
.sub-title {
  height: 70px;
  font-size: 24px;
  padding-top: 20px;
  padding-left: 30px;
  border-bottom: 1px solid rgb(184, 184, 184);
  color: rgb(255, 255, 255);
  font-weight: 500;
  font-family:'Microsoft YaHei' !important;
}
.el-button {
  font-size: 20px !important;
  background-color: rgb(22, 22, 22) !important;
  border-color: rgb(22, 22, 22) !important;
  font-family:'Microsoft YaHei' !important;
}
</style>