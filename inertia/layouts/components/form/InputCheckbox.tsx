import { Checkbox, Form } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import { ReactNode } from 'react'

interface InputCheckboxProps<Values> {
  name: NamePath<Values>
  label: ReactNode
  message?: string
  disabled?: boolean
}

const InputCheckbox = <Values extends object>(props: InputCheckboxProps<Values>) => {
  const { name, label, message, disabled } = props
  return (
    <Form.Item<Values>
      name={name}
      valuePropName="checked"
      required
      className="mb-0"
      rules={[
        {
          validator: async (_, checked) => {
            if (!checked) {
              return Promise.reject(new Error(message))
            }
            return false
          },
        },
      ]}
    >
      <Checkbox disabled={disabled}>
        <div className="text-[#5e5d5c]">{label}</div>
      </Checkbox>
    </Form.Item>
  )
}

export default InputCheckbox
