const CONF = {
    port: '5757',
    rootPathname: '/data/weapp/server',

    // 微信小程序 App ID
    appId: 'wx41b12d522b6fca6e',

    // 微信小程序 App Secret
    appSecret: 'befd8103836c2f5ea0b23f2aa5e7ecea',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: false,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        pass: '123456',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 区域
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'wximg',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,

    // 其他配置 ...
    serverHost: 'www.liuchaoqun.top', // 以下配置可以留空不填 但是参数一定要有 否则会报错
    tunnelServerUrl: '', // 腾讯云信道服务地址 很多文档里写的地址打开直接404
    tunnelSignatureKey: '',
    // 可以注册一个腾讯云账号，获取一下配置。腾讯云相关配置可以查看云 API 秘钥控制台： https://console.cloud.tencent.com/capi
    qcloudAppId: '',
    qcloudSecretId: '',
    qcloudSecretKey: '',
    wxMessageToken: '',
    networkTimeout: 30000
}

module.exports =
    process.env.NODE_ENV === 'local'
        ? Object.assign({}, CONF, require('./config.local'))
        : CONF
