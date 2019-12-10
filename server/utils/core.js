const querystring = require('querystring');


const parser = ctx => {
  return new Promise((resolve, reject) => {
    try {
      let data = '';
      // ctx.req就是原生node中的req
      ctx.req.on('data', (chunk) => {
        data += chunk;

      })
      ctx.req.on('end', () => {
        data = querystring.parse(data);
        resolve(data);
      })
    } catch (err) {
      reject(err);
    }
  })
}

module.exports = {
  parser
}
