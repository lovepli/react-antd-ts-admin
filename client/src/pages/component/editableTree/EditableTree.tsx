import React from "react";
import EditableTree, { INode } from '@/components/EditableTree';


const nodes: INode[] = [{
  id: '1',
  name: 'Root1',
  children: [{
    id: '1-1',
    name: 'Root11',
    children: [{
      id: '1-1-1',
      name: 'Root111',
    }]
  }, {
    id: '1-2',
    name: 'Root12',
    children: [{
      id: '1-2-1',
      name: 'Root121',
    }]
  }]
}]


class EditableTreeDemo extends React.Component {

  public render() {
    return (
      <div style={{ backgroundColor: '#fff' }}>
        <EditableTree nodes={nodes} defaultExpandedKey="1-1-1" onSelectTree={this.handleSelectTree} />
      </div>
    );
  }


  private handleSelectTree = (selectedKey: string) => {
    // console.log(selectedKey);
  }
}



export default EditableTreeDemo;
