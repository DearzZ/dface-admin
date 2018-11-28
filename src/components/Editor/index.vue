<template>
  <div>
    <div id="editorElem" style="text-align:left">
    </div>
  </div>
</template>
<script>
  import Editor from 'wangeditor'
  import '@/assets/js/qiniu/qiniu.min'

  export default {
    name: 'editor',
    props: {
      content: {
        type: String,
        default:''
      }
    },
    methods: {

      uploadInit: function (editor) {
        // 获取相关 DOM 节点的 ID
        const btnId = editor.imgMenuId;
        const containerId = editor.toolbarElemId;
        const textElemId = editor.textElemId;
        // 创建上传对象
        const uploader = Qiniu.uploader({
          runtimes: 'html5,html4',    //上传模式,依次退化
          browse_button: btnId,       //上传选择的点选按钮，**必需**
          uptoken_url: '/api/qiniu/tokenSpecial',
          // uptoken : '<Your upload token>',
          //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
          domain: 'http://dphoto.qiniu.dface.cn/',
          container: containerId,           //上传区域DOM ID，默认是browser_button的父元素，
          max_file_size: '100mb',           //最大文件体积限制
          filters: {
            mime_types: [
              //只允许上传图片文件 （注意，extensions中，逗号后面不要加空格）
              {title: "图片文件", extensions: "jpg,gif,png,bmp,jpeg"}
            ]
          },
          max_retries: 3,                   //上传失败最大重试次数
          dragdrop: true,                   //开启可拖曳上传
          drop_element: textElemId,        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
          chunk_size: '4mb',                //分块上传时，每片的体积
          auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
          init: {
            'FilesAdded': function (up, files) {
              plupload.each(files, function (file) {
                // 文件添加进队列后,处理相关的事情
                console.log('on FilesAdded');
              });
            },
            'BeforeUpload': function (up, file) {
              // 每个文件上传前,处理相关的事情
              console.log('on BeforeUpload');
            },
            'FileUploaded': function (up, file, info) {
              // 每个文件上传成功后,处理相关的事情
              // 其中 info 是文件上传成功后，服务端返回的json，形式如
              // {
              //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
              //    "key": "gogopher.jpg"
              //  }

              let domain = 'http://dphoto.qiniu.dface.cn/';
              let res = JSON.parse(info.response);
              let sourceLink = domain + res.key; //获取上传成功后的文件的Url

              // 插入图片到editor
              editor.cmd.do('insertHtml', '<img src="' + sourceLink + '" style="max-width:100%;"/>')
            },
            'Error': function (up, err, errTip) {
              //上传出错时,处理相关的事情
              console.log(errTip)
            },
            'UploadComplete': function () {
              //队列文件处理完毕后,处理相关的事情
              console.log('On UploadComplete')
            }
          }

        });
      },
      setImgSize: function () {
        /*
        * 迫不得已写的一个设置编辑器中图片宽高的函数，流两滴泪先，要兼容以前富文本的内容，然后对其设置了高和宽
        * 本想直接用官方的粘贴文本过滤的方法写，但是 编辑器的表情包也是img图片，且以前出过显示问题，
        * 所以只能在change的时候对img元素进行修改 blur之后修改html不会再触发事件了！！！
        * @method setImgSize
        *
        * */
        let containerID = document.getElementById('editorElem');
        let imgList = containerID.getElementsByTagName("img")
        if (!imgList || imgList.length === 0){
          return
        }
        for (let item of imgList) {
          if (!item.getAttribute('width') || !item.getAttribute('height')){
            let imgObj = item.getBoundingClientRect();
          let imgWidth = imgObj.width;
          let imgHeight = imgObj.height;
            item.setAttribute('width',imgWidth)
            item.setAttribute('height',imgHeight)
          }


        }
      }
    },
    mounted() {
      let editor = new Editor('#editorElem');
      editor.customConfig.onchange = (html) => {
        this.setImgSize();
        this.editorContent = html;
        this.$emit('editorChange',this.editorContent);

      };
      editor.customConfig.qiniu = true;
      editor.create();
      editor.txt.html(this.content)
      this.uploadInit(editor)

    }
  }
</script>

<style lang="scss" type="text/scss">
  .w-e-toolbar {
    width: 100%;
    display: inline-block !important;
  }

  .w-e-toolbar .w-e-menu {
    display: inherit;
  }

  .w-e-toolbar .w-e-droplist {
    z-index: 10009 !important;
  }
</style>
