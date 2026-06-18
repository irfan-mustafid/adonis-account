import { useState } from 'react'
import { Modal, Radio, Button, Space } from 'antd'

interface ModalWaktuPelaksanaanProps {
  isOpen: boolean
  onCancel: () => void
  onOk: (_selectedTime: string) => void
  defaultValue?: string
}

const ModalWaktuPelaksanaan = (props: Readonly<ModalWaktuPelaksanaanProps>) => {
  const { isOpen, onCancel, onOk, defaultValue } = props
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue || '')

  const timeOptions = [
    { label: '08:00 - 09:00', value: '08:00-09:00' },
    { label: '09:00 - 10:00', value: '09:00-10:00' },
    { label: '10:00 - 11:00', value: '10:00-11:00' },
    { label: '11:00 - 12:00', value: '11:00-12:00' },
    { label: '13:00 - 14:00', value: '13:00-14:00' },
    { label: '14:00 - 15:00', value: '14:00-15:00' },
    { label: '15:00 - 16:00', value: '15:00-16:00' },
  ]

  const handleOk = () => {
    if (selectedValue) {
      onOk(selectedValue)
    }
  }

  return (
    <Modal
      title="Waktu Pelaksanaan"
      open={isOpen}
      onCancel={onCancel}
      footer={[
        <Button
          key="ok"
          type="primary"
          onClick={handleOk}
          disabled={!selectedValue}
          data-testid="waktu-pelaksanaan-ok-btn"
          style={{
            width: '100%',
            borderRadius: '20px',
            backgroundColor: '#1890ff',
          }}
        >
          OK
        </Button>,
      ]}
      width={300}
      centered
    >
      <div style={{ padding: '16px 0' }}>
        <Radio.Group
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
          style={{ width: '100%' }}
        >
          <Space
            direction="vertical"
            style={{ width: '100%' }}
            data-testid="waktu-pelaksanaan-options"
          >
            {timeOptions.map((option) => (
              <Radio
                key={option.value}
                value={option.value}
                style={{
                  width: '100%',
                  padding: '8px 0',
                  fontSize: '16px',
                }}
              >
                {option.label}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </div>
    </Modal>
  )
}

export default ModalWaktuPelaksanaan
