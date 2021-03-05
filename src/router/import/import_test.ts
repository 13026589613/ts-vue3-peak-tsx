module.exports = (file: string) => (resolve: any) => require([`@/views/${file}`], resolve)
