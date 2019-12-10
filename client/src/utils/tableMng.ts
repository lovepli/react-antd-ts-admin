/* 基础数据表管理 */

// 表名。方便使用的时候查看
const TABLE_NAME_MAP = {
  gender: 'gender',
  role: 'role',
  region: 'region',
  article: 'article'
}

class TableMng {

  public baseTable = {};

  public tableNameMap = {};

  constructor(data) {
    this.baseTable = data;
    this.tableNameMap = TABLE_NAME_MAP;
  }

  // 初始化数据表
  public initTable(data) {
    const baseTable = {
      ...this.baseTable,
      ...data
    };
    this.baseTable = baseTable;
    sessionStorage.setItem('baseTable', window.JSON.stringify(baseTable));
  }


  /*
   * 获取某个表
   * @param {String} tableName 表名
  */
  public getTable(tableName) {
    const table = this.baseTable[tableName];
    if (table) {
      return table;
    } else {
      throw new Error(`表“${tableName}”不存在`)
    }
  }

  /*
   * 获取某个表的所有项的id
   * @param {String} tableName 表名
  */
  public getIds(tableName) {
    const table = this.getTable(tableName);
    return table.map(item => item.id);
  }

  /*
 * 获取某个表的所有项的name
 * @param {String} tableName 表名
*/
  public getNames(tableName) {
    const table = this.getTable(tableName);
    return table.map(item => item.name);
  }

  /*
   * 获取某个表中某一项的名称
   * @param {String} tableName 表名
   * @param {String} id  ID
   *
  */
  public getNameById(tableName, id) {
    const table = this.getTable(tableName);
    const result = table.find(item => item.id === id);
    return result ? result.name : '';
  }

  // 格式化为前端需要的数据结构
  public formatTable(tableName, idFiled, nameFiled) {
    const table = this.getTable(tableName);
    return table.map(item => ({
      [idFiled]: item.id,
      [nameFiled]: item.name
    }))
  }
}

// 如果后端未提供，前端也可以自行定义
const fixTable = {};

// 为什么需要存一份到本地？
// 用户在使用的时候可能会刷新页面，这个时候会去重新请求baseTable的数据，而数据有可能会在页面渲染完成之后才返回，这个时候页面中使用到了baseTable，就会出现表不存在的情况。
const storageTable = JSON.parse(sessionStorage.getItem('baseTable') || window.JSON.stringify({}));

const tableMng = new TableMng({ ...fixTable, ...storageTable });

export default tableMng;
