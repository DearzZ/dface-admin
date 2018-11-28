<template>
  <div class="warpper">
    <image-cropper></image-cropper>
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

    }
  }
</script>

<style lang="scss" type="text/scss">

</style>
