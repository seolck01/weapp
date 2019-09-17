// 新增图书
// 1.获取豆瓣信息
// 2.入库
// https://api.jisuapi.com/isbn/query?appkey=bcff48f4476215fd&isbn=9787212058937
const https = require('https')
module.exports = async ctx => {
    const { isbn, openid } = ctx.request.body
    console.log(isbn)
    console.log(openid)
    if (isbn && openid) {
    let url =
        'https://api.jisuapi.com/jzw/search?appkey=bcff48f4476215fd&keyword=女人&pagenum=1&pagesize=1' // 测试用的api
    // 'https://api.jisuapi.com/isbn/query?appkey=bcff48f4476215fd&isbn=' + isbn
    const bookinfo = await getJSON(url)
    console.log(bookinfo)
    }
}

function getJSON (url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let urlData = ''
            res.on('data', data => {
                urlData += data
            })
            res.on('end', data => {
                const bookinfo = JSON.parse(data)
                if (bookinfo.title) {
                    resolve(bookinfo)
                }
                reject(bookinfo)
                urlData += data
            })
        })
    })
}
