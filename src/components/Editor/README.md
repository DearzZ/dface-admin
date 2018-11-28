###  富文本组件

使用wangeditor，为耦合前angular项目及历史遗留的editor问题，进行部分优化

 #### Props


名称| 类型 | 默认 | 说明
---|---|---|---
 content  | String  |  ""   |  富文本内容
 
 #### Events
 名称 | 参数 | 说明
 ---|---|---
  editorChange   | content  |  富文本修改后的回调
  
  使用
  ```html
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

  
  ```
 