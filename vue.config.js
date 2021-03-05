/**
 * @description 系统配置文件
 * @author PP
 */

// 引入gzip压缩插件 3.0.1 版本
const CompressionWebpackPlugin = require('compression-webpack-plugin')

// 静态文件迁移复制插件 5.1.1
const CopyWebpackPlugin = require('copy-webpack-plugin')

// 代码压缩 2.2.0 版本
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// 本地环境是否需要使用cdn
const DevOpenCDN = false

// cdn链接
const CDNConfig = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
    vue: 'Vue',
    axios: 'axios',
    moment: 'moment',
    wangeditor: 'wangeditor',
    'v-charts': 'VeIndex',
    'vue-router': 'VueRouter',
    'ant-design-vue': 'ant-design-vue',
  },
  // cdn的css链接
  cssLink: [
    'http://cdn.jsdelivr.net/npm/ant-design-vue@1.6.2/dist/antd.min.css',
    'https://cdn.bootcss.com/wangEditor/3.0.3/wangEditor.min.css',
  ],
  // cdn的js链接
  js: [
    'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
    'https://cdn.bootcss.com/vue-router/3.0.3/vue-router.min.js',
    'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
    'https://cdn.bootcss.com/wangEditor/3.0.3/wangEditor.min.js',
    'https://cdn.jsdelivr.net/npm/v-charts',
    'https://cdn.jsdelivr.net/npm/moment@2.22.2/moment.min.js',
    'https://cdn.bootcdn.net/ajax/libs/moment.js/2.22.2/locale/zh-cn.js',
    'https://cdn.jsdelivr.net/npm/ant-design-vue@1.6.2/dist/antd.min.js',
  ],
}

// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development'

const path = require('path')

const cssArray = ['css', 'less', 'scss', 'sass', 'stylus', 'postcss']

