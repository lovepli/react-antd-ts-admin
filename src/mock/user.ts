import Mock from 'mockjs';



const userList = Mock.mock({
  "list|127": [{
    id: "@lower(@guid)",
    name: "@cname",
    age: "@natural(20,60)",
    gender: '@pick(["男","女"])',
    role: '@pick(["管理员", "编辑","普通会员","高级会员","普通用户"])',
  }]
})


const userDetail = Mock.mock({
  account: /^[a-zA-Z0-9_]{4,9}$/,
  name: "@cname",
  gender: '@pick(["男", "女"])',
  avatar: "@image('100x100', '#02adea', 'avatar')",
  email: "@email",
  mobilePhone: /^1[345789]\d{9}$/,
  role: '@pick(["管理员", "编辑","普通会员","高级会员","普通用户"])'
})

export default {
  getUserList(config: any) {
    let { name, pageNum, pageSize } = JSON.parse(config.body);
    name = name ? name : '';
    pageNum = pageNum ? pageNum : 10;
    pageSize = pageSize ? pageSize : 1;

    const filterList = userList.list.filter((item: any) => {
      let validName = false;
      validName = item.name.includes(name);
      return validName;
    })

    const startIndex = (Number(pageNum) - 1) * Number(pageSize);
    const endIndex = startIndex + Number(pageSize);
    return {
      code: 200,
      data: {
        userList: filterList.slice(startIndex, endIndex),
        userAmount: filterList.length
      }
    }
  },
  getUserDetail() {
    return {
      code: 200,
      data: {
        userDetail
      }
    }
  }
}
