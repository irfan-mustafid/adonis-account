import { IconTrash, IconUpload } from '@tabler/icons-react'
import { Button, Form, Space, Spin, Upload } from 'antd'
import { RcFile } from 'antd/es/upload'
import { NamePath } from 'antd/es/form/interface'
import axios from 'axios'
import { Rule } from 'antd/es/form'
import { ReactNode, useEffect, useState } from 'react'
import { errorModalMessage } from '~/lib/helpers'
import { File } from '../../models/File'

type AcceptFile =
  | '.pdf'
  | '.doc'
  | '.docx'
  | '.xls'
  | '.xlsx'
  | '.ppt'
  | '.pptx'
  | '.txt'
  | '.csv'
  | '.jpg'
  | '.jpeg'
  | '.png'
  | '.gif'
  | '.bmp'
  | '.svg'
  | '.tiff'
  | '.webp'

interface Payload {
  t_reference: string
  reference_id?: number
}

interface InputUploadProps<Values> {
  itemClassName?: string
  name: NamePath<Values>
  label?: ReactNode
  accept?: AcceptFile[]
  value?: File
  payload: Payload
  type?: 'image' | 'default'
  required?: boolean
  onSuccessDelete?: () => void
  rule?: Rule[]
  disableButton?: boolean
  dataTestId: string
}

const imageType = '.jpg,.jpeg,.png,.gif,.bmp,.svg'
const defaultType = `.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,${imageType}`

/**
 * @deprecated Gunakan UploadHelper Sebagai Pengganti
 */
const InputUpload = <Values extends object>(props: InputUploadProps<Values>) => {
  const {
    name,
    label,
    accept,
    type,
    payload,
    required,
    value,
    onSuccessDelete,
    rule,
    disableButton,
    itemClassName,
  } = props
  const form = Form.useFormInstance()
  const [file, setFile] = useState<File>()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const buildAccept = () => {
    if (type === 'image') {
      return imageType
    }

    if (type === 'default') {
      return defaultType
    }

    return accept?.join(',')
  }

  const handleUpload = (val: RcFile) => {
    setIsLoading(true)
    axios
      .postForm(`/file`, {
        file: val,
        t_reference: payload.t_reference,
        reference_id: payload.reference_id,
      })
      .then((res) => {
        form.setFieldValue(name, res.data)
        setFile(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        errorModalMessage(err)
      })
  }

  const handleDelete = () => {
    setIsLoading(true)
    axios
      .delete(`/file/${file?.id}`)
      .then(() => {
        setFile(undefined)
        form.setFieldValue(name, undefined)
        setIsLoading(false)
        onSuccessDelete?.()
      })
      .catch((err) => {
        setIsLoading(false)
        errorModalMessage(err)
      })
  }

  useEffect(() => {
    form.setFieldValue(name, value)
    setFile(value)
  }, [value?.path])

  return (
    <Spin spinning={isLoading}>
      <Space data-testid="Izv4G">
        <Form.Item
          name={name}
          className={itemClassName}
          label={label}
          rules={rule}
          required={required}
        >
          <div data-testid={props.dataTestId}>
            <Upload
              disabled={file?.path !== undefined}
              accept={buildAccept()}
              maxCount={1}
              showUploadList={false}
              beforeUpload={(val) => {
                handleUpload(val)
                return false
              }}
            >
              {file?.path ? (
                <Space data-testid="K9fT3">
                  <a
                    data-testid="G6um0"
                    href={`/file?path=${file?.path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {file?.client_filename}
                  </a>
                  <IconTrash
                    onClick={() => handleDelete()}
                    className="cursor-pointer"
                    size={15}
                    color="red"
                  />
                </Space>
              ) : (
                <Button disabled={disableButton} data-testid="YLfme">
                  <IconUpload size={15} /> Upload Max 50Mb
                </Button>
              )}
            </Upload>
          </div>
        </Form.Item>
      </Space>
    </Spin>
  )
}

export default InputUpload
