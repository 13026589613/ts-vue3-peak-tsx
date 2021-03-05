interface ApiList {
  [key: string]: ListOptions
}

interface Apis<T> {
  [key: string]: (data: object) => Promise<T>
}

interface ModulesApiList {
  [key: string]: ApiList
}

interface ModuleApis<T> {
  [key: string]: Apis<T>
}

interface ListOptions {
  url: string
  method: string
  headers?: any
  baseUrl?: any
  openDefaultParams?: boolean
  contentType?: string
  listParams?: boolean
}

interface Options {
  data: any
  params?: any
  url: string
  method?: string
  headers?: any
  baseUrl?: any
  openDefaultParams?: boolean
  contentType?: string
  listParams?: boolean
}
