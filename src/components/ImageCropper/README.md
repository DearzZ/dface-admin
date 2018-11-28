
 
 ### Image-Cropper
 
 图片上传裁剪,对vue-crop-img-upload进行再次封装
 
 
 #### Props

> 上传按钮有button和图片墙形式,width，height只在图片墙形式下有效，buttonText只在button形式下有效
名称| 类型 | 默认 | 说明
---|---|---|---
 type      | String  |  "wall"|  上传按钮类型
 imageUrl  | String  |  ""    |  图片上传成功后的地址
 width     | Number  |  200   |  上传按钮、图片显示宽度
 height    | Number  |  200   |  上传按钮、图片显示高度
 cropWidth | Number  |  200   |  要裁剪的图片宽度
 cropHeight| Number  |  200   |  要裁剪的图片高度
 noSquare  | Boolean |  false |  关闭 方形图像预览
 noCircle  | Boolean |  true  |  关闭 圆形图像预览
 noRotate  | Boolean |  true  |  关闭 旋转图像功能
 langType  | String  |  'zh'  |  语言类型，默认中文
 maxSize   | Number  |  10240 |  单文件大小限制
 imgFormat | String  |  'png' |  图片上传格式
 field     | String  |'avatar'|  域，上传文件name，触发事件会带上（如果一个页面多个图片上传控件，可以做区分
 ki        |         |    0   |  原名key，类似
 
 
 #### Events
 名称 | 参数 | 说明
 ---|---|---
  cropUpSuccess   | imageUrl  |  图片上传成功后的回调
 
 ###### 组件
```html

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
        <div  @click="openImgCropper">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" :style="{ width: width + 'px', height: height + 'px'}">
            <i v-else class="el-icon-plus avatar-uploader-icon" @click="openImgCropper"
               :style="{ width: width + 'px', height: height + 'px', lineHeight: height + 'px'}"></i>
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


```


使用

```html

<template>
    <div class="warpper">
        <image-cropper @cropUpSuccess="cropUpSuccess" :imageUrl="imageUrl" :width="300" :height="100"></image-cropper>
    </div>
</template>

<script>
    import imageCropper from '@/components/ImageCropper'

    export default {
        components: {
            imageCropper
        },
        data() {
            return {
                imageUrl: ''
            };
        },
        methods: {
            cropUpSuccess(url) {
                this.imageUrl = url
            }
        }
    }
</script>


```
