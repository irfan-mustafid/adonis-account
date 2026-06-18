import { Form, Input } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { Rule } from 'antd/es/form'
import { ReactNode } from 'react'
import { dataTest } from '~/lib/helpers'
import validate from '~/lib/validate'

const { TextArea } = Input

interface InputTextAreaProps<Values> {
  label?: ReactNode
  name: NamePath<Values>
  placeholder?: string
  size?: SizeType
  rule?: Rule[]
  testValue?: string | number
  disabled?: boolean
  required?: boolean
  dataTestId: string
  rows?: number
  hidden?: boolean
}

const InputTextArea = <Values extends object>(props: InputTextAreaProps<Values>) => {
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
    <Form.Item
      label={props.label}
      rules={buildRules()}
      name={props.name}
      hidden={props.hidden}
      data-testid={props.dataTestId}
      className={props.disabled ? 'disabled' : ''}
    >
      <TextArea
        disabled={props.disabled}
        onFocus={() => {
          dataTest(props.testValue)
        }}
        size={props.size ?? 'large'}
        placeholder={buildPlaceholder()}
        rows={props.rows ?? 8}
      />
    </Form.Item>
  )
}

export default InputTextArea
