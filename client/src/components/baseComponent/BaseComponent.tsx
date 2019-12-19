// 所有路由页面都可以使用的基类，可以提取公共方法放到此类中，如基本的CRUD方法，路由跳转，基本弹窗等

import React from 'react';
import {Modal} from 'antd';


class BaseComponent extends React.Component {

  public commonFn = () => {
    console.log(111);
  }
  /*
   * @record {object | array} 表单记录, 批量删除时为数组
  */
  public onDelete = (record: any) => {
    // if (!record) return;
    // if ($$.isArray(record) && !record.length) return;

    // const content = `您是否要删除这${
    //   $$.isArray(record) ? record.length : ''
    //   }项？`;

    // Modal.confirm({
    //   title: '注意',
    //   content,
    //   onOk: () => {
    //     this.handleDelete($$.isArray(record) ? record : [record]);
    //   },
    //   onCancel() { }
    // });
  };
}


export default BaseComponent;
