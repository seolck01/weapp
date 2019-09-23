const { mysql } = require('../qcloud')

module.exports = async ctx => {
    const { bookid } = ctx.request.query
    if (bookid) {
        const commentlist = await mysql('comments')
            .select('comments.*', 'cSessioninfo.user_info')
            .join('cSessioninfo', 'comments.openid', 'cSessioninfo.open_id')
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
