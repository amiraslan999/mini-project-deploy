"use client";

import { UploadButton } from "@/src/utils/uploadthing";

type Props = {
  onUploadError: ((data: any) => void) | undefined;
  onClientUploadComplete: ((data: any) => void) | undefined;
};

export default function Uploader({
  onClientUploadComplete,
  onUploadError,
}: Props) {
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={onClientUploadComplete}
      onUploadError={onUploadError}
    />
  );
}
