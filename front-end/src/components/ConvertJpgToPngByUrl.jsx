import { Button, Input, Progress } from "@nextui-org/react";
import { H1Component } from "./H1Component";
import { useState } from "react";
import { useGetPngFromUrl } from "../hooks/useGetPngFromUrl";
import { getPngDownloadedImage } from "../helpers/getPngDownloadedImage";
import URL_ICON from "../assets/url.svg";
import { ErrorMessage } from "./ErrorMessage";

export function ConvertJpgToPngByUrl({
  isConvertedByFile,
  setIsConvertedByURL,
  fileName,
}) {
  const [url, setUrl] = useState("");
  const [urlImage, isLoading] = useGetPngFromUrl(url);
  const [isInputEmpty, setIsInputEmpty] = useState(true);

  function onChangeInput(e) {
    const value = e.target.value;
    setUrl(value);
    if (value !== "") {
      setIsConvertedByURL(true);
      setIsInputEmpty(false);
    } else {
      setIsInputEmpty(true);
    }
  }

  return (
    <div
      className={`${isConvertedByFile ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <H1Component icon={URL_ICON} customIconWidht={2}>
        Convert by URL
      </H1Component>
      <div className="flex justify-center items-center py-10 w-1/2 mx-auto">
        <Input
          size="sm"
          type="text"
          label="URL"
          isDisabled={isConvertedByFile}
          onChange={onChangeInput}
          value={url}
        />
      </div>

      <div className="flex justify-center items-center my-10 w-1/2 mx-auto">
        {isLoading ? (
          <Progress
            color="success"
            aria-label="Loading..."
            isIndeterminate
            className="max-w-full"
            size="md"
          />
        ) : urlImage ? (
          <Button
            isDisabled={isLoading}
            onClick={() => getPngDownloadedImage(urlImage, fileName)}
          >
            Download Png
          </Button>
        ) : (
          !isInputEmpty && (
            <ErrorMessage>Error, check the URL and try again</ErrorMessage>
          )
        )}
      </div>
    </div>
  );
}
