

export interface IMenu {
  title: string;
  icon?: string;
  path?: string;
  hiddenInMenu?: boolean,
  children?: IMenu[];
}



export const MenuConfig: IMenu[] = [{
  title: '首页',
  icon: 'dashboard',
  path: '/dashboard'
}, {
  title: '图标',
  icon: 'smile',
  path: '/icon'
}, {
  title: '图表',
  icon: 'line-chart',
  children: [{
    title: '折线图',
    path: '/chart/lineChart'
  }, {
    title: '面积图',
    path: '/chart/areaChart'
  }, {
    title: '饼状图',
    path: '/chart/pieChart'
  }, {
    title: '柱状图',
    path: '/chart/pillarChart'
  }, {
    title: '雷达图',
    path: '/chart/radarChart'
  }]
}, {
  title: '表单',
  icon: 'form',
  children: [{
    title: '自定义表单控件',
    path: '/form/customField'
  }, {
    title: '富文本编辑器',
    path: '/form/richEditor'
  }]
}, {
  title: '用户管理',
  icon: 'user',
  path: '/user'
}, {
  title: '文章管理',
  icon: 'read',
  children: [{
    title: '文章列表',
    path: '/articleList'
  }, {
    title: '创建文章',
    path: '/articleCreate',
    hiddenInMenu: true,
  }]
}, {
  title: '组件',
  icon: 'pie-chart',
  children: [{
    title: '可编辑树',
    path: '/component/editableTree'
  }, {
    title: '遮罩',
    path: '/component/mask'
  }]
}, {
  title: '空页面',
  icon: 'border',
  path: '/blank'
}, {
  title: '其他功能',
  icon: 'ellipsis',
  children: [{
    title: 'pdf预览',
    path: '/other/pdf'
  }]
}]
