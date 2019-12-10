export default {
  /* debug 模式 */
  // debug: true,

  zIndex: 1,

  /* 插入的图片被转换为base64 */
  uploadImgShowBase64: true,

  /* 直接上传图片到远程 */
  // uploadImgServer: '/upload',
  // uploadImgMaxSize: 3 * 1024 * 1024, // 将图片大小限制为 3M
  // uploadImgMaxLength: 5, // 限制一次最多上传 5 张图片

  /*   自定义上传参数 */
  // uploadImgParams: {
  //   token: 'abcdef12345'
  // },
  // uploadImgHeaders: {
  //   'Accept': 'text/x-json'
  // },
  // uploadFileName: 'yourFileName', // 自定义上传的字段名
  // withCredentials: true,    // 跨域传递 cookie
  // uploadImgTimeout: 3000,  // 设置超时时间

  /*  自定义提示方法 */
  // customAlert(info){
  //   alert('自定义提示：' + info)
  // },


  /* 自定义 onchange 触发的延迟时间，默认为 200 ms */
  // onchangeTimeout: 1000, // 单位 ms
  // onchange = html => html,

  // onfocus = _ => {}; // 点击富文本区域会触发onfocus函数执行
  // onblur = html => (); // 点击富文本以外的区域

  // pasteFilterStyle: false,  // 粘贴时不进行样式过滤
  // pasteIgnoreImg: true, // 忽略粘贴内容中的图片
  // pasteTextHandle: context => content, // 自定义处理粘贴的文本内容


  /*   自定义配置颜色（字体颜色、背景色） */
  colors: [
    '#000000', '#eeece0', '#1c487f', '#4d80bf', '#c24f4a',
    '#8baa4a', '#7b5ba1', '#46acc8', '#f9963b', '#ffffff',
    '#61a951', '#16a085', '#07a9fe', '#003ba5', '#8e44ad',
    '#f32784', '#c0392b', '#d35400', '#f39c12', '#fdda00'
  ],



  /*  自定义字体 */
  fontNames: ['宋体', '微软雅黑', 'Arial', 'Tahoma', 'Verdana'],


  /* 自定义菜单配置 */
  menus: [
    'head',  // 标题
    'bold',  // 粗体
    'fontSize',  // 字号
    'fontName',  // 字体
    'italic',  // 斜体
    'underline',  // 下划线
    'strikeThrough',  // 删除线
    'foreColor',  // 文字颜色
    'backColor',  // 背景颜色
    'link',  // 插入链接
    'list',  // 列表
    'justify',  // 对齐方式
    'quote',  // 引用
    'emoticon',  // 表情
    'image',  // 插入图片
    'table',  // 表格
    'video',  // 插入视频
    // 'code',  // 插入代码
    // 'undo',  // 撤销
    // 'redo',  // 恢复
  ],
}
