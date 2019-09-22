// 新增图书
// 1.获取豆瓣信息
// 2.入库
// https://api.jisuapi.com/isbn/query?appkey=bcff48f4476215fd&isbn=9787212058937
const https = require('https')
const { mysql } = require('../qcloud')
module.exports = async ctx => {
    const { isbn, openid } = ctx.request.body
    if (isbn && openid) {
        const findRes = await mysql('book')
            .select()
            .where('isbn', isbn)
        if (findRes.length) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '图书已存在'
                }
            }
            return
        }
        const url =
            'https://api.jisuapi.com/isbn/query?appkey=bcff48f4476215fd&isbn=' +
            isbn
        const bookinfo = await getJSON(url)
        const { title, pic, summary, author, price, language, publisher, pubplace, keyword } = bookinfo
        try {
            await mysql('book').insert({
                title, // 标题
                pic, // 图片
                summary, // 简介
                author, // 作者
                price, // 价格
                language,
                publisher,
                pubplace,
                keyword,
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
