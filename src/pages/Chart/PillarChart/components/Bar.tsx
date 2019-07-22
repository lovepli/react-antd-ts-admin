import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";

class Bar extends React.Component {
  public render() {
    const data = [
      {
        country: "中国",
        population: 131744
      }, {
        country: "印度",
        population: 104970
      }, {
        country: "美国",
        population: 29034
      }, {
        country: "印尼",
        population: 23489
      }, {
        country: "巴西",
        population: 18203
      }
    ];
    const scale = {
      population: {
        alias: '人口(万)'
      }
    }
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.source(data).transform({
      type: "sort",
      callback: (a: any, b: any) => a.population - b.population > 0
    });
    return (
      <div>
        <Chart
          height={400}
          padding={[40, 20, 40, 50]}
          background={{ fill: '#fff' }}
          data={dv}
          scale={scale}
          forceFit>
          <Coord transpose />
          <Axis
            name="country"
            label={{
              offset: 12
            }}
            tickLine={{
              length: 0
            }}
            line={{
              lineWidth: 0
            }}
          />
          <Axis name="population" />
          <Tooltip />
          <Geom
            type="interval"
            position="country*population"
            size={20}
          />
        </Chart>
      </div>
    );
  }
}

export default Bar;
