import { Input } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import FormItem from 'antd/es/form/FormItem'

interface InputHiddenProps<Values> {
  name: NamePath<Values>
}

const InputHidden = <Values extends object>(props: Readonly<InputHiddenProps<Values>>) => {
  return (
    <FormItem<Values> name={props.name} hidden noStyle>
      <Input />
    </FormItem>
  )
}

export default InputHidden
