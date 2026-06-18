import { DatePicker, TimeRangePickerProps } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { Rule } from 'antd/es/form'
import FormItem from 'antd/es/form/FormItem'
import { NamePath } from 'antd/es/form/interface'
import { RangePickerProps } from 'antd/es/date-picker'
import dayjs, { Dayjs } from 'dayjs'
import React from 'react'
import validate from '~/lib/validate'

export const presetsDateRange: TimeRangePickerProps['presets'] = [
  {
    label: 'Hari Ini',
    value: [dayjs(), dayjs()],
  },
  {
    label: 'Kemarin',
    value: [dayjs().subtract(1, 'day'), dayjs().subtract(1, 'day')],
  },
  {
    label: '7 Hari Terakhir',
    value: [dayjs().subtract(7, 'day'), dayjs().subtract(0, 'day')],
  },
  {
    label: '30 Hari Terakhir',
    value: [dayjs().subtract(30, 'day'), dayjs().subtract(0, 'day')],
  },
  {
    label: 'Bulan Ini',
    value: [dayjs().startOf('month'), dayjs().endOf('month')],
  },
  {
    label: 'Tahun Ini',
    value: [dayjs().startOf('year'), dayjs().endOf('year')],
  },
  {
    label: 'Bulan Lalu',
    value: [
      dayjs().subtract(1, 'month').startOf('month'),
      dayjs().subtract(1, 'month').endOf('month'),
    ],
  },
  {
    label: 'Tahun Lalu',
    value: [dayjs().subtract(1, 'year').startOf('year'), dayjs().subtract(1, 'year').endOf('year')],
  },
]

interface InputDateRangeProps<Values> {
  placeholder?: string
  label?: React.ReactNode
  name: NamePath<Values>
  disabled?: boolean
  rule?: Rule[]
  size?: SizeType
  initialValue?: [Dayjs | null | undefined, Dayjs | null | undefined]
  testValue?: string | number
  className?: string
  required?: boolean
  dataTestId: string
  disabledDate?: RangePickerProps['disabledDate']
  presets?: TimeRangePickerProps['presets'] | false
  panelRender?: RangePickerProps['panelRender']
  /**
   * @deprecated
   */
  onChange?: (_value: [Dayjs | null | undefined, Dayjs | null | undefined]) => void
}

const InputDateRange = <Values extends object>(props: Readonly<InputDateRangeProps<Values>>) => {
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
      initialValue={props.initialValue}
      data-testid={props.dataTestId}
      label={props.label}
      name={props.name}
      rules={buildRules()}
      className={props.disabled ? `disabled ${props.className}` : `${props.className}`}
    >
      <DatePicker.RangePicker
        disabledDate={props.disabledDate}
        allowEmpty
        disabled={props.disabled}
        onChange={(value) => props.onChange?.([value?.[0], value?.[1]])}
        className="w-full"
        format="DD MMM YYYY"
        presets={props.presets === false ? undefined : presetsDateRange}
        size={props.size ?? 'large'}
        panelRender={props.panelRender}
        placeholder={[`${buildPlaceholder()} Dari`, `${buildPlaceholder()} Sampai`]}
      />
    </FormItem>
  )
}

export default InputDateRange
