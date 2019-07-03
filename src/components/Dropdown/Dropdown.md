```typescript
import React from 'react';
import Dropdown from '@/components/Dropdown'

class DropdownDemo extends React.Component {
  public items = [{
    type: 'add',
    handle: this.add
  }, {
    type: 'delete',
    handle: this.delete
  }, {
    type: 'modify',
    handle: this.modify
  }]

  public add() {
    console.log('add');
  }
  public delete() {
    console.log('delete');
  }
  public modify() {
    console.log('modify');
  }

  public render() {
    return (
      <div>
        <Dropdown title="操作" items={this.items} />
      </div>
    )
  }
}

export default DropdownDemo;

```

![预览](https://s2.ax1x.com/2019/06/18/VLcYyn.png)



