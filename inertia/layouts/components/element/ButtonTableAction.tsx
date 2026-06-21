import { Button, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import React from "react";
import Icon from "../display/Icon";
import { Permission } from "../../types/permissions";
import useUser from "../../hooks/useUser";
import { isUserAccessible } from "../../helpers";

const { confirm } = Modal;

interface ButtonTableActionProps {
  actionType: "edit" | "delete" | "view";
  onClick?: () => void;
  disabled?: boolean;
  permissionList: Permission[] | undefined;
}

const ButtonTableAction = (props: ButtonTableActionProps) => {
  const { actionType, onClick, disabled, permissionList } = props;
  const user = useUser();
  const accessible = isUserAccessible(user?.to_menus, permissionList);

  if (!accessible) {
    return <></>;
  }

  const showDeleteConfirm = () => {
    confirm({
      title: "Konfirmasi hapus data?",
      icon: <ExclamationCircleFilled />,
      content: "Apakah Anda yakin ingin menghapus data ini?",
      okText: "Konfirmasi",
      okType: "danger",
      cancelText: "Batalkan",
      onOk: onClick,
    });
  };

  if (actionType === "edit") {
    return (
      <Button
        disabled={disabled}
        size="small"
        onClick={onClick}
        data-testid="46165"
        color="primary"
        variant="outlined"
      >
        <Icon type="edit" />
      </Button>
    );
  }

  if (actionType === "delete") {
    return (
      <Button
        disabled={disabled}
        size="small"
        onClick={showDeleteConfirm}
        data-testid="46165"
        color="danger"
        variant="outlined"
      >
        <Icon type="trash" />
      </Button>
    );
  }

  if (actionType === "view") {
    return (
      <Button
        disabled={disabled}
        size="small"
        onClick={onClick}
        variant="outlined"
        color="primary"
        data-testid="46165"
      >
        <Icon type="view" />
      </Button>
    );
  }

  return "";
};

export default ButtonTableAction;
