export interface IItem {
  id:string
  name: string;
  age: number;
  gender: string;
  roles: string[];
  registerTime: number;
}

export interface IQuery {
  keyword?: string;
  pageNumber: number;
  pageSize: number;
}

class State {
  // 表格当前页显示的数据
  public list: IItem[] = [];

  // 某项数据详情
  public detail: IItem | undefined;

  // 数据总数
  public total: number = 0;

  // 表格loading状态
  public tableLoading: boolean = false;

  // 新增或编辑数据提交时的loading状态
  public submitLoading: boolean = false;

  // 控制编辑模态窗是否显示
  public editVisible: boolean = false;

  // 多选的表格行
  public selectedRows: any[] = [];

  // 查询条件
  public query: IQuery = {
    pageNumber: 1,
    pageSize: 10,
  };

  public editKey: string = "";
}

export const defaultState = new State();
export interface IState extends State {}
