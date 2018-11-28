<template>
  <div>
    <a class="btn" @click="toggleShow">set avatar</a>
    <my-upload field="img"
               @crop-success="cropSuccess"
               @crop-upload-success="cropUploadSuccess"
               @crop-upload-fail="cropUploadFail"
               v-model="show"
               :width="300"
               :height="300"
               url="/upload"
               :params="params"
               :headers="headers"
               img-format="png"></my-upload>
    <img :src="imgDataUrl">
  </div>
</template>

<script>
  export default {
    name: 'image-cropper',
    props: {
      iconClass: {
        type: String,
        required: true
      }

    },
    computed: {
      iconName() {
        return `#icon-${this.iconClass}`
      }
    }
  }
</script>

<style lang="scss" type="text/scss">

</style>
