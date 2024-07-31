import { useState } from "react";
import { getResizedFile } from "../helpers/getResizedFile";

export function useGetCropedImage() {
  const [areDownloadButtonsAvailable, setAreDownloadButtonsAvailable] =
    useState(false);
  const [icon, setIcon] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const getCropedImage = (previewCanvasRef) => {
    setAreDownloadButtonsAvailable(false);

    previewCanvasRef.current.toBlob(() => {
      const canvasURL = previewCanvasRef.current?.toDataURL();

      if (canvasURL)
        fetch(canvasURL)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], "image", { type: blob.type });

            getResizedFile(file, 512).then((res) => {
              setThumbnail(res);
            });
            getResizedFile(file, 128).then((res) => {
              setIcon(res);
            });
          })
          .catch((err) => console.log(err))
          .finally(setAreDownloadButtonsAvailable(true));
    });
  };

  return [icon, thumbnail, areDownloadButtonsAvailable, getCropedImage];
}
