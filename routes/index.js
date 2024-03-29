/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp' // 定义所有路由的前缀都已 /weapp 开头
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const {
    auth: { authorizationMiddleware, validationMiddleware }
} = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口 /weapp/login
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态） /weapp/user
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中 /weapp/upload
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的 /weapp/tunnel
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求 /weapp/message
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

// 添加图书
router.post('/addbook', controllers.addbook)

// 获取图书列表
router.get('/booklist', controllers.booklist)

// 获取图书详情
router.get('/bookdetail', controllers.bookdetail)

// 轮播图
router.get('/top', controllers.top)

// 添加评论
router.post('/addcomment', controllers.addcomment)

// 获取文章评论
router.get('/commentlist', controllers.commentlist)

// 获取用户评论
router.post('/usercomment', controllers.usercomment)
module.exports = router
