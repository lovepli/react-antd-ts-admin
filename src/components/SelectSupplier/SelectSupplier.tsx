import React from "react";
import { Modal, Button, Tabs, Tag, Row, Col } from "antd";
const { TabPane } = Tabs;

import './SelectSupplier.less';
import Tree from './Tree';
import Table from './Table';

interface IProps {
  modalVisible: boolean;
  hideModal: () => void;
}


class SelectSupplier extends React.Component<IProps> {
  //  所选择的供应商id
  public supplierId: string[] = [];

  public state = {
    currentPaneKey: '1',
    supplierLib: [{
      libName: '协议供应商库',
      libKey: '1',
      supplier: [{
        key: '1',
        title: '协议供应商',
        suppliers: [{
          id: '1',
          supplierName: '华为技术有限公司',
          linkman: '张三',
          phone: '13888888888'
        }],
        children: [{
          key: '1-1',
          title: '办公家具类',
          suppliers: [{
            id: '1',
            supplierName: '华为技术有限公司',
            linkman: '张三',
            phone: '13888888888'
          }],
          children: [{
            key: '1-1-1',
            title: '办公室',
            suppliers: [{
              id: '1',
              supplierName: '华为技术有限公司',
              linkman: '张三',
              phone: '13888888888'
            }],
          }, {
            key: '1-1-2',
            title: '会议室',
            suppliers: [{
              id: '1',
              supplierName: '华为技术有限公司',
              linkman: '张三',
              phone: '13888888888'
            }],
          }, {
            key: '1-1-3',
            title: '演讲厅',
            suppliers: [{
              id: '1',
              supplierName: '华为技术有限公司',
              linkman: '张三',
              phone: '13888888888'
            }],
          }]
        }, {
          key: '1-2',
          title: '办公电器类',
          suppliers: [{
            id: '1',
            supplierName: '华为技术有限公司',
            linkman: '张三',
            phone: '13888888888'
          }],
          children: [{
            key: '1-2-1',
            title: '办公室',
            suppliers: [{
              id: '1',
              supplierName: '华为技术有限公司',
              linkman: '张三',
              phone: '13888888888'
            }],
          }, {
            key: '1-2-2',
            title: '会议室',
            suppliers: [{
              id: '1',
              supplierName: '华为技术有限公司',
              linkman: '张三',
              phone: '13888888888'
            }],
          }, {
            key: '1-2-3',
            title: '演讲厅',
            suppliers: [{
              id: '1',
              supplierName: '华为技术有限公司',
              linkman: '张三',
              phone: '13888888888'
            }],
          }]
        }, {
          key: '1-3',
          title: '小型工程类',
          suppliers: [{
            id: '1',
            supplierName: '华为技术有限公司',
            linkman: '张三',
            phone: '13888888888'
          }],
          children: [{
            key: '1-3-1',
            title: '办公室',
            suppliers: [{
              id: '1',
              supplierName: '华为技术有限公司',
              linkman: '张三',
              phone: '13888888888'
            }],
          }, {
            key: '1-3-2',
            title: '会议室',
            suppliers: [{
              id: '1',
              supplierName: '华为技术有限公司',
              linkman: '张三',
              phone: '13888888888'
            }],
          }, {
            key: '1-3-3',
            title: '演讲厅',
            suppliers: [{
              id: '1',
              supplierName: '华为技术有限公司',
              linkman: '张三',
              phone: '13888888888'
            }],
          }]
        }]
      }]
    }, {
      libName: '自有供应商库',
      libKey: '2',
      supplier: [{
        key: '1',
        title: '自有供应商',
        children: [{
          key: '1-1',
          title: '办公家具类',
          children: [{
            key: '1-1-1',
            title: '办公室'
          }, {
            key: '1-1-2',
            title: '会议室'
          }, {
            key: '1-1-3',
            title: '演讲厅'
          }]
        }, {
          key: '1-2',
          title: '办公电器类',
          children: [{
            key: '1-2-1',
            title: '办公室'
          }, {
            key: '1-2-2',
            title: '会议室'
          }, {
            key: '1-2-3',
            title: '演讲厅'
          }]
        }, {
          key: '1-3',
          title: '小型工程类',
          children: [{
            key: '1-3-1',
            title: '办公室'
          }, {
            key: '1-3-2',
            title: '会议室'
          }, {
            key: '1-3-3',
            title: '演讲厅'
          }]
        }]
      }]
    }],
    tableData: [{
      key: '1',
      supplierName: 'XXXXX技术有限责任公司',
      linkman: '张三',
      phone: '13888888888',
    }, {
      key: '2',
      supplierName: 'XXXXX技术有限责任公司',
      linkman: '张三',
      phone: '13888888888',
    }, {
      key: '3',
      supplierName: 'XXXXX技术有限责任公司',
      linkman: '张三',
      phone: '13888888888',
    }]
  }

  // 打开模态窗
  public handleOk = (e: React.MouseEvent) => {
    console.log(e);
    this.props.hideModal();
  };

  // 关闭模态窗
  public handleCancel = (e: React.MouseEvent) => {
    console.log(e);
    this.props.hideModal();
  };

  // 根据点击的树节点的key，设置对应的表格数据
  public setTableData = (treeKey: string) => {
    // const currentSupplierLib = this.state.supplierLib.findIndex(item => item.libKey === this.state.currentPaneKey)
    // this.state.supplierLib[currentSupplierLib].supplier.forEach(item => { })
    this.setState({
      tableData: [{
        key: '1',
        supplierName: 'XXXXX技术有限责任公司',
        linkman: '张三',
        phone: '13888888888',
      }, {
        key: '2',
        supplierName: 'XXXXX技术有限责任公司',
        linkman: '张三',
        phone: '13888888888',
      }, {
        key: '3',
        supplierName: 'XXXXX技术有限责任公司',
        linkman: '张三',
        phone: '13888888888',
      }]
    })
  }

  // 获取已选择的供应商
  public getSupplier = (selectedRowKeys: string[]) => {
    this.supplierId = selectedRowKeys;
  }

  // 点击tab栏时获取当前tabPane的key
  public handleTabClick = (key: string) => {
    this.setState({
      currentPaneKey: key
    })
  }

  public render() {
    const loading = false;
    return (
      <Modal
        title="供应商选择"
        width="50%"
        visible={this.props.modalVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={<Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>确认</Button>}
      >
        <Tabs size="small" onTabClick={this.handleTabClick}>
          {
            this.state.supplierLib.map(item => (
              <TabPane
                tab={
                  <span>
                    <span>{item.libName}</span>
                    <Tag color="#f50">99</Tag>
                  </span>
                }
                key={item.libKey}
              >
                <Row>
                  <Col span={6} ><Tree treeData={item.supplier} selectTree={this.setTableData} /></Col>
                  <Col span={18}><Table tableData={this.state.tableData} selectTable={this.getSupplier} /></Col>
                </Row>
              </TabPane>
            ))
          }
        </Tabs>
      </Modal >
    );
  }
}

export default SelectSupplier;
