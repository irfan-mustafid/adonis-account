import { InputNumber as InputNumberAntd } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { Rule } from 'antd/es/form'
import { NamePath } from 'antd/es/form/interface'
import FormItem from 'antd/es/form/FormItem'
import React, { ReactNode } from 'react'
import { dataTest } from '~/lib/helpers'
import validate from '~/lib/validate'

interface InputNumberProps<Values> {
  placeholder?: string
  label?: React.ReactNode
  name: NamePath<Values>
  rule?: Rule[]
  size?: SizeType
  testValue?: string | number
  addonBefore?: ReactNode
  addonAfter?: ReactNode
  disabled?: boolean
  initialValue?: number
  required?: boolean
  dataTestId: string
}

const InputNumber = <Values extends object>(props: Readonly<InputNumberProps<Values>>) => {
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
      data-testid={props.dataTestId}
      label={props.label}
      name={props.name}
      rules={buildRules()}
      initialValue={props.initialValue}
      className={props.disabled ? 'disabled' : ''}
    >
      <InputNumberAntd
        disabled={props.disabled}
        // addonBefore={props.addonBefore} krn deprecated
        // addonAfter={props.addonAfter} krn deprecated
        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
        parser={(value) => value?.replace(/\./g, '').replace(/[^0-9]/g, '') as unknown as number}
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

export default InputNumber
