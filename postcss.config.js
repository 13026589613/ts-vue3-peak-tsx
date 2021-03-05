// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: {
    'postcss-import': {
      path: 'src/design',
    },
    // 'postcss-url': {},
    // to edit target browsers: use 'browserslist' field in package.json
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 75, // 结果为：设计稿元素尺寸/75，比如元素宽750px,最终页面会换算成 10rem
      propList: ['*'],
      selectorBlackList: [
        'html',
        'body',
        // 对css选择器进行过滤的数组
        // '.ant-',
        '.loading-',
        '.van-',
        '.vux-',
        '.weui-',
        '.scroller-',
        '.dp-',
        '.mt-',
        '.mint-',
      ],
      replace: true,
      mediaQuery: false,
      minPixelValue: 12, // 所有小于12px的样式都不被转换
    },
  },
}
