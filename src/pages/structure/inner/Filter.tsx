import React from 'react';
import { Radio } from 'antd';


interface IFilterProps {
  onChange: (value: string) => void;
}


class Filter extends React.Component<IFilterProps> {

  public handleChange = (e: any) => {
    this.props.onChange(e.target.value);
  }

  public render() {
    return (
      <div style={{float:"right"}}>
        <Radio.Group onChange={this.handleChange} defaultValue="a">
          <Radio.Button value="a">全部</Radio.Button>
          <Radio.Button value="b">启用</Radio.Button>
          <Radio.Button value="c">停用</Radio.Button>
        </Radio.Group>
      </div>

    )
  }
}

export default Filter;
