<template>
  <div class="wrapper">
    <editor @editorChange="changeContent" :content="content"></editor>
  </div>

</template>

<script>
  import Editor from '@/components/Editor'

  export default {
    components: {
      Editor
    },
    data() {
      return {
        content: ''
      }
    },
    methods: {
      changeContent (content) {
        this.content = content;
      }
    }
  }
</script>
