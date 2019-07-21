import React from "react";
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend } from "bizcharts";
import DataSet from "@antv/data-set";

class InnerLabel extends React.Component {
  public render() {
    const { DataView } = DataSet;
    const data = [
      {
        item: "本科",
        count: 40
      },
      {
        item: "硕士",
        count: 21
      },
      {
        item: "博士",
        count: 17
      },
      {
        item: "初中",
        count: 13
      },
      {
        item: "专科",
        count: 9
      }
    ];
    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          val = val * 100 + "%";
          return val;
        }
      }
    };
    return (
      <div>
        <Chart
          height={400}
          padding={[80, 50, 80, 0]}
          background={{ fill: '#fff' }}
          data={dv}
          scale={cols}
          forceFit
        >
          <Coord type="theta" radius={1} />
          <Axis name="percent" />
          <Legend
            position="right"
            offsetY={-200}
            offsetX={-30}
          />
          <Tooltip
            showTitle={false}
          />
          <Geom
            type="intervalStack"
            position="percent"
            color="item"
            tooltip={[
              "item*percent",
              (item, percent) => ({
                name: item,
                value: percent * 100 + '%'
              })
            ]}
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          >
            <Label
              content="percent"
              offset={-40}
              htmlTemplate={
                (text, item) => {
                  const d = item.point;
                  return `<div  style="display: inline-block;width: 50px; color:#fff">${d.item}${text}</div>`
                }
              }
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default InnerLabel;
