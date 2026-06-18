import { DatePicker } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { Rule } from 'antd/es/form'
import FormItem from 'antd/es/form/FormItem'
import React from 'react'
import { dataTest } from '~/lib/helpers'
import validate from '~/lib/validate'

interface InputDateProps<Values> {
  placeholder?: string
  label?: React.ReactNode
  name: NamePath<Values>
  disabled?: boolean
  rule?: Rule[]
  size?: SizeType
  testValue?: string | number
  required?: boolean
  dataTestId: string
  format: 'DD MMMM YYYY' | 'YYYY'
}

const InputDate = <Values extends object>(props: Readonly<InputDateProps<Values>>) => {
  const { format = 'DD MMMM YYYY' } = props

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
      label={props.label}
      name={props.name}
      rules={buildRules()}
      data-testid={props.dataTestId}
      className={props.disabled ? 'disabled' : ''}
    >
      <DatePicker
        disabled={props.disabled}
        format={format}
        className="w-full"
        onFocus={() => {
          dataTest(props.testValue)
        }}
        size={props.size ?? 'large'}
        placeholder={buildPlaceholder()}
      />
    </FormItem>
  )
}

export default InputDate
