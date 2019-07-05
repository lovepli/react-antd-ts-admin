
export const createOptions = (map: object) => {
  const options: { label: string, value: string }[] = [];
  for (const [key, value] of Object.entries(map)) {
    options.push({
      label: value,
      value: key
    })
  }
  return options;
}

export const TypeMap = {
  gender: {
    '1': '男',
    '2': '女'
  },
  role: {
    '1': '管理员',
    '2': '运营',
    '3': '高级会员',
    '4': '普通会员',
    '5': '普通用户',
  }
}

