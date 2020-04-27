import { Dropdown, Icon, Menu, Popconfirm } from "antd";
import * as React from "react";

export interface IOptGroup {
  text: string;
  add(
    btnName: string,
    onClick: (clickRow: any) => void,
    option?: {
      onGetConfirmText?: (row: any) => string;
      onCanDisplay?: (row: any) => boolean;
    },
    icon?: string
  ): void;
}

export interface IOptGroupBtn {
  text: string;
  onClick: (row: any) => void;
  option?: {
    onGetConfirmText?: (row: any) => string;
    onCanDisplay?: (row: any) => boolean;
  };
  icon?: string;
}

export class OptGroup implements IOptGroup {
  public text: string = "操作";
  private opts: IOptGroupBtn[] = [];
  public add = (
    btnText: string,
    onClick: (row: any) => void,
    option?: {
      onGetConfirmText?: (row: any) => string;
      onCanDisplay?: (row: any) => boolean;
    },
    icon?: string
  ): void => {
    this.opts.push({ text: btnText, onClick, option, icon });
  };
  public onRender = (row: any): React.ReactNode => {
    const menuItems = this.getMenuItems(row);
    if (menuItems.length === 0) {
      return undefined;
    }
    const menu = <Menu>{menuItems}</Menu>;
    return (
      <Dropdown key={this.text} overlay={menu} trigger={["click"]}>
        <a className="ant-dropdown-link">
          {this.text} <Icon type="caret-down" />
        </a>
      </Dropdown>
    );
  };
  private getMenuItems(row: any): React.ReactNode[] {
    const menuItems: React.ReactNode[] = [];

    for (const btnInfo of this.opts) {
      const handleClick = () => btnInfo.onClick(row);

      if (btnInfo.option == null) {
        menuItems.push(
          <Menu.Item key={btnInfo.text} onClick={handleClick}>
            <a>
              {/* <span><SvgIcon type={btnInfo.icon ? btnInfo.icon : 'iconapply'} size={1} /></span> */}
              <span style={{ marginLeft: 10 }}>{btnInfo.text}</span>
            </a>
          </Menu.Item>
        );
        continue;
      }

      if (btnInfo.option.onCanDisplay != null) {
        if (btnInfo.option.onCanDisplay(row) === false) {
          continue;
        }
      }

      if (btnInfo.option.onGetConfirmText != null) {
        const confirmText = btnInfo.option.onGetConfirmText(row);
        menuItems.push(
          <Menu.Item key={btnInfo.text}>
            <Popconfirm key={btnInfo.text} title={confirmText} onConfirm={handleClick}>
              <a>
                {/* <span><SvgIcon type={btnInfo.icon ? btnInfo.icon : 'iconapply'} size={1} /></span> */}
                <span style={{ marginLeft: 10 }}>{btnInfo.text}</span>
              </a>
            </Popconfirm>
          </Menu.Item>
        );
      } else {
        menuItems.push(
          <Menu.Item key={btnInfo.text} onClick={handleClick}>
            <a>
              {/* <span><SvgIcon type={btnInfo.icon ? btnInfo.icon : 'iconapply'} size={1} /></span> */}
              <span style={{ marginLeft: 10 }}>{btnInfo.text}</span>
            </a>
          </Menu.Item>
        );
      }
    }
    return menuItems;
  }
}
