import Mock from 'mockjs';



const listData = Mock.mock({
  "list|127": [{
    id: "@lower(@guid)",
    name: "@cname",
    age: "@natural(20,60)",
    gender: '@pick(["1","2"])',
    role: ['2', '3'],
    account: /^[a-zA-Z0-9_]{4,9}$/,
    avatar: "@image('100x100', '#02adea', 'avatar')",
    email: "@email",
    mobilePhone: /^1[345789]\d{9}$/,
    time: '@datetime'
  }]
})


export default {
  getList(config: any) {
    let { name, pageNum, pageSize } = JSON.parse(config.body);
    name = name ? name : '';
    pageNum = pageNum ? pageNum : 10;
    pageSize = pageSize ? pageSize : 1;

    const filterList = listData.list.filter((item: any) => {
      let validName = false;
      validName = item.name.includes(name);
      return validName;
    })

    const startIndex = (Number(pageNum) - 1) * Number(pageSize);
    const endIndex = startIndex + Number(pageSize);
    return {
      code: 200,
      data: {
        list: filterList.slice(startIndex, endIndex),
        total: filterList.length
      }
    }
  },
  getDetail(config: any) {
    const { id } = JSON.parse(config.body);
    const detail = listData.list.find(item => item.id === id);
    return {
      code: 200,
      data: {
        detail
      }
    }
  }
}
