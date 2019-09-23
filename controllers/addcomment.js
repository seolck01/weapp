const { mysql } = require('../qcloud')

module.exports = async ctx => {
    const { bookid, comment, openid } = ctx.request.body
    if (!openid) {
        ctx.state = {
            code: -1,
            data: {
                msg: '请登陆'
            }
        }
        return
    }
    try {
        const book = await mysql('comments')
            .select('*')
            .where('bookid', bookid)
        console.log(book)

        const userOpenid = book.filter(v => {
            if (v.openid === openid) {
                return v
            }
        })
        if (userOpenid && userOpenid.length > 0) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '评论失败, 您对本书发表过书评'
                }
            }
            return
        }
        await mysql('comments').insert({
            bookid,
            comment,
            openid
        })
        ctx.state.data = {
            msg: '发表成功'
        }
    } catch (err) {
        ctx.state = {
            code: -1,
            data: {
                msg: '评论失败' + err.sqlMessage
            }
        }
    }
}
