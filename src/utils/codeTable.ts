// 基础数据映射表管理
import { tupleStr } from '@/utils/tuple'

const TableNames = tupleStr('gender', 'role', 'region', 'article')
export type TableName = typeof TableNames[number]

interface IItem {
    id: string
    name: string
}

interface ITable {
    name: string
    list: IItem[]
}

export class CodeTable {
    private data: ITable[]

    constructor(data: ITable[]) {
        this.data = data
    }

    /**
     * 手动初始化
     * **可用于从后端获取数据后，进行追加**
     */
    public initTable(data: ITable[]) {
        const newData = [...this.data, ...data]
        this.data = newData
        sessionStorage.setItem('codeTable', JSON.stringify(newData))
    }

    /**
     * 获取某个表
     * @param {TableName} tableName 表名
     */
    public getTable(tableName: TableName) {
        const table = this.data.find((item) => item.name === tableName)
        if (table) {
            return table
        } else {
            const newTable: ITable = {
                name: tableName,
                list: [
                    {
                        id: '9001',
                        name: tableName + '.ID-1'
                    },
                    {
                        id: '9002',
                        name: tableName + '.ID-2'
                    }
                ]
            }
            return newTable
            // throw new Error(`表“${tableName}”不存在`);
        }
    }

    /**
     * 获取某个表的所有项的id
     * @param {TableName} tableName 表名
     */
    public getIds(tableName: TableName) {
        const table = this.getTable(tableName)
        return table.list.map((item) => item.id)
    }

    /**
     * 获取某个表的所有项的name
     * @param {TableName} tableName 表名
     */
    public getNames(tableName: TableName) {
        const table = this.getTable(tableName)
        return table.list.map((item) => item.name)
    }

    /**
     * 获取某个表中某一项的名称
     * @param {TableName} tableName 表名
     * @param {String} id
     */
    public getNameById(tableName: TableName, id: string) {
        const table = this.getTable(tableName)
        const result = table.list.find((item) => item.id === id)
        return result ? result.name : ''
    }

    /**
     * 根据id列表获取名称列表
     * @param {TableName} tableName 表名
     * @param {Array} ids
     */
    public getNamesByIds(tableName: TableName, ids: string[]) {
        const table = this.getTable(tableName)
        const names: string[] = []
        table.list.forEach((item) => {
            if (ids.includes(item.id)) {
                names.push(item.name)
            }
        })
        return names
    }

    /**
     * 格式化为指定的数据结构
     * ** 比如有的地方使用value,label **
     */
    public formatTable(
        tableName: TableName,
        idFiled: string,
        nameFiled: string
    ) {
        const table = this.getTable(tableName)
        return table.list.map((item) => ({
            [idFiled]: item.id,
            [nameFiled]: item.name
        }))
    }
}

// 如果后端未提供，前端也可以自行定义
const fixTable = []

// 为什么需要存一份到本地？
// 用户在使用的时候可能会刷新页面，这个时候会去重新请求baseTable的数据，而数据有可能会在页面渲染完成之后才返回，这个时候页面中使用到了codeTable，就会出现表不存在的情况。
const storageTable = JSON.parse(
    sessionStorage.getItem('codeTable') || JSON.stringify([])
)

export default new CodeTable([...fixTable, ...storageTable])
