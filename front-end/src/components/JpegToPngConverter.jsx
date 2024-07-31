import { useState } from "react";
import { ConvertJpgToPngByFile } from "./ConvertJpgToPngByFile";
import { ConvertJpgToPngByUrl } from "./ConvertJpgToPngByUrl";
import { Divider, Input } from "@nextui-org/react";

export function JpegToPngConverter() {
  const [isConvertedByFile, setIsConvertedByFile] = useState(false);
  const [isConvertedByURL, setIsConvertedByURL] = useState(false);
  const [fileName, setFileName] = useState("");

  return (
    <>
      <ConvertJpgToPngByFile
        isConvertedByURL={isConvertedByURL}
        setIsConvertedByFile={setIsConvertedByFile}
        fileName={fileName}
      />
      <ConvertJpgToPngByUrl
        isConvertedByFile={isConvertedByFile}
        setIsConvertedByURL={setIsConvertedByURL}
        fileName={fileName}
      />
      <Divider />
      <Input
        type="text"
        label="File name (optional)"
        className="w-1/2 mx-auto my-10"
        onChange={(e) => setFileName(e.target.value)}
      />
    </>
  );
}
