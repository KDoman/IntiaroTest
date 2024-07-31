import Resizer from "react-image-file-resizer";

export const getResizedFile = (file, resolution) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      resolution,
      resolution,
      "PNG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64",
      resolution,
      resolution
    );
  });
