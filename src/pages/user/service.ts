import { IUser } from './model'

export interface IParams {
  keyword?: string
  pageNumber: number
  pageSize: number
}

// 获取用户列表
const getUserList = async (params: IParams): Promise<{ list: IUser[]; total: number }> => {
  const result = await $request.post('/user/list', params)
  return {
    list: result.list,
    total: result.total
  }
}
// 获取用户详情
const getUserDetail = (id: number) => $request.post('/user/detail', { id })

const deleteUser = (ids: number[]) => $request.post('/user/delete', { ids })

export default {
  getUserList,
  getUserDetail,
  deleteUser
}
