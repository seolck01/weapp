const { mysql } = require('../qcloud')

module.exports = async ctx => {
    const { openid } = ctx.request.query
    if (openid) {
        let booklist = await getBooklist(openid)
        ctx.state.data = booklist
    }
}

async function getBooklist (openid) {
    const booklist = await mysql('book')
        .select('book.*', 'cSessioninfo.user_info')
        .join('cSessioninfo', 'book.openid', 'cSessioninfo.open_id')
        .orderBy('book.id', 'desc')
    return booklist.map(v => {
        const info = JSON.parse(v.user_info)
        return Object.assign({}, v, {
            user_info: {
                nickName: info.nickName
            }
        })
    })
}
