<template>
  <div>
    <img-cropper field="img"
                 @crop-success="cropSuccess"
                 @crop-upload-success="cropUploadSuccess"
                 @crop-upload-fail="cropUploadFail"
                 v-model="imagecropperShow"
                 :width="cropWidth"
                 :height="cropHeight"
                 :url="url"
                 :params="params"
                 @close="closeCrop"
                 :noSquare="noSquare"
                 :noCircle="noCircle"
                 :noRotate="noRotate"
                 :key="imagecropperKey"
                 :langType="langType"
                 :maxSize="maxSize"
                 :field="field"
                 img-format="png"></img-cropper>
    <div @click="openImgCropper">
      <img v-if="imageUrl" :src="imageUrl" class="avatar" :style="{ width: width + 'px', height: height + 'px'}">
      <div v-else>
        <i v-if="type === 'wall'" class="el-icon-plus avatar-uploader-icon" @click="openImgCropper"
           :style="{ width: width + 'px', height: height + 'px', lineHeight: height + 'px'}"></i>
        <el-button type="primary" plain v-if="type == 'button'">{{buttonText}}</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  import imgCropper from 'vue-image-crop-upload';
  import {getQiNiuToken} from '@/api/common/qiniu'
  import {dataURItoBlob} from '@/utils'

  export default {
    name: 'image-cropper',
    components: {
      imgCropper
    },
    data() {
      return {
        params: {},
        show: '',
        imagecropperShow: false,
        imagecropperKey: 0,
        pictureUrl: 'http://dphoto.qiniu.dface.cn/',
        url: 'http://upload.qiniu.com/',
        qiniuToken: ''
      }
    },
    props: {
      type: {
        type: String,
        default: 'wall'
      },
      buttonText: {
        type: String,
        default: '点击上传图片'
      },
      imageUrl: {
        type: String,
        default: ''
      },
      width: {
        type: Number,
        default: 200
      },
      height: {
        type: Number,
        default: 200
      },
      cropWidth: {
        type: Number,
        default: 200
      },
      cropHeight: {
        type: Number,
        default: 200
      },
      noSquare: {
        type: Boolean,
        default: false
      },
      noCircle: {
        type: Boolean,
        default: true
      },
      noRotate: {
        type: Boolean,
        default: true
      },
      langType: {
        type: String,
        default: 'zh'
      },
      maxSize: {
        type: Number,
        default: 10240
      },
      field: {
        type: String,
        default: 'avatar'
      },
      ki: {
        default: 0
      }

    },
    methods: {
      openImgCropper: function () {
        this.imagecropperShow = true
        if (!this.qiniuToken) {
          getQiNiuToken().then(res => {
            this.qiniuToken = res.data.uptoken
            this.imagecropperShow = true
          }).catch((error) => {
            console.log(error)
          })
        } else {
        }
      },
      closeCrop: function () {
        this.imagecropperShow = false
      },
      cropSuccess: function (imageDataUrl) {
        const imgFile = dataURItoBlob(imageDataUrl);
        this.params.file = imgFile;
        this.params.token = this.qiniuToken
      },
      cropUploadSuccess: function (resp) {
        const imageUrl = this.pictureUrl + resp.key
        this.imagecropperKey++
        this.imagecropperShow = false
        this.$emit('cropUpSuccess', imageUrl);
      },
      cropUploadFail: function (resp) {
        this.imagecropperKey++
        this.imagecropperShow = false
        console.log(resp)
        this.$message.error('出了点小问题哦，请稍后再试！')
      }
    }
  }
</script>
<style lang="scss" type="text/scss">

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    text-align: center;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409EFF;
    }
  }

  .avatar {
    display: block;
  }
</style>
