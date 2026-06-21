import { Modal } from "antd";
import React, { ReactNode } from "react";

interface ModalElemProps {
  children: ReactNode;
  open?: boolean;
  title: ReactNode;
  onCancel?: () => void;
  width?: number | string;
  centered?: boolean;
  footer?: ReactNode;
}

const ModalElem = (props: ModalElemProps) => {
  const { children, open, title, onCancel, width, centered, footer } = props;
  return (
    <Modal
      width={width}
      centered={centered}
      onCancel={onCancel}
      footer={footer === undefined ? null : footer}
      open={open}
      title={title}
      styles={{
        content: {
          padding: 0,
        },
        footer: {
          marginTop: 0,
          borderTop: "1px solid #f0f0f0",
          padding: "16px 24px",
        },
        header: {
          marginBottom: 0,
          padding: "16px 24px",
          borderBottom: "1px solid #f0f0f0",
        },
        body: {
          padding: "16px 24px",
        },
      }}
    >
      {children}
    </Modal>
  );
};

export default ModalElem;
