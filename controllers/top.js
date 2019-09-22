const { mysql } = require('../qcloud')

module.exports = async ctx => {
    const size = 3
    const top = await mysql('book')
        .select('title', 'pic', 'id')
        .limit(size)
        .orderBy('count', 'desc')
    ctx.state.data = {
        list: top
    }
}
