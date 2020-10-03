import { IItem, IQuery } from './state'

class Service {
  // 获取用户列表
  public getList = async (data: IQuery): Promise<{ list: IItem[]; total: number }> => {
    const result = await $request.post('/user/userList', { data })
    const list: IItem[] = result.list
    return {
      list,
      total: result.total
    }
  }

  // 获取用户详情
  public getDetail = (id: string) => $request.post('/user/userDetail', { id })

  public handeDelete = (ids: string[]) => $request.post('/user/delete', { ids })
}

export default new Service()
