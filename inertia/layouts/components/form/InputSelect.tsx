import { Select } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { Rule } from 'antd/es/form'
import FormItem from 'antd/es/form/FormItem'
import { NamePath } from 'antd/es/form/interface'
import { DefaultOptionType, SelectProps } from 'antd/es/select'
import React from 'react'
import validate from '~/lib/validate'

interface InputSelectProps<Values> {
  className?: string
  placeholder?: string
  label?: React.ReactNode
  name: NamePath<Values>
  disabled?: boolean
  rule?: Rule[]
  allowClear?: boolean
  options?: DefaultOptionType[]
  size?: SizeType
  required?: boolean
  dataTestId?: string
  hidden?: boolean
  onChange?: (_value: unknown, _option: DefaultOptionType | DefaultOptionType[] | undefined) => void
  mode?: SelectProps['mode']
}

const InputSelect = <Values extends object>(props: InputSelectProps<Values>) => {
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
    <FormItem
      hidden={props.hidden}
      data-testid={props.dataTestId}
      className={props.disabled ? `disabled ${props.className}` : `${props.className}`}
      label={props.label}
      name={props.name}
      rules={buildRules()}
    >
      <Select
        disabled={props.disabled}
        size={props.size ?? 'large'}
        allowClear={props.allowClear ?? true}
        showSearch
        onChange={(value, option) => props.onChange?.(value, option)}
        placeholder={buildPlaceholder()}
        options={props.options}
        optionFilterProp="label"
        mode={props.mode}
      />
    </FormItem>
  )
}

export default InputSelect
