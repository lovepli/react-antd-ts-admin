import React from 'react';
import { Button, Input, Row, Col } from 'antd';

interface IHeaderProps {
  onAdd: (id?: string) => void;
  onDelete: (rows?: any[]) => void;
  onSearch: (value: string) => void;
}


class Header extends React.Component<IHeaderProps> {
  public render() {
    const { onAdd, onDelete, onSearch } = this.props;
    return (
      <Row type="flex" justify="space-between">
        <Col>
          <Button.Group>
            <Button type="primary" icon="plus" onClick={() => onAdd()}>新增</Button>
            <Button type="danger" icon="minus" onClick={() => onDelete()}>删除</Button>
          </Button.Group>
        </Col>
        <Col>
          <Input.Search placeholder="请输入查询关键字" onSearch={(value) => onSearch(value)} enterButton />
        </Col>
      </Row>
    )
  }

}

export default Header;
