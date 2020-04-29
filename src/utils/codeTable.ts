/* 基础数据映射表管理 */

interface IItem {
  id: string;
  name: string;
}

interface ITable {
  name: string;
  list: IItem[];
}

export class CodeTable {
  public tableNameMap = {};

  private data: ITable[];

  constructor(data: ITable[]) {
    this.data = data;
    this.tableNameMap = TABLE_NAME_MAP;
  }

  // 初始化数据表
  public initTable(data: ITable[]) {
    const newData = [...this.data, ...data];
    this.data = newData;
    sessionStorage.setItem("codeTable", JSON.stringify(newData));
  }

  /*
   * 获取某个表
   * @param {String} tableName 表名
   */
  public getTable(tableName: string) {
    const table = this.data.find((item) => item.name === tableName);
    if (table) {
      return table;
    } else {
      const newTable: ITable = {
        name: tableName,
        list: [
          {
            id: "9001",
            name: tableName + ".ID-1",
          },
          {
            id: "9002",
            name: tableName + ".ID-2",
          },
        ],
      };
      return newTable;
      // throw new Error(`表“${tableName}”不存在`);
    }
  }

  /*
   * 获取某个表的所有项的id
   * @param {String} tableName 表名
   */
  public getIds(tableName: string) {
    const table = this.getTable(tableName);
    return table.list.map((item) => item.id);
  }

  /*
   * 获取某个表的所有项的name
   * @param {String} tableName 表名
   */
  public getNames(tableName: string) {
    const table = this.getTable(tableName);
    return table.list.map((item) => item.name);
  }

  /*
   * 获取某个表中某一项的名称
   * @param {String} tableName 表名
   * @param {String} id  ID
   *
   */
  public getNameById(tableName: string, id: string) {
    const table = this.getTable(tableName);
    const result = table.list.find((item) => item.id === id);
    return result ? result.name : "";
  }

  // 格式化为前端需要的数据结构
  public formatTable(tableName: string, idFiled: string, nameFiled: string) {
    const table = this.getTable(tableName);
    return table.list.map((item) => ({
      [idFiled]: item.id,
      [nameFiled]: item.name,
    }));
  }
}

// 如果后端未提供，前端也可以自行定义
const fixTable = [];

// 为什么需要存一份到本地？
// 用户在使用的时候可能会刷新页面，这个时候会去重新请求baseTable的数据，而数据有可能会在页面渲染完成之后才返回，这个时候页面中使用到了codeTable，就会出现表不存在的情况。
const storageTable = JSON.parse(sessionStorage.getItem("codeTable") || JSON.stringify([]));


export default new CodeTable([...fixTable, ...storageTable]);

// 表名。方便使用的时候调用
const TABLE_NAME_MAP = {
  gender: "gender",
  role: "role",
  region: "region",
  article: "article",
};
