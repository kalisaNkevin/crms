import { DropzoneState } from "react-dropzone";
import { UploadFileIcon } from "../icons";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface UploadFileProps {
  getInputProps: DropzoneState["getInputProps"];
  getRootProps: DropzoneState["getRootProps"];
  previewImage?: string;
  isFullHeight?: boolean;
  label: string;
}
export const UploadFile = ({
  getInputProps,
  getRootProps,
  isFullHeight,
  previewImage,
  label,
}: UploadFileProps) => {
  return (
    <>
      <label htmlFor={label} className="block my-3">
        {label}
      </label>
      <div
        className={cn(
          "relative text-sm w-full bg-gray-100 rounded-lg h-2/5 border",
          {
            "h-full": isFullHeight,
          },
        )}
      >
        <div className="relative lg:h-full h-[200px] w-full rounded-lg">
          {previewImage && (
            <Image
              src={previewImage}
              alt=""
              className="object-cover w-full h-full rounded-lg"
              fill
            />
          )}

          {previewImage && (
            <div className="absolute inset-0 bg-black opacity-50 z-10 rounded-lg"></div>
          )}
        </div>

        <div
          className="absolute top-0 z-10 w-full h-full py-5 px-2 rounded-[8px] mt-1 flex items-center justify-center"
          {...getRootProps()}
        >
          <button className="flex flex-col items-center justify-center">
            <UploadFileIcon />
            <input {...getInputProps()} />
            <span className={cn("my-4", { "text-white": !!previewImage })}>
              Drag and drop or Click here to upload
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
