"use client";

import toast from "react-hot-toast";
import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (res && res.length > 0) {
          const fileUrl = res[0]?.url;
          onChange(fileUrl);
          toast.success("File uploaded successfully!");
        } else {
          toast.error("No file URL returned from upload.");
          onChange(undefined); // Handle empty upload gracefully
        }
      }}
      onUploadError={(error: Error) => {
        toast.error(`Upload error: ${error?.message}`);
      }}
    />
  );
};
