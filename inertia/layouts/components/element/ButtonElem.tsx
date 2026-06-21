import React from 'react'
import { Button } from 'antd'
// import useUser from '../../hooks/useUser'
// import { isUserAccessible } from '~/lib/helpers'
// import { Permission } from "../../types/permissions";

type ButtonType = 'primary' | 'secondary' | 'danger' | 'info' | 'link' | 'success'

interface ButtonElemProps {
  // permissionList: Permission[] | undefined
  variant: ButtonType
  children: React.ReactNode
  size?: 'small' | 'middle' | 'large'
  className?: string
  htmlType?: 'button' | 'submit' | 'reset'
  dataTestId?: string
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  title?: string
  form?: string
}

const ButtonElem = (props: ButtonElemProps) => {
  const {
    variant,
    children,
    size,
    className,
    htmlType,
    dataTestId,
    onClick,
    disabled,
    loading,
    title,
    // permissionList,
    form,
  } = props

  // const user = useUser()
  // const accessible = isUserAccessible(user?.to_menus, permissionList)

  const buildType = () => {
    if (variant === 'link') {
      return 'link'
    }

    return 'primary'
  }

  const buildClassName = () => {
    switch (variant) {
      case 'primary':
        return ''

      case 'secondary':
        return 'bg-orange-500 hover:!bg-orange-700'

      case 'info':
        return 'bg-blue-400 hover:!bg-blue-500'

      case 'danger':
        return 'bg-red-500 hover:!bg-red-700'

      case 'success':
        return 'bg-green-500 hover:!bg-green-700'

      case 'link':
        return ''
      default:
        return ''
    }
  }

  // if (!accessible) {
  //   return <></>
  // }

  return (
    <Button
      form={form}
      disabled={disabled}
      htmlType={htmlType ?? 'button'}
      size={size ?? 'large'}
      type={buildType()}
      data-testid={dataTestId}
      className={`${buildClassName()} ${className}`}
      onClick={onClick}
      loading={loading}
      title={title}
    >
      {children}
    </Button>
  )

  // switch (variant) {
  //   case "primary":
  //     return (
  //       <Button
  //         htmlType={htmlType ?? "button"}
  //         size={size ?? "large"}
  //         type="primary"
  //         data-testid={dataTestId}
  //         className={className}
  //         onClick={onClick}
  //       >
  //         {children}
  //       </Button>
  //     );

  //   case "link":
  //     return (
  //       <Button
  //         htmlType={htmlType ?? "button"}
  //         size={size ?? "large"}
  //         type="link"
  //         data-testid={dataTestId}
  //         className={className}
  //         onClick={onClick}
  //         // variant="link"
  //       >
  //         {children}
  //       </Button>
  //     );

  //   case "secondary":
  //     return (
  //       <Button
  //         htmlType={htmlType ?? "button"}
  //         size={size ?? "large"}
  //         type="primary"
  //         data-testid={dataTestId}
  //         className={`bg-orange-500 hover:!bg-orange-700 ${className}`}
  //         onClick={onClick}
  //       >
  //         {children}
  //       </Button>
  //     );

  //   case "info":
  //     return (
  //       <Button
  //         htmlType={htmlType ?? "button"}
  //         size={size ?? "large"}
  //         type="primary"
  //         data-testid={dataTestId}
  //         className={`bg-blue-400 hover:!bg-blue-500 ${className}`}
  //         onClick={onClick}
  //       >
  //         {children}
  //       </Button>
  //     );

  //   default:
  //     return (
  //       <Button size={size ?? "large"} data-testid="ezGrd">
  //         {children}
  //       </Button>
  //     );
  // }
}

export default ButtonElem
