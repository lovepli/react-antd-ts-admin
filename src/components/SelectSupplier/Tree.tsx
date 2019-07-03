import React from "react";
import { Tree } from "antd";
const { TreeNode } = Tree;

interface IProps {
  treeData: object[];
  selectTree: (treeKey: string) => void;
}

class YGTree extends React.Component<IProps> {
  // 渲染树节点
  public renderTreeNodes = (data: any) =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.title} key={item.key} />;
    });

  // 点击树节点时获取到点击的节点的key
  public handleSelect = (selectedKeys: string[]) => {
    this.props.selectTree(selectedKeys[0]);
  };


  public render() {
    return <Tree showLine defaultExpandedKeys={['1-1-1']} onSelect={this.handleSelect}>{this.renderTreeNodes(this.props.treeData)}</Tree>;
  }
}

export default YGTree;
