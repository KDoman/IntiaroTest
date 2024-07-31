import { useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import { getCanvasPreview } from "../helpers/getCanvasPreview";
import { getCenterAspectCrop } from "../helpers/getCenterAspectCrop";
import { useDebounceEffect } from "../hooks/useDebounceEffect";
import "react-image-crop/dist/ReactCrop.css";

export function CropComponent({
  pngUrl,
  scale,
  previewCanvasRef,
  transparentBg,
  urlImage,
}) {
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const aspect = 1;

  function onImageLoad(e) {
    const { width, height } = e.currentTarget;
    setCrop(getCenterAspectCrop(width, height, aspect));
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        getCanvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          transparentBg
        );
      }
    },
    100,
    [completedCrop, scale, transparentBg, pngUrl, urlImage]
  );

  return (
    <>
      {pngUrl && (
        <div className="flex justify-evenly max-w-full items-center bg-zinc-200 p-4 gap-4">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={urlImage ? urlImage : pngUrl}
              style={{
                transform: `scale(${scale})`,
                maxWidth: "25rem",
              }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          {!!completedCrop && (
            <canvas
              ref={previewCanvasRef}
              style={{
                objectFit: "cover",
                width: completedCrop.width,
                height: completedCrop.height,
                border: "2px solid black",
              }}
            />
          )}
        </div>
      )}
    </>
  );
}
