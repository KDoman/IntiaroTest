import { Button } from "@nextui-org/react";
import { getPngDownloadedImage } from "../helpers/getPngDownloadedImage";
import { useGetCropedImage } from "../hooks/useGetCropedImage";

export function IconAndThumbnailButtons({ previewCanvasRef, pngName }) {
  const [icon, thumbnail, areDownloadButtonsAvailable, getCropedImage] =
    useGetCropedImage();

  return (
    <div className="flex justify-evenly items-center flex-col  h-[200px]">
      <Button onClick={() => getCropedImage(previewCanvasRef)}>
        Set Image
      </Button>
      <div>
        <Button
          className="mr-10"
          isDisabled={!areDownloadButtonsAvailable}
          onClick={() => getPngDownloadedImage(icon, pngName)}
        >
          Download 128x128
        </Button>
        <Button
          onClick={() => getPngDownloadedImage(thumbnail, pngName)}
          isDisabled={!areDownloadButtonsAvailable}
        >
          Download 512x512
        </Button>
      </div>
    </div>
  );
}
