import { Popconfirm, Space, Spin, Typography } from "antd";
import React, { ReactNode, useEffect, useState } from "react";
import { IconTrash, IconUpload } from "@tabler/icons-react";
import axios from "axios";
import UploadHelper, { Payload } from "../tools/UploadHelper";
import Label from "../display/Label";
import { File } from "../../models/File";
import { baseUrlFile, dateTimeIndo, errorModalMessage } from "../../helpers";

interface UploadFileProps {
  label: string | ReactNode;
  textInfo?: string | ReactNode;
  dataTestId: string;
  payload: Payload;
  initialFile?: File;
  onSuccessUpload?: (_file: File) => void;
  onSuccessDelete?: () => void;
}

const UploadFile = (props: UploadFileProps) => {
  const {
    label,
    dataTestId,
    payload,
    textInfo,
    initialFile,
    onSuccessUpload,
    onSuccessDelete,
  } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentFile, setCurrentFile] = useState<File>();

  const deleteFile = () => {
    setIsLoading(true);
    axios
      .delete(`/file/${currentFile?.id}`)
      .then(() => {
        setIsLoading(false);
        setCurrentFile(undefined);
        onSuccessDelete?.();
      })
      .catch((err) => {
        setIsLoading(false);
        errorModalMessage(err);
      });
  };

  useEffect(() => {
    setCurrentFile(initialFile);
  }, [initialFile]);

  const renderFile = () => {
    return (
      <div>
        <Typography.Text type="secondary">
          {dateTimeIndo(currentFile?.created_at)}
        </Typography.Text>
        <br />
        <Space data-testid={dataTestId} align="center">
          <Typography.Link
            href={baseUrlFile(currentFile?.path)}
            target="_blank"
          >
            # {currentFile?.client_filename}
          </Typography.Link>
          <Popconfirm
            title="Apakah Anda yakin ingin menghapus file ini?"
            onConfirm={() => deleteFile()}
          >
            <IconTrash
              className="text-red-600 hover:text-red-800 cursor-pointer"
              stroke={1.2}
            />
          </Popconfirm>
        </Space>
      </div>
    );
  };

  const renderUpload = () => {
    return (
      <UploadHelper
        onSuccessUpload={(res) => {
          setCurrentFile(res);
          onSuccessUpload?.(res);
        }}
        payload={payload}
        dataTestId={dataTestId}
      >
        <div className="cursor-pointer">
          <div className="border-gray-400 hover:bg-gray-100 p-2 border border-dashed rounded text-center">
            <Space data-testid={dataTestId} className="gap-1">
              <IconUpload size={18} stroke={1.3} /> Pilih file atau seret ke
              sini
            </Space>
          </div>
          {textInfo && (
            <Typography.Text type="secondary" className="text-xs">
              {textInfo}
            </Typography.Text>
          )}
        </div>
      </UploadHelper>
    );
  };

  return (
    <Spin spinning={isLoading}>
      {typeof label === "string" ? (
        <Label
          dataTestId={dataTestId}
          className={currentFile?.id === undefined ? "mb-2" : ""}
        >
          {label}
        </Label>
      ) : (
        label
      )}

      {currentFile?.id ? renderFile() : renderUpload()}
    </Spin>
  );
};

export default UploadFile;
