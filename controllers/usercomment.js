const { mysql } = require('../qcloud')

module.exports = async ctx => {
    let { openid } = ctx.request.body
    // console.log(openid)
    if (openid) {
        const usercomment = await mysql('comments')
            // .select('comments.*', 'cSessionInfo.user_info')
            .select('comments.*', 'cSessionInfo.user_info', 'book.*')
            .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
            .join('book', 'comments.bookid', 'book.id')
            .where('comments.openid', openid)
        // console.log(usercomment)
        let parseUserComment = usercomment.map(v => {
            const userInfo = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                user_info: {
                    nickName: userInfo.nickName,
                    avatarUrl: userInfo.avatarUrl
                }
            })
        })
        ctx.state.data = parseUserComment
    }
}
