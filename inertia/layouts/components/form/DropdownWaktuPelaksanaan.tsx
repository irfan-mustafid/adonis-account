import { useState } from 'react'
import { Dropdown, Button, Menu, Space } from 'antd'
import { IconChevronDown } from '@tabler/icons-react'

interface DropdownWaktuPelaksanaanProps {
  onSelect: (_selectedTime: string) => void
  defaultValue?: string
  placeholder?: string
}

const DropdownWaktuPelaksanaan = (props: Readonly<DropdownWaktuPelaksanaanProps>) => {
  const { onSelect, defaultValue, placeholder = 'Pilih Waktu Pelaksanaan' } = props
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue || '')

  const timeOptions = [
    { key: '08:00-09:00', label: '08:00 - 09:00' },
    { key: '09:00-10:00', label: '09:00 - 10:00' },
    { key: '10:00-11:00', label: '10:00 - 11:00' },
    { key: '11:00-12:00', label: '11:00 - 12:00' },
    { key: '13:00-14:00', label: '13:00 - 14:00' },
    { key: '14:00-15:00', label: '14:00 - 15:00' },
    { key: '15:00-16:00', label: '15:00 - 16:00' },
  ]

  const handleMenuClick = ({ key }: { key: string }) => {
    const selected = timeOptions.find((option) => option.key === key)
    if (selected) {
      setSelectedValue(selected.label)
      onSelect(key)
    }
  }

  const menu = (
    <Menu onClick={handleMenuClick} data-testid="waktu-pelaksanaan-menu">
      {timeOptions.map((option) => (
        <Menu.Item key={option.key} data-testid={`waktu-option-${option.key}`}>
          {option.label}
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']} data-testid="waktu-pelaksanaan-dropdown">
      <Button
        size="large"
        style={{ width: '100%', textAlign: 'left' }}
        data-testid="waktu-pelaksanaan-button"
      >
        <Space data-testid="waktu-pelaksanaan-button-content">
          {selectedValue || placeholder}
          <IconChevronDown size={16} />
        </Space>
      </Button>
    </Dropdown>
  )
}

export default DropdownWaktuPelaksanaan
