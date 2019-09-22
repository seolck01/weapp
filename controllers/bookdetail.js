const { mysql } = require('../qcloud')

module.exports = async ctx => {
    const { id } = ctx.request.query
    if (id) {
        await mysql('book')
            .where('id', id)
            .increment('count', 1)
        const bookDetail = await mysql('book')
            .select('book.*', 'cSessioninfo.user_info')
            .join('cSessioninfo', 'book.openid', 'cSessioninfo.open_id')
            .where('id', id)
            .first()
        bookDetail.user_info = {
            nickName: JSON.parse(bookDetail.user_info).nickName
        }
        ctx.state.data = bookDetail
    } else {
        ctx.state = {
            code: -1,
            data: {
                msg: '图书已存在'
            }
        }
    }
}
