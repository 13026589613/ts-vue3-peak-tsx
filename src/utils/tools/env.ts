import { GlobEnvConfig } from '@/types/config'

export function getGlobEnvConfig(): GlobEnvConfig {
  const env = process.env
  return (env as unknown) as GlobEnvConfig
}

/**
 * @description: 开发模式
 */
export const devMode = 'development'

/**
 * @description: 生产模式
 */
export const prodMode = 'production'

/**
 * @description: 获取环境变量
 * @returns:
 * @example:
 */
export function getProcess(): string {
  return process.env.MODE
}

/**
 * @description: 是否是开发模式
 * @returns: true 开发环境 false 生产环境
 * @example:
 */
export function isDev(): boolean {
  return process.env.NODE_ENV === devMode
}

/**
 * @description: 是否是生产模式模式
 * @returns: false 开发环境  true 生产环境
 * @example:
 */
export function isProd(): boolean {
  return process.env.PROD
}

/**
 * @description: 是否开启mock
 * @returns:
 * @example:
 */
export function useMock(): boolean {
  // 是否启用mock 数据
  return process.env.VUE_APP_USE_MOCK === 'true' && process.env.NODE_ENV === 'development'
}
