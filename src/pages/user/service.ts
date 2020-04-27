import { IItem, IQuery } from "./state";

class Service {
  // 获取用户列表
  public getList = async (data: IQuery): Promise<{ list: IItem[]; total: number }> => {
    const result = await $http.post("/user/userList", { data });
    const list: IItem[] = result.list;
    return {
      list,
      total: result.total,
    };
  };

  // 获取用户详情
  public getDetail = (id: string) => $http.post("/user/userDetail", { id });
}

export default new Service();
