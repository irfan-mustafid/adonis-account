import { Upload } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import { Rule } from 'antd/es/form'
import { UploadOutlined } from '@ant-design/icons'
import FormItem from 'antd/es/form/FormItem'
import React from 'react'
import validate from '~/lib/validate'

interface InputUploadFileV2Props<Values> {
  label?: React.ReactNode
  name: NamePath<Values>
  rule?: Rule[]
  initialValue?: unknown
  disabled?: boolean
  hidden?: boolean
  required?: boolean
  dataTestId: string
  classNameItem?: string
  accept?: string
  textHelp?: string
}

const InputUploadFileV2 = <Values extends object>(
  props: Readonly<InputUploadFileV2Props<Values>>
) => {
  const {
    dataTestId,
    name,
    classNameItem,
    disabled,
    hidden,
    initialValue,
    label,
    required,
    rule,
    accept,
    textHelp,
  } = props

  const buildRules = () => {
    let rules: Rule[] = []
    if (required) {
      const labelD = typeof label === 'string' ? label : ''
      rules = [...rules, validate.required(labelD)]
    }

    if (rule !== undefined) {
      rules = [...rules, ...rule]
    }

    return rules
  }

  return (
    <FormItem<Values>
      initialValue={initialValue}
      label={label}
      name={name}
      rules={buildRules()}
      hidden={hidden}
      data-testid={dataTestId}
      className={`${disabled ? 'disabled' : ''} ${classNameItem}`}
      valuePropName="fileList"
      getValueFromEvent={(e) => (Array.isArray(e?.fileList) ? e.fileList : [])}
    >
      <Upload.Dragger maxCount={1} beforeUpload={() => false} accept={accept}>
        <div className="flex !justify-center gap-2">
          <UploadOutlined />
          <div>Click or drag file to this area to upload</div>
        </div>
        <div className="text-gray-400 text-xs">
          {textHelp ?? 'Maks: 5MB (Format: .pdf, .doc, .docx, .xls, .xlsx, .jpg, .png)'}
        </div>
      </Upload.Dragger>
    </FormItem>
  )
}

export default InputUploadFileV2
