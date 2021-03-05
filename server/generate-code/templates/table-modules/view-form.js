/**
 * @description 生产表单
 * @author PP
 */
const utils = require('../../common/utils')
const disabledString = "disabled={this.operateType === 'see'}"
let handelFunctionArray = []

exports.template = (tableEntity, operateConstructor) => {
  handelFunctionArray = []
  const formColumnsArray = utils.reduceConstructor(utils.objectToArrayObject(operateConstructor, 'formColumnsArray'))
  const renderFormItemColumns = renderFormItem(formColumnsArray)

  return `import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { FormEntity, FormValidateRule, FormItemLayout } from './table-from-config'
import { ${tableEntity.upperTableName}Entity } from '@/interface/${tableEntity.tableName}.interface.ts'
@Component({
  props: {
    Form: antd.Form,
  },
})
class ${tableEntity.upperTableName}InfoModal extends Vue {
  @Prop() title!: string // 弹窗标题

  @Prop() visible!: boolean // 是否可操作

  @Prop() operateType!: string // 操作类型 insert | update | see

  @Prop() operateData!: any // 操作对象

  @Prop() operateAPI!: any // 响应API对象

  formEntity: ${tableEntity.upperTableName}Entity = FormEntity(this)

  created() {
    this.initFormEntity()
  }

  @Watch('visible')
  watchVisible() {
    if (this.visible) {
      this.initFormEntity()
    }
  }

  render() {
    const { getFieldDecorator } = this.Form
    return (
      <a-form>
        <a-row gutter={20}>
          ${renderFormItemColumns}
        </a-row>

        <div class="form-btn-wrapper">
          {this.operateType !== 'see' ? (
            <a-button on-click={this.handleCommitInfo} type="primary" class="btn-form-submit" title="">
              保存
            </a-button>
          ) : null}

          {this.operateType !== 'see' ? (
            <a-button on-click={this.handelResetOperate} type="danger" class="btn-form-reset" title="">
              重置
            </a-button>
          ) : null}

          <a-button on-click={this.handelCancelOperate} type="danger" class="btn-form-cancel" title="">
            {this.operateType === 'see' ? '关闭' : '取消'}
          </a-button>
        </div>
      </a-form>
    )
  }

  /**
   * @description 初始化赋值 FormEntity
   */
  initFormEntity() {
    // 处理表单结构
    this.handelResetOperate()

    if (JSON.stringify(this.operateData) !== '{}') {
      this.formEntity = { ...this.operateData }
      ${renderSpecialColumns(formColumnsArray)}
    }
  }

  /**
   * @description 提交表单信息, 表单中
   *              this.Form.validateFields([], {}, (err: any, values: any))
   */
  handleCommitInfo() {
    ${renderSubmitTransDataEntity(formColumnsArray)}
    this.Form.validateFields((err: any, values: any) => {
      if (!err) {
        // 保存对象重制
        const infoData = {
          ...values,
          ${tableEntity.pk.lowerColumnName}: this.formEntity.${tableEntity.pk.lowerColumnName},
        }

        this.$Api
          ._request({
            url: this.operateAPI.url,
            method: this.operateAPI.method,
            contentType: this.operateAPI.contentType,
            headers: this.operateAPI.headers,
            data: { ...infoData },
          })
          .then((res: any) => {
            // const {
            //   result: { resultCode, resultMessage },
            // } = res.data
            if (res.code === window.CROSS_CODE) {
              this.$AntMessage.success('成功保存信息')
              // this.Form.resetFields()
              this.$emit('success', {
                operateType: this.operateType,
                res,
              })
            } else {
              this.$AntMessage.error(res.message || '操作失败，请联系管理人员')
            }
          })
      }
    })
  }

  /**
   * @description 提交表单信息
   */
  handelCancelOperate() {
    // this.handelResetOperate()
    this.$emit('close')
  }

  /**
   * @description 重置表单信息
   */
  handelResetOperate() {
    this.Form.resetFields()
    this.formEntity = FormEntity(this)
  }

  ${renderItemsHandel()}
}

export default antd.Form.create({
  props: {
    title: String,
    visible: Boolean,
    operateType: String,
    operateData: Object,
    operateAPI: Object,
  },
})(${tableEntity.upperTableName}InfoModal)`
}

