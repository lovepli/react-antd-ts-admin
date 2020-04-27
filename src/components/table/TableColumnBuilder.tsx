import { Button, Select, Switch, Tooltip } from "antd";

import * as React from "react";
import moment from "moment";
import { getConstantIdsToNames } from "./columnDefines/getConstantIdsToNames";
import { getConstantIdToName } from "./columnDefines/getConstantIdToName";
import { IColumnDefine } from "./tableCommon/IColumnDefine";

export function createTableColumnBuilder() {
  return new TableColumnBuilder();
}

export interface IColumnSortDefine extends IColumnDefine {
  sorter?: any;
  align?: "left" | "right" | "center";
}

class TableColumnBuilder {
  private columnDefines: IColumnSortDefine[] = [];

  constructor() {
    this.columnDefines = [];
  }

  public GetColumns = () => {
    const columns: IColumnSortDefine[] = [];
    for (const c of this.columnDefines) {
      columns.push(c);

      if (c.canAutoOrder) {
        c.sorter = (row1: object, row2: object) => rowSorter(row1, row2, c.dataIndex);
      }
    }

    return columns;
  };

  /** 排序号 */
  public AddSortNum = (title: string, width?: any): IColumnDefine => {
    const col: IColumnSortDefine = {
      canAutoOrder: false,
      dataIndex: "__SortNum",
      key: "__SortNum",
      render: (cellValue: any, row: object, index: number): any => {
        const indexLabel = index + 1;
        return <Tooltip title={indexLabel}>{indexLabel}</Tooltip>;
      },
      title,
      width,
    };
    this.columnDefines.push(col);
    return col;
  };

  public AddText = (title: string, fieldName: string, textDisplayLength = 20, width?: any): IColumnDefine => {
    const col: IColumnSortDefine = {
      canAutoOrder: false,
      dataIndex: fieldName,
      key: fieldName,
      render: (cellValue: any, row: object, index: number): any => {
        if (cellValue == null) {
          return "";
        }

        if (typeof cellValue !== "string") {
          throw new Error("列非文本类型, 在：" + fieldName + "=" + cellValue);
        }

        const length = cellValue.length;
        if (length <= textDisplayLength) {
          return <span style={col.style}> {col.prefixText ? col.prefixText + cellValue : cellValue}</span>;
        }
        let newCellText = cellValue.substr(0, textDisplayLength);
        newCellText = newCellText + "...";

        return (
          <Tooltip title={cellValue}>
            <span style={col.style}> {col.prefixText ? col.prefixText + cellValue : newCellText}</span>
          </Tooltip>
        );
      },
      title,
      width,
    };
    this.columnDefines.push(col);
    return col;
  };

  public AddNumber = (title: string, fieldName: string, width?: any): IColumnDefine => {
    const col: IColumnSortDefine = {
      canAutoOrder: false,
      dataIndex: fieldName,
      key: fieldName,
      render: (cellValue: any, row: object, index: number) => {
        return <span style={col.style}>{cellValue as any}</span>;
      },
      title,
      width,
    };
    this.columnDefines.push(col);
    return col;
  };

  public AddBool = (
    title: string,
    fieldName: string,
    trueValue = "是",
    falseValue = "否",
    width?: any
  ): IColumnDefine => {
    const col: IColumnSortDefine = {
      canAutoOrder: false,
      dataIndex: fieldName,
      key: fieldName,
      render: (cellValue: any, row: object, index: number): any => {
        const val = row[fieldName];
        if (val === "" || val == null) {
          return "";
        }

        if (val === true) {
          return <span style={{ ...col.style, color: "#64B60D" }}> {trueValue}</span>;
        }
        if (val === false) {
          return <span style={{ ...col.style, color: "#E65006" }}> {falseValue}</span>;
        }

        return <span style={col.style}> : {val}</span>;
      },
      title,
      width,
    };
    this.columnDefines.push(col);
    return col;
  };

  public AddCustomRender = (
    title: string,
    fieldName: string,
    render: (cellValue: any, row: object, index: any) => any,
    width?: any,
    align?: "left" | "right" | "center"
  ): IColumnDefine => {
    const col: IColumnSortDefine = {
      canAutoOrder: false,
      dataIndex: fieldName,
      key: fieldName,
      render,
      title,
      width,
      align,
    };
    this.columnDefines.push(col);
    return col;
  };

  public AddDate = (title: string, fieldName: string, format?: string, width?: any) => {
    const col: IColumnSortDefine = {
      canAutoOrder: false,
      dataIndex: fieldName,
      key: fieldName,
      render: (cellValue: any, row: object, index: number): any => {
        if (!cellValue || cellValue === "") {
          return "";
        }
        const formatType = format || "YYYY-MM-DD";
        const localeString = moment(cellValue).format(formatType);
        return <span style={col.style}>{localeString}</span>;
      },
      title,
      width,
    };
    this.columnDefines.push(col);
    return col;
  };

  /** 系统常量id到名称的转换  */
  public AddConstantIdToName = (
    title: string,
    fieldName: string,
    constantTableName: string,
    textDisplayLength = 30,
    width?: number,
    colorful?: boolean
  ): IColumnDefine => {
    const col = getConstantIdToName(title, fieldName, constantTableName, textDisplayLength, width, colorful);
    this.columnDefines.push(col);
    return col;
  };

  public AddConstantIdArrayToName = (
    title: string,
    fieldName: string,
    codeTableName: string,
    textDisplayLength = 30,
    width?: any
  ): IColumnDefine => {
    const col = getConstantIdsToNames(title, fieldName, codeTableName, textDisplayLength, width);
    this.columnDefines.push(col);
    return col;
  };
}

const rowSorter = (row1: object, row2: object, field: string) => {
  const a = row1[field];
  const b = row2[field];
  if (a === b) {
    return 0;
  }
  if (typeof a === "string" && typeof b === "string") {
    return a.localeCompare(b, "zh-CN");
  }
  if (typeof a !== "string" && typeof b === "string") {
    return -1;
  }
  if (typeof a === "string" && typeof b !== "string") {
    return 1;
  }

  return a - b;
};
