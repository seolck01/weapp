const { mysql } = require('../qcloud')

module.exports = async ctx => {
    const { bookid } = ctx.request.query
    if (bookid) {
        const commentlist = await mysql('comments')
            .select('comments.*', 'cSessionInfo.user_info')
            .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
            .where('bookid', bookid)
        let parseCommentList = commentlist.map(v => {
            const userInfo = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                user_info: {
                    nickName: userInfo.nickName,
                    avatarUrl: userInfo.avatarUrl
                }
            })
        })
        ctx.state.data = parseCommentList
    }
}
