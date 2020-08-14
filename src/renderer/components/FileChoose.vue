<template>
  <div class="file-choose">
      <el-upload 
        class="upload-demo"
        drag
        :show-file-list="false"
        :on-change="getFile"
        action="#"
        :auto-upload="false">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text"><em>请点击选择文件,只能上传excel文件</em></div>
    </el-upload> 
  </div>
</template>

<script>
export default {
  data () {
    return {
      file: null
    }
  },
  methods: {
    getFile (file, filelist) {
      console.log(file)
      var fileName = file.name
      var filePath = file.raw.path
      if (this.validExcel(fileName, '.xls') || this.validExcel(fileName, '.xlsx')) {
        this.file = {
          fileName: fileName,
          filePath: filePath
        }
      } else {
        alert('请选择excel')
      }
    },
    validExcel (file, target) {
    // 请把你的代码写在这里
      var start = file.length - target.length
      return (start >= 0 && file.lastIndexOf(target) === start)
    }
  }
}
</script>

<style>
.file-choose{
	background-color: rgb(34, 31, 31);
}
.upload-demo {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.file-choose {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.el-upload--text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
</style>