const primary = '#409eff'

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './', // 打包路径
  lintOnSave: false,

  // pages: {
  //   index: {
  //     entry: 'examples/main.ts',
  //     template: 'public/index.html',
  //     filename: 'index.html',
  //     title: 'water-ui-next-test',
  //   },
  // },

  // 系统配置
  chainWebpack: config => {
    config.module
      .rule('less')
      .oneOf('vue')
      .use('style-resource')
      .loader('style-resources-loader')
      .options({
        patterns: [
          path.resolve(__dirname, './src/design/var/index.less'),
          path.resolve(__dirname, './src/design/mixins.less'),
          path.resolve(__dirname, './src/design/color.less'),
          // path.resolve(__dirname, './src/design/color.less'),
          // path.resolve(__dirname, './src/design/color.less'),
        ],
      })

    config.plugins.delete('prefetch') // 关闭预加载

    // 热重载
    // if (process.env.NODE_ENV !== 'production') {
    //   config.module
    //     .rule('tsx')
    //     .test(/\.tsx$/)
    //     .use('vue-jsx-hot-loader')
    //     .before('babel-loader')
    //     .loader('vue-jsx-hot-loader')
    // }

    // 压缩图片 image-webpack-loader
    // config.module
    //   .rule('images')
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({ bypassOnDebug: true })
    //   .end()

    // CDN连接 注入 public - html
    config.plugin('html').tap(args => {
      // 生产环境或本地需要cdn时，才注入cdn
      if (isProduction || DevOpenCDN) args[0].CDNConfig = CDNConfig
      return args
    })

    // 根据环境配置process.env
    config.plugin('define').tap(args => {
      // const envDevelopment = require('dotenv').config({ path: __dirname + '/.env.development' })
      // const envProduction = require('dotenv').config({ path: __dirname + '/.env.production' })
      // args[0]['process.env'] = isProduction ? envProduction.parsed : envDevelopment.parsed
      return args
    })

    // bundle-analyzer
    if (process.env.npm_config_report) {
      config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }

    // 将 css-loader 替换为 typings-for-css-modules-loader
    // eslint-disable-next-line no-extra-semi
    cssArray.forEach(rule => {
      // rules for *.module.* files
      config.module
        .rule(rule)
        .oneOf('normal-modules')
        .uses.get('css-loader')
        .set('loader', 'typings-for-css-modules-loader')
    })

    // 设置别名
    config.resolve.alias
      .set('@root', path.join(__dirname, './'))
      .set('@static', path.join(__dirname, './static'))
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('_c', resolve('src/components'))
      .set('_conf', resolve('config'))

    // 加载svg 模块 vue-svg-icon-loader
    // const svgRule = config.module.rule('svg')
    // svgRule.uses.clear()
    // svgRule
    //   .oneOf('inline')
    //   .resourceQuery(/inline/)
    //   .use('vue-svg-icon-loader')
    //   .loader('vue-svg-icon-loader')
    //   .end()
    //   .end()
    //   .oneOf('external')
    //   .use('file-loader')
    //   .loader('file-loader')
    //   .options({
    //     name: 'assets/[name].[hash:8].[ext]',
    //   })
  },
  css: {
    loaderOptions: {
      // css: {
      //   // name 导出
      //   namedExport: true,
      //   // 是否使用驼峰
      //   camelCase: true,
      //   // html 中 实际的 css 类名
      //   // localIdentName: process.env.NODE_ENV !== 'production' ? '[local]-[hash:base64:5]' : '[hash:base64:5]',
      // },
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': primary,
            // ...primaryColorObj,
            'info-color': primary,
            'processing-color': primary,
            'success-color': '#55D187', //  Success color
            'error-color': '#ED6F6F', //  False color
            'warning-color': '#EFBD47', //   Warning color
            'disabled-color': 'rgba(0, 0, 0, 0.25)', //  Failure color
            'heading-color': 'rgba(0, 0, 0, 0.85)', //  Title color
            'text-color': 'rgba(0, 0, 0, 0.85)', //  Main text color
            'text-color-secondary ': 'rgba(0, 0, 0, 0.45)', // Subtext color
            'font-size-base': '14px', //  Main font size
            'box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)', //  Floating shadow
            'border-color-base': '#d9d9d9', //  Border color,
            'border-radius-base': '2px', //  Component/float fillet
            'link-color': primary, //   Link color
            'text-color-help-dark': '#909399',
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/api/', // 开发环境地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  productionSourceMap: false,
  /**
   * webpack 配置参数
   */
  configureWebpack: config => {
    // 用cdn方式引入，则构建时要忽略相关资源
    if (isProduction || DevOpenCDN) config.externals = CDNConfig.externals

    // 生产环境相关配置
    if (isProduction) {
      // 公共代码抽离
      // config.optimization = {
      //   splitChunks: {
      //     cacheGroups: {
      //       vendor: {
      //         chunks: 'all',
      //         test: /node_modules/,
      //         name: 'vendor',
      //         minChunks: 1,
      //         maxInitialRequests: 5,
      //         minSize: 0,
      //         priority: 100,
      //       },
      //       common: {
      //         chunks: 'all',
      //         test: /[\\/]src[\\/]js[\\/]/,
      //         name: 'common',
      //         minChunks: 2,
      //         maxInitialRequests: 5,
      //         minSize: 0,
      //         priority: 60,
      //       },
      //       styles: {
      //         name: 'styles',
      //         test: /\.(sa|sc|c)ss$/,
      //         chunks: 'all',
      //         enforce: true,
      //       },
      //       runtimeChunk: {
      //         name: 'manifest',
      //       },
      //     },
      //   },
      // }

      // 代码压缩 2.2.0 版本，如果异常导入该版本
      // config.plugins.push(
      //   new UglifyJsPlugin({
      //     uglifyOptions: {
      //       // 生产环境自动删除console
      //       compress: {
      //         drop_debugger: true,
      //         drop_console: true,
      //         pure_funcs: ['console.log'],
      //       },
      //     },
      //     sourceMap: false,
      //     parallel: true,
      //   })
      // )

      // gzip压缩
      const productionGzipExtensions = ['html', 'js', 'css']
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.7, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false, // 删除原文件
        }),
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, './z-generate'), // 定义要拷贝的源目录，必填项
            to: `${config.output.path}/z-generate`, // 定义要拷贝到的目标目录，非必填，不填写则拷贝到打包的output输出地址中
          },
        ])
      )
    }
  },
}
