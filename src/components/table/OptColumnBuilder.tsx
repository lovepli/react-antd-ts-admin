import { Divider, Popconfirm } from "antd";
import * as React from "react";

import { IColumnDefine } from "./tableCommon/IColumnDefine";
import { IOptGroup, OptGroup } from "./tableCommon/OptGroup";

type IOptColumnRender = (row: any) => React.ReactNode;

interface IColumnSortDefine extends IColumnDefine {
  sorter?: any;
}

export function createOptColumnBuilder() {
  return new OptColumnBuilder();
}

class OptColumnBuilder {
  private optGroup: OptGroup;
  private optColumnRenders: IOptColumnRender[] = [];
  private optColumnWidth?: number;

  public set OptColumnWidth(width: number) {
    this.optColumnWidth = width;
  }

  constructor() {
    const group = new OptGroup();
    this.optGroup = group;
    this.optColumnRenders = [];
  }

  public getOptColumn = () => {
    const optColumn: IColumnSortDefine = {
      canAutoOrder: false,
      dataIndex: "操作",
      key: "opt",
      width: this.optColumnWidth,
      title: "操作",
      render: (cellValue: any, row: any, index: number): React.ReactElement<any> => {
        return (
          <span>
            {this.optColumnRenders.map((createButtonFunc, i, array) => {
              if (i < array.length - 1) {
                return (
                  <span key={i}>
                    {createButtonFunc(row)} <Divider type="vertical" />
                  </span>
                );
              }

              return <span key={i}> {createButtonFunc(row)}</span>;
            })}
            {this.getGroupBtn(row)}
          </span>
        );
      },
    };

    return optColumn;
  };

  /** 删除按钮 */
  public AddButtonDelete = (onDelete: (deleteRow: any) => void): void => {
    const buttonFunc: IOptColumnRender = (row: any) => {
      const handleConfirm = () => {
        onDelete(row);
      };
      return (
        <Popconfirm key="Delete" title="确定要删除吗？" onConfirm={handleConfirm}>
          <a className="cf-table-delete-btn">删除</a>
        </Popconfirm>
      );
    };
    this.optColumnRenders.push(buttonFunc);
  };

  /** 编辑按钮 */
  public AddButtonEdit = (onEditing: (editRow: any) => void): void => {
    this.AddButton("编辑", onEditing);
  };

  /** 申请按钮 */
  public AddButtonApply = (onView: (editRow: any) => void): void => {
    this.AddButton("申请", onView);
  };

  /** 自定义名称按钮 */
  public AddButton = (
    buttonName: string,
    onClick: (clickRow: any) => void,
    option?: {
      onGetConfirmText?: (row: any) => string;
      onCanDisplay?: (row: any) => boolean;
      /** 对齐美观，优先使用 */
      onCanDisabled?: (row: any) => boolean;
    }
  ): void => {
    const render = (row: any) => {
      const handleClick = () => onClick(row);

      if (option != null) {
        if (option.onCanDisplay != null) {
          if (option.onCanDisplay(row) === false) {
            return undefined;
          }
        }
        if (option.onCanDisabled != null) {
          if (option.onCanDisabled(row) === true) {
            return <span>{buttonName}</span>;
          }
        }

        if (option.onGetConfirmText != null) {
          const confirmText = option.onGetConfirmText(row);

          return (
            <Popconfirm key={buttonName} title={confirmText} onConfirm={handleClick}>
              <a className="cf-table-delete-btn">{buttonName}</a>
            </Popconfirm>
          );
        }
      }

      return (
        <a key={buttonName} onClick={handleClick}>
          {buttonName}
        </a>
      );
    };
    this.optColumnRenders.push(render);
  };

  /** 自定义渲染 */
  public AddButtonRender = (onRender: (row: any) => React.ReactNode): void => {
    this.optColumnRenders.push(onRender);
  };

  public AddButtonGroup = (): IOptGroup => {
    const group = new OptGroup();
    this.optGroup = group;
    return group;
  };

  private getGroupBtn(row: any): React.ReactNode {
    if (this.optGroup == null) {
      return undefined;
    }
    if (this.optColumnRenders.length > 0) {
      return (
        <span>
          <Divider type="vertical" /> {this.optGroup.onRender(row)}
        </span>
      );
    }
    return this.optGroup.onRender(row);
  }
}
