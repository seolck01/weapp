const { mysql } = require('../qcloud')

module.exports = async ctx => {
    let { openid } = ctx.request.body
    console.log(openid)
    if (openid) {
        const usercomment = await mysql('comments')
            .select('*')
            .where('openid', openid)
        console.log(usercomment)
    }
}
