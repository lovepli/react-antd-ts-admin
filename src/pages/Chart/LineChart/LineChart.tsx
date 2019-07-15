import React from 'react';
import { Row, Col } from 'antd';
import Basic from './components/Basic';

class LineChart extends React.Component {

  public render() {
    return (
      <div className="chart">
        <Row gutter={16}>
          <Col lg={12} sm={24}>
            <h3>基础折线图</h3>
            <Basic />
          </Col>

        </Row>

      </div>
    )
  }
}

export default LineChart;
