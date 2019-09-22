const { mysql } = require('../qcloud')

module.exports = async ctx => {
    let { openid, page } = ctx.request.query
    page = Number(page)
    const size = 6
    let booklist = await getBooklist(openid, page, size)
    const max = await mysql('book').count('id')
    const maxPage = max[0]['count(`id`)']
    if (!page) {
        page = 1
    }
    ctx.state = {
        data: {
            data: booklist,
            total: maxPage,
            maxPage: Math.round(maxPage / size),
            currentPage: page
        }
    }
}

async function getBooklist (openid, page, size) {
    const booklist = await mysql('book')
        .select('book.*', 'cSessioninfo.user_info') // 查两个表
        .join('cSessioninfo', 'book.openid', 'cSessioninfo.open_id') // 联表查询
        .limit(size) // 限制数据量
        .offset((page - 1) * size) // 偏移量
        .orderBy('book.id') // 排序
    return booklist.map(v => {
        const info = JSON.parse(v.user_info)
        return Object.assign({}, v, {
            user_info: {
                nickName: info.nickName
            }
        })
    })
}
