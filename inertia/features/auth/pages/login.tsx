import { Form } from 'antd'
import axios from 'axios'
import InputText from '~/layouts/components/form/InputText'
import { useRequest } from 'ahooks'
import InputPassword from '~/layouts/components/form/InputPassword'
import ButtonElem from '~/layouts/components/element/ButtonElem'
import { requestDefaultConfig } from '~/lib/helpers'
import { router } from '@inertiajs/react'
interface FormFild {
  username: string
  password: string
}
const Login = () => {
  const [form] = Form.useForm<FormFild>()

  const { run: handleSumbit } = useRequest(
    (value: FormFild) => {
      return axios.post('/login', value)
    },
    {
      ...requestDefaultConfig,
      onSuccess: () => {
        router.visit('/home')
      },
    }
  )

  return (
    <div className="form-container">
      <div>
        <h1> Login </h1>
        <p>Enter your details below to login to your account</p>
      </div>

      <div>
        <Form layout="vertical" form={form} onFinish={handleSumbit}>
          <InputText<FormFild> name="username" label="User Name" placeholder="User Name" required />
          <InputPassword<FormFild>
            name="password"
            label="Password"
            placeholder="Masukkan Password"
            required
          />
          <ButtonElem className="w-full" variant="primary" htmlType="submit">
            Login
          </ButtonElem>
        </Form>
      </div>
    </div>
  )
}

export default Login
