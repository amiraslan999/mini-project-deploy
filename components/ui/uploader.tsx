"use client";

import { UploadButton } from "@/src/utils/uploadthing";
import { ClientUploadedFileData } from "uploadthing/types";

type Props = {
  onUploadError: ((data: Error) => void) | undefined;
  onClientUploadComplete?:
    | ((
        res: ClientUploadedFileData<{
          uploadedBy: string;
        }>[]
      ) => Promise<void>)
    | undefined;
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
