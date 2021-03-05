// module.exports = (file: string) => (resolve: any) => require([`@/views/${file}`], resolve)

// module.exports.initLayout = (file: string) => (resolve: any) => require([`@/layouts/${file}`], resolve)

module.exports = (file: string) => () => import(`@/views/${file}`)

module.exports.initLayout = (file: string) => () => import(`@/layouts/${file}`)
