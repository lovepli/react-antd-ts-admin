import { Tooltip } from "antd";
import React from "react";
import codeTable from "@/utils/codeTable";
import { IColumnDefine } from "../tableCommon/IColumnDefine";

export const getConstantIdsToNames = (
  title: string,
  fieldName: string,
  codeTableName: string,
  textDisplayLength = 30,
  width?: number
): IColumnDefine => {
  const col: IColumnDefine = {
    canAutoOrder: false,
    dataIndex: fieldName,
    key: fieldName,
    render: (cellValue: string[], row: object, index: number): any => {
      const text = cellValue.map((item) => codeTable.getNameById(codeTableName, item)).toString();
      if (text.length <= textDisplayLength) {
        return <span style={col.style}>{text}</span>;
      }
      const newCellText = text.substr(0, textDisplayLength) + "...";
      return (
        <Tooltip title={text}>
          <span style={col.style}>{newCellText}</span>
        </Tooltip>
      );
    },
    title,
    width,
  };
  return col as any;
};
