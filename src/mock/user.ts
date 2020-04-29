import Mock from "mockjs";

const listData = Mock.mock({
  "list|127": [
    {
      id: "@lower(@guid)",
      key: "@lower(@guid)",
      name: "@cname",
      age: "@natural(20,60)",
      gender: '@pick(["1","2"])',
      role: ["admin"],
      account: /^[a-zA-Z0-9_]{4,9}$/,
      avatar: "@image('100x100', '#02adea', 'avatar')",
      email: "@email",
      mobilePhone: /^1[345789]\d{9}$/,
      time: "@datetime",
    },
  ],
});

const list = listData.list;

export default {
  getList(config: any) {
    const { keyword = "", pageNumber = 1, pageSize = list.length } = JSON.parse(config.body);

    const filterList = list.filter((item: any) => {
      let validName = false;
      validName = item.name.includes(name);
      return validName;
    });

    const startIndex = (Number(pageNumber) - 1) * Number(pageSize);
    const endIndex = startIndex + Number(pageSize);
    return {
      code: 200,
      data: {
        list: filterList.slice(startIndex, endIndex),
        total: filterList.length,
      },
    };
  },
  getDetail(config: any) {
    const id = JSON.parse(config.body);
    const detail = list.find((item) => item.id === id);
    return {
      code: 200,
      data: {
        detail,
      },
    };
  },
};
