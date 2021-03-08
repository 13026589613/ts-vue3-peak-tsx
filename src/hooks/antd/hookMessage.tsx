import { Modal, message as Message, notification as Notification } from 'ant-design-vue'
import type { ModalFunc, ModalFuncProps } from 'ant-design-vue/lib/modal/Modal'
import { ArgsProps, ConfigProps } from 'ant-design-vue/lib/notification'

// Icon 组件
import { InfoCircleFilled, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons-vue'

// 定义 NotifyApi
export interface NotifyApi {
  info(config: ArgsProps): void
  success(config: ArgsProps): void
  error(config: ArgsProps): void
  warn(config: ArgsProps): void
  warning(config: ArgsProps): void
  open(args: ArgsProps): void
  close(key: String): void
  config(options: ConfigProps): void
  destroy(): void
}

// 定义 ConfirmOptions
interface ConfirmOptions {
  info: ModalFunc
  success: ModalFunc
  error: ModalFunc
  warn: ModalFunc
  warning: ModalFunc
}

// 声明 notification 提醒框显示位置
export declare type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'

// 声明提醒 样式Icon 类型
export declare type IconType = 'success' | 'info' | 'error' | 'warning'

// 声明 Modal 弹层 样式类型
export interface ModalOptionsEx extends Omit<ModalFuncProps, 'iconType'> {
  iconType: 'warning' | 'success' | 'error' | 'info'
}

// 声明 Modal options 类型
export type ModalOptionsPartial = Partial<ModalOptionsEx> & Pick<ModalOptionsEx, 'content'>

// icon 提醒样式 tsx
function getIcon(iconType: string) {
  if (iconType === 'warning') {
    return <InfoCircleFilled class='modal-icon-warning' />
  } else if (iconType === 'success') {
    return <CheckCircleFilled class='modal-icon-success' />
  } else if (iconType === 'info') {
    return <InfoCircleFilled class='modal-icon-info' />
  } else {
    return <CloseCircleFilled class='modal-icon-error' />
  }
}

/**
 * @description: 创建 Confirm
 */
function hookConfirm(options: ModalOptionsEx): ConfirmOptions {
  const iconType = options.iconType || 'warning'
  Reflect.deleteProperty(options, 'iconType')
  const opt: ModalFuncProps = {
    centered: true,
    icon: getIcon(iconType),
    ...options,
  }
  return (Modal.confirm(opt) as unknown) as ConfirmOptions
}

/**
 * 创建 Modal 参数，为Modal提供必要条件
 * @param options
 * @param icon
 */
function hookModalOptions(options: ModalOptionsPartial, icon: string): ModalOptionsPartial {
  const baseOptions = {
    okText: '确定',
    centered: true,
  }

  return {
    ...baseOptions,
    ...options,
    content: <div innerHTML={`<div>${options as string}</div>`}></div>,
    icon: getIcon(icon),
  }
}

// modal-success
function hookSuccessModal(options: ModalOptionsPartial) {
  return Modal.success(hookModalOptions(options, 'success'))
}

// modal-error
function hookErrorModal(options: ModalOptionsPartial) {
  return Modal.error(hookModalOptions(options, 'close'))
}

// modal-info
function hookInfoModal(options: ModalOptionsPartial) {
  return Modal.info(hookModalOptions(options, 'info'))
}

// modal-warning
function hookWarningModal(options: ModalOptionsPartial) {
  return Modal.warning(hookModalOptions(options, 'warning'))
}

/**
 * @description 全局配置 Notification 参数
 */
Notification.config({
  placement: 'topRight',
  duration: 3,
})

/**
 * @description: message
 */
export function hookMessage() {
  return {
    Message: Message,
    Notification: Notification as NotifyApi, // 采用原生
    hookConfirm,
    hookSuccessModal,
    hookErrorModal,
    hookInfoModal,
    hookWarningModal,
  }
}
