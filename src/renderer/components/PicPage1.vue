<template>
  <div class="com-page">
      <sole-qtty v-show="file !== null" :fileName="file"/>
  </div>
</template>
<script>
import SoleQtty from './SoleQtty'
const {dialog} = require('electron').remote
export default {
  data () {
    return {
      file: 'C:\\Users\\37324\\workspace\\github\\PredictionApp\\model\\input.xlsx'
    }
  },
  components: {
    SoleQtty: SoleQtty
  },
  methods: {
    choseFile () {
      let filePath = dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
          { name: 'Custom File Type', extensions: ['xls', 'xlsx', 'txt'] }
        ]
      })
      if (filePath !== null) {
        this.file = filePath
      }
      console.log(filePath)
    }
  }
}
</script>