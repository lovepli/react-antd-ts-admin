import React from 'react';
import { Dropdown, Icon, Menu } from 'antd';

// import SvgIcon from '@/components/SvgIcon'
import { tupleStr } from '@/utils/tuple';
import './Dropdown.less';

const Placements = tupleStr('bottomLeft', 'topLeft', 'topCenter', 'topRight', 'bottomCenter', 'bottomRight');
type Placement = (typeof Placements)[number];

interface IDorpMap {
	readonly [index: string]: {
		text: string;
		icon: string;
	};
}

interface IDropDownProps {
	title: string;
	items: any;
	placement?: Placement;
	trigger?: ('click' | 'hover' | 'contextMenu')[];
	onVisibleChange?: (visible: boolean) => void;
	visible?: boolean;
	disabled?: boolean;
	getPopupContainer?: (triggerNode: Element) => HTMLElement;
	className?: string;
	overlayClassName?: string;
	overlayStyle?: React.CSSProperties;
}

// 下拉菜单固定的选项
const dropMap: IDorpMap = {
	add: {
		text: '添加',
		icon: 'iconadd'
	},
	delete: {
		text: '删除',
		icon: 'icondelete'
	},
	modify: {
		text: '修改',
		icon: 'iconmodify'
	},
	apply: {
		text: '报名情况',
		icon: 'iconapply'
	},
	cashDeposit: {
		text: '保证金情况',
		icon: 'iconcashDeposit'
	},
	announcement: {
		text: '查看公告',
		icon: 'iconannouncement'
	},
	file: {
		text: '查看文件',
		icon: 'iconfile'
	},
	correct: {
		text: '更正',
		icon: 'iconcorrect'
	},
	replenish: {
		text: '补充',
		icon: 'iconreplenish'
	},
	check: {
		text: '审核',
		icon: 'iconcheck'
	},
	view: {
		text: '查看',
		icon: 'iconlook'
	}
}

class YGDropdown extends React.Component<IDropDownProps> {
	private menuList: React.ReactNode;

	private handleClick: (arg: any) => void;

	constructor(props: IDropDownProps) {
		super(props);
		this.handleClick = ({ key }) => {
			const currentItem = this.props.items.find((item: { type: string; handle: () => void }) => item.type === key)
			currentItem.handle();
		}
		this.menuList = (
			<Menu onClick={this.handleClick} >
				{
					this.props.items.map((item: { type: string; handle: () => void }) => (
						<Menu.Item key={item.type}>
							<span>
								{/* <SvgIcon type={dropMap[item.type].icon} /> */}
								<span style={{ marginLeft: 10 }}>{dropMap[item.type].text}</span>
							</span>
						</Menu.Item>
					))
				}
			</Menu>
		)
	}

	public render() {
		return (
			<div className="dropdown">
				<Dropdown overlay={this.menuList} {...this.props}>
					<span>
						<span className="dropdown-title">
							{this.props.title}
						</span>
						<Icon type="caret-down" className="dropdown-icon" />
					</span>
				</Dropdown>
			</div>
		)
	}
}

export default YGDropdown;

