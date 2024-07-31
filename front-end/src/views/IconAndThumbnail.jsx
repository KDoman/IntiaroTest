import { H1Component } from "../components/H1Component";
import { UploadFileDiv } from "../components/UploadFileDiv";
import { ErrorMessage } from "../components/ErrorMessage";
import { CropAndOptionsComponent } from "../components/CropAndOptionsComponent";
import ICON_AND_THUMB_ICON from "../assets/icon.svg";
import { Divider, Input, Progress } from "@nextui-org/react";
import { useGetUrlFromFile } from "../hooks/useGetUrlFromFile";
import { useGetPngFromUrl } from "../hooks/useGetPngFromUrl";

import PNG_ICON from "../assets/png.svg";
import URL_ICON from "../assets/url.svg";

export function IconAndThumbnail() {
  const [pngUrl, readFileInput, isLoading, isError, setPngUrl] =
    useGetUrlFromFile();
  const [urlImage] = useGetPngFromUrl(pngUrl);

  return (
    <div className="relative">
      <H1Component icon={ICON_AND_THUMB_ICON}>Icon & Thumbnail</H1Component>
      <Divider />
      <H1Component icon={PNG_ICON} customIconWidht={2.8}>
        Create by PNG
      </H1Component>
      <div className="mt-10 mb-20">
        <UploadFileDiv onChange={readFileInput} />
      </div>
      <Divider />
      <H1Component icon={URL_ICON} customIconWidht={2}>
        Create by URL
      </H1Component>
      <Input
        type="text"
        label="Paste URL"
        className="w-1/2 mx-auto my-10"
        onChange={(e) => setPngUrl(e.target.value)}
      />

      {pngUrl && (
        <>
          {isLoading ? (
            <Progress
              color="success"
              aria-label="Loading..."
              isIndeterminate
              className="w-1/2 m-10 mx-auto "
              size="md"
            />
          ) : (
            <>
              {isError ? (
                <div className="w-1/2 mx-auto m-10">
                  <ErrorMessage>Wrong file type, try again</ErrorMessage>
                </div>
              ) : (
                <CropAndOptionsComponent pngUrl={pngUrl} urlImage={urlImage} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
