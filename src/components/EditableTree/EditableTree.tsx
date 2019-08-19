import React from 'react';
import { Tree, Icon, Popconfirm, message, Input } from 'antd';
import './style.less';
const { TreeNode } = Tree;



export interface INode {
  id: string;
  name: string;  // 节点名
  children?: INode[];   // 子节点
  title?: React.ReactNode; //   TreeNode的title属性可接受ReactNode，利用这一点来实现节点名的编辑，以及显示编辑、添加和删除图标按钮。
  parentId?: string;  // 父节点的id
  isEditable?: boolean;  // 控制节点是否为编辑状态
}


interface IProps {
  nodes: INode[];
  defaultExpandedKey?: string;
  onSelectTree?: (selectedKey: string) => void;
}

interface IState {
  nodes: INode[];
}

class EditableTree extends React.Component<IProps, IState>{

  // 由于树节点结构较复杂，当子节点层级较深时，不方便通过setState来改变状态，可以先修改nodes的值，然后再将其赋值给state。
  public nodes: INode[] = [];

  public readonly state: Readonly<IState> = {
    nodes: []
  };

  public componentDidMount() {
    this.nodes = this.formateNodes(this.props.nodes);
    this.setState({
      nodes: this.nodes
    });
  }

  public componentWillReceiveProps(nextProps: IProps) {
    this.nodes = this.formateNodes(nextProps.nodes);
    this.setState({
      nodes: this.nodes
    });
  }

  public render() {
    // 由于默认展开的节点只有在第一次获得节点数据的时候才会生效，但是第一次传入的数据是空数组，后续获取到真实数据之后，默认展开不会再生效。所有需要在获取到真实数据之后在渲染Tree。
    if (this.state.nodes.length === 0) { return null; }
    return (
      <Tree
        showLine={true}
        defaultExpandedKeys={this.props.defaultExpandedKey ? [this.props.defaultExpandedKey] : ['']}
        onSelect={this.handleSelect}
      >
        {this.renderTreeNodes(this.state.nodes)}
      </Tree>
    )
  }

  // 为每个树节点添加一些必要的属性
  private formateNodes = (nodes: INode[], id = '') => {
    const newNodes = [...nodes];
    const formate = (node: INode) => {
      node.parentId = id;
      node.isEditable = false;
    }
    newNodes.forEach(node => {
      if (node.children) {
        formate(node);
        this.formateNodes(node.children, node.id)
      } else {
        formate(node);
      }
    })
    return newNodes;
  }


  // 点击树节点时获取到点击的节点的key
  private handleSelect = (selectedKeys: string[], info: any) => {
    // 点击选中树节点之后，再点击一次会取消选中，此时selectedKeys会是一个空数组。
    if (selectedKeys.length === 0) { return; }
    // 只有点击节点名区域的时候才允许传递selectedKey，不然点击输入框或者操作图标，由于事件冒泡，仍然会触发onSelect。
    if (info.nativeEvent.target.id !== 'treeName') { return; }
    const selectedKey = selectedKeys[0];
    if (this.props.onSelectTree) {
      this.props.onSelectTree(selectedKey);
    }
  };

  // 渲染树
  private renderTreeNodes = (nodes: INode[]) => nodes.map((node) => {
    if (node.isEditable) {
      node.title = (
        <Input
          style={{ width: '120px' }}
          size="small"
          placeholder="请输入名称"
          value={node.name}
          autoFocus={true}
          onChange={this.handleChange.bind(this, node.id, this.nodes)}
          onPressEnter={this.handleSave.bind(this, node.id, this.nodes)}
          onBlur={this.handleSave.bind(this, node.id, this.nodes)}
        />
      );
    } else {
      node.title = (
        <div className="tree-title">
          <span id="treeName"> {node.name} </span>
          <span className="tree-title__handle" >
            <Icon style={{ marginLeft: 10 }} type='edit' onClick={this.handleEdit.bind(this, node.id, this.nodes)} />
            <Icon style={{ marginLeft: 10 }} type='plus' onClick={this.handleAdd.bind(this, node.id, this.nodes)} />
            {
              node.parentId === '' ?
                null :
                <Popconfirm
                  title={`确认要删除${node.name}吗?`}
                  onConfirm={this.handleDelete.bind(this, node.id, this.nodes)}
                  okText="删除"
                  cancelText="取消"
                >
                  <Icon style={{ marginLeft: 10 }} type='minus' />
                </Popconfirm>
            }
          </span>
        </div>
      )
    }

    if (node.children) {
      return (
        <TreeNode
          title={node.title}
          key={node.id}
        >
          {this.renderTreeNodes(node.children)}
        </TreeNode>
      );
    }
    return <TreeNode title={node.title} key={node.id} />;
  })


  // 编辑节点
  private handleEdit = (id: string, nodes: INode[], event: React.MouseEvent) => {
    event.stopPropagation()
    nodes.forEach((item) => {
      if (item.id === id) {
        item.isEditable = true;
      }
      this.setState({
        nodes: this.nodes
      });
      if (item.children) {
        this.handleEdit(id, item.children, event)
      }
    })
  }

  // 增加节点
  private handleAdd = (id: string, nodes: INode[]) => {
    nodes.some((node) => {
      const isCurrentNode: boolean = node.id === id;
      if (isCurrentNode) {
        if (node.children) {
          node.children.push({
            name: '名称',
            id: Date.now().toString(),
            parentId: id,
            isEditable: false
          });
        } else {
          node.children = [];
          node.children.push({
            name: '名称',
            id: Date.now().toString(),
            parentId: id,
            isEditable: false
          });
        }
        this.setState({
          nodes: this.nodes
        });
        message.success('添加成功!');
      } else {
        if (node.children) {
          this.handleAdd(id, node.children)
        }
      }
      return isCurrentNode;
    })
  }

  // 删除节点
  private handleDelete = (id: string, nodes: INode[]) => {
    nodes.some((node: INode, index: number) => {
      const isCurrentNode: boolean = node.id === id;
      if (isCurrentNode) {
        nodes.splice(index, 1);
        this.setState({
          nodes: this.nodes
        });
        message.success('删除成功!');
      } else {
        if (node.children) {
          this.handleDelete(id, node.children)
        }
      }
      return isCurrentNode;
    })
  }

  // 保存编辑输入结果
  private handleSave = (id: string, nodes: INode[]) => {
    nodes.some((node) => {
      const isCurrentNode: boolean = node.id === id;
      if (isCurrentNode) {
        if (!node.name) {
          message.warning('名称不能为空');
        } else {
          node.isEditable = false;
          this.setState({
            nodes: this.nodes
          });
          message.success('修改成功!');
        }
      } else {
        if (node.children) {
          this.handleSave(id, node.children)
        }
      }
      return isCurrentNode;
    })
  }

  private handleChange = (id: string, nodes: INode[], event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    nodes.some((node) => {
      const isCurrentNode: boolean = node.id === id;
      if (isCurrentNode) {
        node.name = name;
        this.setState({
          nodes: this.nodes
        }, () => {
          if (!name) {
            message.warning('名称不能为空');
          }
        });
      } else {
        if (node.children) {
          this.handleChange(id, node.children, event)
        }
      }
      return isCurrentNode;
    })
  }
}


export default EditableTree;
