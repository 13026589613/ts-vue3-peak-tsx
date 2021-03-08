/**
import { type } from '../../router/libs/types';
 * @description 服务请求 Types enum 枚举常量
 */

// 错误提醒形式，跟UI组件对应
export enum PromptMessageType {
  MESSAGE = 'message',
  NOTIFY = 'notify',
  ALERT = 'alert',
}

// 提醒组件样式，与UI组件对应
export enum PromptStyleType {
  SUCCESS = 'success',
  INFO = 'info',
  WARING = 'warning',
  ERROR = 'error',
}

// Http 请求content-type -- ;charset=UTF-8
export enum ContentType {
  JSON_TYPE = 'application/json',
  FORM_TYPE = 'application/x-www-form-urlencoded',
  UPLOAD_TYPE = 'multipart/form-data',
  FILE_OUT_TYPE = 'application/octet-stream',
}
