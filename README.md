## 项目简介

后台管理系统。前端基于React+Antd+TypeScript，后端基于koa+MongoDB。



## 技术依赖

- 主体：React、TypeScript、AntD
- 图表：BizChart
- 富文本编辑器：braft-editor
- 数据：axios

[线上地址](https://wluyao.github.io/admin/dist/index.html)  

## 功能

- 登录/退出
- 一键换肤
- 个人中心
- 侧边菜单
- 图标
- 表单
- 表格
- 图表
  - 折线图
  - 面积图
- 用户管理
- 文章管理
  - 创建文章
  - 文章列表
- 上传
  - 头像上传
  - 文件上传
- 错误处理
  - 403
  - 404
- 组件
  - 可编辑的树
  - 

## 项目截图



## 目录结构

```
|-- client                              客户端
|	|-- config					            webpack配置文件
|	|-- dist								构建目录
|	|-- public					            入口页面、favicon
|	|-- src									源码
|		|-- assets							全局资源文件，会被webpack解析为模块依赖
|			|-- images								图片
|			|-- icons								字体
|	    	|-- styles							    样式	
|		|-- components                      全局公共组件
|		|-- layouts							页面布局
|		|-- mock							模拟数据
|		|-- pages							功能页面	
|		|-- router							路由管理	
|		|-- store							状态管理	
|		|-- utils						    全局公用方法	
|		|-- App.tsx							根组件
|		|-- index.tsx						入口文件
|	|-- .babelrc								babel-loader 配置
|	|-- .editorconfig					    	vscode配置
|	|-- .gitignore								git提交时忽略的文件
|	|--	package.json							项目基本信息
|	|-- README.md								项目说明
|	|-- tsconfig.json							TypeScript配置

|-- server                              服务端

```



## 使用

### 运行

```
npm run dev
```

### 构建

```
npm run build
```

