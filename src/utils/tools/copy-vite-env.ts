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
export function getEnv(): string {
  return process.env.MODE
}

/**
 * @description: 是否是开发模式
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
  console.log(process.env)
  return process.env.DEV
}

/**
 * @description: 是否是生产模式模式
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
  return process.env.PROD
}

/**
 * @description: 是否开启mock
 * @returns:
 * @example:
 */
export function isUseMock(): boolean {
  return process.env.VITE_USE_MOCK === 'true'
}
