// 新增图书
// 1.获取豆瓣信息
// 2.入库
// https://api.jisuapi.com/isbn/query?appkey=bcff48f4476215fd&isbn=9787212058937
const https = require('https')
const { mysql } = require('../qcloud')
module.exports = async ctx => {
    const { isbn, openid } = ctx.request.body
    if (isbn && openid) {
        const url =
            'https://api.jisuapi.com/isbn/query?appkey=bcff48f4476215fd&isbn=' +
            isbn
        const bookinfo = await getJSON(url)
        const { title, pic, summary, author, price } = bookinfo
        try {
            await mysql('book').insert({
                title,
                pic,
                summary,
                author,
                price,
                isbn,
                openid
            })
            ctx.state.data = {
                title,
                msg: 'success'
            }
        } catch (err) {
            ctx.state = {
                code: -1,
                data: {
                    msg: err
                }
            }
        }
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
                const bookinfo = JSON.parse(urlData)
                if (bookinfo.result.title) {
                    resolve(bookinfo.result)
                }
                reject(bookinfo)
                urlData += data
            })
        })
    })
}
