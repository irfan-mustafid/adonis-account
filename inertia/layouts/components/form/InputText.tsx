import { Input } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { NamePath } from 'antd/es/form/interface'
import { Rule } from 'antd/es/form'
import FormItem from 'antd/es/form/FormItem'
import React, { ReactNode } from 'react'
import { dataTest } from '~/lib/helpers'
import validate from '~/lib/validate'

interface InputTextProps<Values> {
  placeholder?: string
  label?: React.ReactNode
  name: NamePath<Values>
  rule?: Rule[]
  size?: SizeType
  testValue?: string | number
  initialValue?: unknown
  disabled?: boolean
  addonBefore?: ReactNode
  hidden?: boolean
  required?: boolean
  dataTestId?: string
  classNameItem?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  prefix?: ReactNode
}

const InputText = <Values extends object>(props: Readonly<InputTextProps<Values>>) => {
  const buildPlaceholder = () => {
    if (props.placeholder) {
      return props.placeholder
    }

    if (props.label && typeof props.label === 'string') {
      return props.label
    }

    return ''
  }

  const buildRules = () => {
    let rule: Rule[] = []
    if (props.required) {
      const label = typeof props.label === 'string' ? props.label : ''
      rule = [...rule, validate.required(label)]
    }

    if (props.rule !== undefined) {
      rule = [...rule, ...props.rule]
    }

    return rule
  }

  return (
    <FormItem<Values>
      initialValue={props.initialValue}
      label={props.label}
      name={props.name}
      rules={buildRules()}
      hidden={props.hidden}
      data-testid={props.dataTestId}
      className={`${props.disabled ? 'disabled' : ''} ${props.classNameItem}`}
    >
      <Input
        // addonBefore={props.addonBefore}
        prefix={props.prefix}
        disabled={props.disabled}
        onFocus={() => {
          dataTest(props.testValue)
        }}
        size={props.size ?? 'large'}
        placeholder={buildPlaceholder()}
        onChange={props.onChange}
      />
    </FormItem>
  )
}

export default InputText
