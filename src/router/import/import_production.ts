module.exports = (file: string) => () => import(`@/views/${file}`)

module.exports.initLayout = (file: string) => () => import(`@/layouts/${file}`)
