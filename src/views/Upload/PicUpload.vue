<template>
  <div class="wrapper">
    <el-upload
            ref="upload"
            action="api/baidu/uploadSimilarFile"
            :file-list="fileList"
            list-type="picture-card"
            :on-success="handleSuccess"
            :auto-upload="true">
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{file}">
        <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
        >
        <span class="el-upload-list__item-actions">
        <span
                v-if="!disabled"
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
      </div>
    </el-upload>
  </div>
</template>

<script>
  import {deleteSimilar} from "@/api/baidu";

  export default {
    name: "index",
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        fileList: [],
        picList: []
      };
    },
    methods: {
      handleSuccess(file){
        // console.log(file)
        let obj = { name: file.fileName, url: file.fileDownloadUri }
        this.picList.push(obj)
        // console.log(this.fileList);
      },
      handleRemove(file) {
        let fileName
        if(file.response){
          fileName = file.response.fileName
        }else{
          fileName = file.name
        }
        deleteSimilar(fileName).then(res=>{
          let arrPic = this.$refs.upload.uploadFiles;
          let index = arrPic.indexOf(file);
          let num = 0;
          this.picList.splice(index, 1);    //fileList 也要跟着删除
          arrPic.map((item) => {
            if (item.uid == file.uid) {
              arrPic.splice(num, 1);
            }
            num++;
          });
          this.$message.success("删除成功")
        })
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      }
    }
  }
</script>

<style scoped>
.wrapper{
  margin: 20px 1px 1px 20px;
  width: 600px;
}
</style>