/**
 * 渲染组件的事件
 */
function renderItemsHandel() {
  let renderHandel = ''
  handelFunctionArray.map(item => {
    renderHandel += item
  })
  return renderHandel
}

/**
 * 根据form对象类型解析重构 -> 生产对应类型的组件
 * @param {*} tableEntity
 */
function renderFormItem(formColumnsArray) {
  let renderColumns = ''

  // formColumnsArray 勾选列生效 columnsArray 全部字段列
  formColumnsArray.map((item, index) => {
    // 判断 columns 的数据库具体类型值，如（string -> varchar data组件 -> datatime 根据界面配置的属性分配对应组件, 根据 operateType 对应系统枚举设定）
    renderColumns += `
      <a-col { ...{ props: FormItemLayout.${item.lowerColumnName} }}>
        <a-form-item label="${item.columnComment}">
          {getFieldDecorator(
            '${item.lowerColumnName}',
            FormValidateRule.${item.lowerColumnName}(this)
          )(${renderFormType(item)})}
        </a-form-item>
      </a-col>\n`
  })
  return renderColumns
}

/**
 * 根据类型配置表单输出组件
 * @param {*} operateType
 * @param {*} item
 */
function renderFormType(item) {
  let renderForm = ''
  switch (item.operateType) {
    case 'Input':
      renderForm = `<a-input placeholder="请选择${item.columnComment}" ${disabledString} />`
      break
    case 'InputNumber':
      renderForm = `<a-input-number placeholder="请选择${item.columnComment}" step={0.1} style={{ width: '100%' }} ${disabledString} />`
      break
    case 'Radio':
      renderForm = `
        <a-radio-group
          ${disabledString}
          placeholder="请选择${item.columnComment}"
          style={{ width: '100%' }}
          on-change={this.handelRadioChange${item.upperColumnName}}>
          <a-radio style={{}} value={true}>选中项</a-radio>
          <a-radio style={{}} value={false}>测试项</a-radio>
        </a-radio-group>`

      // 绑定「值变更」事件
      handelFunctionArray.push(`
        /**
         * @description 「字段 ${item.lowerColumnName}」 - ${item.columnComment} - 日期选择器「值变更」
         * @param value moment 格式 this.$moment(value).format(xxxx) 转换
         * @param dateString
         */
        handelRadioChange${item.upperColumnName}(e: any) {
          console.log(e.target.value)
        }
      `)
      break
    case 'CheckBox':
      renderForm = `
        <a-checkbox-group
          ${disabledString}
          style={{ width: '100%' }}
          placeholder="请选择${item.columnComment}"
          on-change={this.handleCKBoxChange${item.upperColumnName}}>
          <a-row>
            <a-col span={8}>
              <a-checkbox value="A">A</a-checkbox>
            </a-col>
            <a-col span={8}>
              <a-checkbox disabled value="B">B</a-checkbox>
            </a-col>
            <a-col span={8}>
              <a-checkbox value="C">C</a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>`

      // 绑定「值变更」事件
      handelFunctionArray.push(`
        /**
         * @description 「字段 ${item.lowerColumnName}」 - ${item.columnComment} - CheckBox「值变更」
         * @param value moment 格式 this.$moment(value).format(xxxx) 转换
         * @param dateString
         */
        handleCKBoxChange${item.upperColumnName}(value: any) {
          console.log(value)
        }
      `)
      break
    case 'DatePicker':
      renderForm = `
        <a-date-picker
          ${disabledString}
          format="YYYY-MM-DD hh:mm:ss"
          style="width: 100%"
          defaultValue={this.$moment(new Date(), 'YYYY-MM-DD hh:mm:ss')}
          showTime={true}
          placeholder="请选择${item.columnComment}"
          on-change={this.handleDateChange${item.upperColumnName}}
          on-ok={this.handleDateOk${item.upperColumnName}}
        />`

      // 绑定「值变更」事件
      handelFunctionArray.push(`
        /**
         * @description 「字段 ${item.lowerColumnName}」 - ${item.columnComment} - DatePicker 日期选择器「值变更」
         * @param value moment 格式 this.$moment(value).format(xxxx) 转换
         * @param dateString
         */
        handleDateChange${item.upperColumnName}(value: any, dateString: string) {
          console.log(value)
          console.log(dateString)
          this.formEntity.${item.lowerColumnName} = value
        }
      `)

      // 绑定「值确认」事件
      handelFunctionArray.push(`
        /**
         * @description 「字段 ${item.lowerColumnName}」 - ${item.columnComment} - DatePicker 日期选择器「确认值」
         * @param value moment 格式 this.$moment(value).format(xxxx) 转换
         */
        handleDateOk${item.upperColumnName}(value: any) {
          console.log(value)
        }
      `)
      break
    case 'RangePicker':
      renderForm = `
        <a-range-picker
          ${disabledString}
          style="width: 100%"
          format="YYYY-MM-DD"
          showTime={{format: 'HH:mm'}}
          placeholder={['开始时间', '结束时间']}
          on-change={this.handleRangeChange${item.upperColumnName}}
          on-ok={this.handleRangeOk${item.upperColumnName}}
        />`

      // 绑定「值变更」事件
      handelFunctionArray.push(`
        /**
         * @description 「字段 ${item.lowerColumnName}」 - ${item.columnComment} - RangePicker 日期选择器「值变更」
         * @param dates moment 格式数组 this.$moment(value).format(xxxx) 转换
         * @param dateStrings String[]
         */
        handleRangeChange${item.upperColumnName}(dates: any, dateStrings: String[]) {
          console.log('from: ', dates[0], ', to: ', dates[1]);
          console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
          // this.formEntity.${item.lowerColumnName} = value
        }
      `)

      // 绑定「值确认」事件
      handelFunctionArray.push(`
        /**
         * @description 「字段 ${item.lowerColumnName}」 - ${item.columnComment} - RangePicker 日期选择器「确认值」
         * @param dates moment 格式数组 this.$moment(value).format(xxxx) 转换
         */
        handleRangeOk${item.upperColumnName}(dates: any) {
          console.log('from: ', dates[0], ', to: ', dates[1]);
        }
      `)
      break
    case 'Cascader':
      renderForm = `
        <a-cascader allowClear style={{ width: '100%' }}
          options={[
            {
              value: '1',
              label: '父亲',
              children: [
                {
                  value: '11',
                  label: '儿子',
                  children: [
                    {
                      value: '111',
                      label: '孙子',
                    },
                  ],
                },
              ],
            }]}
          ${disabledString}
          placeholder="请选择${item.columnComment}"
          showSearch={this.handleCascaderFilter${item.upperColumnName}}
          on-change={this.handleCascaderChange${item.upperColumnName}} />`

      // 绑定「值变更」事件
      handelFunctionArray.push(`
        /**
         * @description 「字段 ${item.lowerColumnName}」 - ${item.columnComment} - cascader 选择器「值变更」
         * @param value string 选中值
         * @param selectedOptions Option/Array<Option> 配置项
         */
        handleCascaderChange${item.upperColumnName}(value: string, selectedOptions: any) {
          console.log(value)
          console.log(selectedOptions)
          // this.formEntity.${item.lowerColumnName} = value
          // 如果需要远程获取数据解开
          // this.handleInit${item.upperColumnName}Fetch(value, data: any => (this.data = data))
        }
      `)

      // 绑定「过滤筛选」事件
      handelFunctionArray.push(`
        /**
         * @description 「字段 ${item.lowerColumnName}」 - ${item.columnComment} - cascader 选择器「过滤筛选」
         * @param value string 选中值
         * @param option Option/Array<Option> 配置项
         */
        handleCascaderFilter${item.upperColumnName}(inputValue: string, path: any) {
          return path.some(
            (option: any) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
          )
        }
      `)
      break
    case 'MultipleSelect':
      renderForm = `
        <a-select
          ${disabledString}
          mode='multiple'
          allowClear={true}
          size='default'
          placeholder='请选择${item.columnComment}'
          on-change={this.handleSelectChange${item.upperColumnName}}
          on-search={this.handleSelectSearch${item.upperColumnName}}
          on-select={this.handleSelectChoose${item.upperColumnName}}
          on-popupScroll={() => {}}
          on-dropdownVisibleChange={() => {}}
          notFoundContent={'未查询到相关数据'}
        >
          {[{ label: 'label', value: 'label' }].map(item => <a-select-option key={item.value}>{item.label}</a-select-option>)}
        </a-select>`

      // 绑定「Select选中事件」事件
      handelFunctionArray.push(`
        /**
         * @description 「字段 ${item.lowerColumnName}」 - ${item.columnComment} - MultipleSelect选择器「Select选中事件」
         * @param value string -> 选中值
         * @param callBack Function
         */
        handleSelectChoose${item.upperColumnName}(value: string, option: any) {
          console.log(value)
          console.log(option)
        }
      `)

      // 绑定「远程加载过滤数据」事件
      handelFunctionArray.push(`
        /**
         * @description 「字段 ${item.lowerColumnName}」 - ${item.columnComment} - MultipleSelect选择器「远程过滤」
         * @param value string -> 过滤的值
         * @param callBack Function
         */
        handleInit${item.upperColumnName}Fetch(value: string, callBack: any) {

        }
      `)

      // 绑定「Search过滤输入变更」事件
      handelFunctionArray.push(`
        /**
         * @description 「字段 ${item.lowerColumnName}」 - ${item.columnComment} - MultipleSelect选择器「Search过滤输入变更」
         * @param value string 过滤值
         */
        handleSelectSearch${item.upperColumnName}(value: string) {
          console.log(value)
          // 如果需要远程获取数据，获取数据后绑定数据至当前Select的Data，this.data 进行更换
          // this.handleInit${item.upperColumnName}Fetch(value, data: any => (this.data = data))
        }
      `)

      // 绑定「值变更」事件
      handelFunctionArray.push(`
        /**
         * @description 「字段 ${item.lowerColumnName}」 - ${item.columnComment} - MultipleSelect选择器「值变更」
         * @param value string 选中值
         * @param option Option/Array<Option> 配置项
         */
        handleSelectChange${item.upperColumnName}(value: string, option: any) {
          console.log(value)
          console.log(option)
          // this.formEntity.${item.lowerColumnName} = value
          // 如果需要远程获取数据解开
          // this.handleInit${item.upperColumnName}Fetch(value, data: any => (this.data = data))
        }
      `)
      break
    case 'SingleSelect':
      renderForm = `
        <a-select
          ${disabledString}
          showSearch
          allowClear={true}
          size='default'
          placeholder='请选择${item.columnComment}'
          on-change={this.handleSelectChange${item.upperColumnName}}
          on-search={this.handleSelectSearch${item.upperColumnName}}
          on-select={this.handleSelectChoose${item.upperColumnName}}
          on-popupScroll={() => {}}
          on-dropdownVisibleChange={() => {}}
          notFoundContent={'未查询到相关数据'}
        >
          {[{ label: 'label', value: 'label' }].map(item => <a-select-option key={item.value}>{item.label}</a-select-option>)}
        </a-select>`

      // 绑定「Select选中事件」事件
      handelFunctionArray.push(`
        /**
         * @description 「字段 ${item.lowerColumnName}」 - ${item.columnComment} - SingleSelect选择器「Select选中事件」
         * @param value string -> 选中值
         * @param callBack Function
         */
        handleSelectChoose${item.upperColumnName}(value: string, option: any) {
          console.log(value)
          console.log(option)
        }
      `)

      // 绑定「远程加载过滤数据」事件
      handelFunctionArray.push(`
        /**
         * @description 「字段 ${item.lowerColumnName}」 - ${item.columnComment} - SingleSelect选择器「远程过滤」
         * @param value string 过滤值
         * @param option Option/Array<Option> 配置项
         */
        handleInit${item.upperColumnName}Fetch(value: string, callBack: any) {

        }
      `)

      // 绑定「Search过滤输入变更」事件
      handelFunctionArray.push(`
        /**
         * @description 「字段 ${item.lowerColumnName}」 - ${item.columnComment} - SingleSelect选择器「Search过滤输入变更」
         * @param value string 过滤值
         */
        handleSelectSearch${item.upperColumnName}(value: string) {
          console.log(value)
          // 如果需要远程获取数据，获取数据后绑定数据至当前Select的Data，this.data 进行更换
          // this.handleInit${item.upperColumnName}Fetch(value, data: any => (this.data = data))
        }
      `)

      // 绑定「值变更」事件
      handelFunctionArray.push(`
        /**
         * @description 「字段 ${item.lowerColumnName}」 - ${item.columnComment} - SingleSelect选择器「值变更」
         * @param value string 选中值
         * @param option Option/Array<Option> 配置项
         */
        handleSelectChange${item.upperColumnName}(value: string, option: any) {
          console.log(value)
          console.log(option)
          // this.formEntity.${item.lowerColumnName} = value
          // 如果需要远程获取数据解开
          // this.handleInit${item.upperColumnName}Fetch(value, data: any => (this.data = data))
        }
      `)
      break
    case 'TimePicker':
      renderForm = `
        <a-time-picker
          ${disabledString}
          placeholder="请选择${item.columnComment}"
          minuteStep={15}
          secondStep={10}
          style={{ width: '100%' }}
          on-change={this.handleTimeChange${item.upperColumnName}}/>`

      // 绑定「值变更」事件
      handelFunctionArray.push(`
        /**
         * @description 「字段 ${item.lowerColumnName}」 - ${item.columnComment} - TimePicker选择器「值变更」
         * @param value moment 格式 this.$moment(value).format(xxxx) 转换
         * @param dateString
         */
        handleTimeChange${item.upperColumnName}(value: any, dateString: string) {
          console.log(value)
          console.log(dateString)
          // this.formEntity.${item.lowerColumnName} = value
        }
      `)
      break
    case 'Slider':
      renderForm = `
        <a-slider
          ${disabledString}
          placeholder="请选择${item.columnComment}"
          marks={{ 0: 'A', 20: 'B', 40: 'C', 60: 'D', 80: 'E', 100: 'F' }}
          on-afterChange={(value: any) => {}}
          on-change={(value: any) => {}} />`
      break
    case 'Switch':
      renderForm = `
        <a-switch
          loading
          placeholder="请选择${item.columnComment}"
          checkedChildren="开"
          unCheckedChildren="关"
          on-change={this.handleSwitchChange${item.upperColumnName}}
          on-click={(checked: Boolean, event: any) => {}} />
      `
      // 绑定「值变更」事件
      handelFunctionArray.push(`
        /**
         * @description 「字段 ${item.lowerColumnName}」 - ${item.columnComment} - Switch 选择器「值变更」
         * @param checked Boolean 是否选中
         * @param event Function
         */
        handleSwitchChange${item.upperColumnName}(checked: Boolean, event: any) {
          console.log(checked)
          // this.formEntity.${item.lowerColumnName} = checked
        }
      `)
      break
    case 'Rate':
      renderForm = `
        <a-rate
          ${disabledString}
          allow-half
          defaultValue={5}
          count={10}>
          <a-icon slot="character" type="heart"
          on-change={this.handleRateChange${item.upperColumnName}}
          on-keydown={(e: any) => {}}/>
        </a-rate>
      `

      // 绑定「值变更」事件
      handelFunctionArray.push(`
        /**
         * @description 「字段 ${item.lowerColumnName}」 - ${item.columnComment} - Rate 选择器「值变更」
         * @param value number 选中的值数
         * @param dateString
         */
        handleRateChange${item.upperColumnName}(value: number) {
          console.log(value)
          // this.formEntity.${item.lowerColumnName} = value
        }
      `)
      break
    case 'RadioButton':
      renderForm = `
        <a-radio-group
          buttonStyle="solid"
          placeholder="请选择${item.columnComment}"
          on-change={this.handelRadioChange${item.upperColumnName}}>
          <a-radio-button style={{}} value={true}>测试一</a-radio-button>
          <a-radio-button style={{}} value={false}>测试二</a-radio-button>
        </a-radio-group>`

      // 绑定「值变更」事件
      handelFunctionArray.push(`
        /**
         * @description 「字段 ${item.lowerColumnName}」 - ${item.columnComment} - 日期选择器「值变更」
         * @param value moment 格式 this.$moment(value).format(xxxx) 转换
         * @param dateString
         */
        handelRadioChange${item.upperColumnName}(e: any) {
          console.log(e.target.value)
        }
      `)
      break
    case 'TextArea':
      renderForm = `
        <a-textarea
         ${disabledString}
         placeholder="请选择${item.columnComment}"
         style={{ width: '100%', height: '100px' }}
         on-keypress={this.handleTextKeyPress${item.upperColumnName}}
        />`

      // 绑定「keypress」事件
      handelFunctionArray.push(`
        /**
         * @description 「字段 ${item.lowerColumnName}」 - ${item.columnComment} - 文本域「keypress」事件
         * @param value KeyboardEvent
         */
        handleTextKeyPress${item.upperColumnName}(value: any) {
          console.log(value)
        }
      `)
      break
    case 'Upload': // 上传组件
      renderForm = `<Upload vModel={this.formEntity.${item.lowerColumnName}} ${disabledString} />`
      break
    case 'DraggerUpload': // 拖拽上传组件
      renderForm = `<DraggerUpload vModel={this.formEntity.${item.lowerColumnName}} ${disabledString} />`
      break
    case 'Editor': // 富文本编辑器
      renderForm = `<Editor vModel={this.formEntity.${item.lowerColumnName}} ${disabledString} />`
      break
    default:
      renderForm = `<a-input placeholder="请填写${item.columnComment}" ${disabledString} />`
      break
  }
  return renderForm
}

/**
 * @description 渲染时间对象的转换
 * @param {*} tableEntity
 */
function renderSpecialColumns(formColumnsArray) {
  let renderColumns = ''
  formColumnsArray.map(item => {
    if (item.attrType === 'Date[]' || item.attrType === 'Date') {
      renderColumns += `this.formEntity.${item.lowerColumnName} = this.$moment(new Date(this.$tools.date.formateTZDateToDate(this.operateData.${item.lowerColumnName})))\n`
    }
  })
  return renderColumns
}

/**
 * @description 提交表单时间格式Entity属性转换
 * @param {*} tableEntity
 */
function renderSubmitTransDataEntity(formColumnsArray) {
  let renderColumns = ''
  formColumnsArray.map(item => {
    if (item.attrType === 'Date[]' || item.attrType === 'Date') {
      renderColumns += `this.formEntity.${item.lowerColumnName} = this.$moment(this.formEntity.${item.lowerColumnName}).format(\'YYYY-MM-DD HH:mm:ss\')\n`
    }
  })
  return renderColumns
}
