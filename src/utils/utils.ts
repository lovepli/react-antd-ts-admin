// 生成ID
export const guid = () => {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
};

// 获取url中的查询字符串参数
export const getURLParams = (url: string) => {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  );
}


// 将对象转换为查询字符串,用于post请求
export const objToParams = (data: any) => {
  const keys: string[] = Object.keys(data);
  const params: string[] = keys.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
  return params.join('&');
}

// 将get请求中的params参数转换为查询字符串
export const paramsSerializer = (params: any) => {
  const paramArr: string[] = [];
  let key: string = '';
  let value: any = '';
  for ([key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      value.forEach(item => {
        paramArr.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`);
      });
    } else {
      paramArr.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }
  return paramArr.join('&');
}



// 判断数据类型
export const getType = (value: any) => {
  return value === undefined ? "undefined" : value === null ? "null" : value.constructor.name.toLowerCase();
}


// 对base64格式的文件进行处理并下载
export const downloadFile = (data: string, fileName: string, header: string = "") => {
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = header + data;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
