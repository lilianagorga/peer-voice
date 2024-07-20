"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
  accept: { [key: string]: string[] };
};

export const FileUploader = ({ files, onChange, accept }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, [onChange]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
  });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files.length > 0 ? (
        <div className="file-details">
          <p>{files[0].name}</p>
          <p>{(files[0].size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      ) : (
        <>
          <div className="file-upload_label">
            <p className="text-14-regular">
              <span className="text-lime-500">Click to upload </span>
              or drag and drop
            </p>
            <p className="text-12-regular">{Object.keys(accept).join(', ')}</p>
          </div>
        </>
      )}
    </div>
  );
};