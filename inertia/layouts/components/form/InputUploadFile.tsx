import { Form, Popconfirm, Space, Spin, Typography } from 'antd'
import { ReactNode, useEffect, useState } from 'react'
import { IconTrash, IconUpload } from '@tabler/icons-react'
import { Rule } from 'antd/es/form'
import axios from 'axios'
import { NamePath } from 'antd/es/form/interface'
import UploadHelper, { Payload } from '../tools/UploadHelper'
import { File } from '../../models/File'
import { baseUrlFile, dateTimeIndo, errorModalMessage, isAnyTrue } from '~/lib/helpers'
import FileIcon from '../display/FileIcon'

interface UploadFileSupportProps {
  textInfo?: string | ReactNode
  dataTestId: string
  payload: Payload
  initialFile?: File
  softDelete?: boolean
  onChange?: (_file: File | undefined) => void
  value?: File
  allowClear?: boolean
  showUpload?: boolean
  onShowFile?: (_file: File | undefined) => void
}

const UploadFileSupport = (props: UploadFileSupportProps) => {
  const {
    dataTestId,
    payload,
    textInfo,
    initialFile,
    onChange,
    value,
    allowClear,
    softDelete,
    showUpload,
    onShowFile,
  } = props

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentFile, setCurrentFile] = useState<File | undefined>(value)

  const deleteFile = () => {
    setIsLoading(true)
    axios
      .delete(`/file/${currentFile?.id}`)
      .then(() => {
        setIsLoading(false)
        setCurrentFile(undefined)
        onChange?.(undefined)
      })
      .catch((err) => {
        setIsLoading(false)
        errorModalMessage(err)
      })
  }

  useEffect(() => {
    setCurrentFile(initialFile)
  }, [initialFile])

  useEffect(() => {
    setCurrentFile(value)
  }, [JSON.stringify(value)])

  const renderFile = () => {
    return (
      <div className="flex items-center gap-2">
        <div>
          <FileIcon filename={currentFile?.client_filename} />
        </div>
        <div>
          <Typography.Text type="secondary">
            {dateTimeIndo(currentFile?.created_at)}
          </Typography.Text>
          <br />
          <Space data-testid={dataTestId} align="center">
            {onShowFile ? (
              <Typography.Link onClick={() => onShowFile(currentFile)}>
                # {currentFile?.client_filename}
              </Typography.Link>
            ) : (
              <Typography.Link href={baseUrlFile(currentFile?.path)} target="_blank">
                # {currentFile?.client_filename}
              </Typography.Link>
            )}

            {allowClear !== false && (
              <Popconfirm
                title="Apakah Anda yakin ingin menghapus file ini?"
                onConfirm={() => {
                  if (softDelete === true) {
                    onChange?.(undefined)
                    setCurrentFile(undefined)
                  } else {
                    deleteFile()
                  }
                }}
              >
                <IconTrash
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                  stroke={1.2}
                />
              </Popconfirm>
            )}
          </Space>
        </div>
      </div>
    )
  }

  const renderUpload = () => {
    return (
      <UploadHelper
        onSuccessUpload={(res) => {
          setCurrentFile(res)
          onChange?.(res)
        }}
        payload={payload}
        dataTestId={dataTestId}
      >
        <div className="cursor-pointer">
          <div className="hover:bg-gray-100 p-2 border border-gray-400 border-dashed rounded text-center">
            <Space data-testid={dataTestId} className="gap-1">
              <IconUpload size={18} stroke={1.3} /> Pilih file atau seret ke sini
            </Space>
          </div>
          {textInfo && (
            <Typography.Text type="secondary" className="text-xs">
              {textInfo}
            </Typography.Text>
          )}
        </div>
      </UploadHelper>
    )
  }

  return (
    <Spin spinning={isLoading}>
      {currentFile?.id && renderFile()}
      {isAnyTrue([currentFile?.id === undefined, showUpload === true]) && renderUpload()}
    </Spin>
  )
}

interface InputUploadFileProps<Values> {
  name: NamePath<Values>
  payload: Payload
  textInfo?: string | ReactNode
  dataTestId: string
  rules?: Rule[]
  label?: ReactNode
  allowClear?: boolean
  softDelete?: boolean
  className?: string
  onChange?: (_file: File | undefined) => void
  showUpload?: boolean
  onShowFile?: (_file: File | undefined) => void
}

const InputUploadFile = <Values extends object>(props: InputUploadFileProps<Values>) => {
  const {
    name,
    payload,
    textInfo,
    dataTestId,
    rules,
    label,
    allowClear,
    softDelete,
    className,
    onChange,
    showUpload,
    onShowFile,
  } = props
  return (
    <Form.Item<Values> name={name} rules={rules} label={label} className={className}>
      <UploadFileSupport
        dataTestId={dataTestId}
        payload={payload}
        textInfo={textInfo}
        allowClear={allowClear}
        softDelete={softDelete}
        onChange={(value) => onChange?.(value)}
        showUpload={showUpload}
        onShowFile={onShowFile}
      />
    </Form.Item>
  )
}

export default InputUploadFile
