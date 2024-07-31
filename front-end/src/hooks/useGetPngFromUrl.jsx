import { useState, useEffect } from "react";
import axios from "axios";
import { getImageUrl } from "../helpers/getImageUrl";

export function useGetPngFromUrl(url) {
  const [urlImage, setUrlImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUrlImage("");
    if (url) {
      setIsLoading(true);

      const imgURL = getImageUrl(url);
      axios
        .get(imgURL, { responseType: "arraybuffer" })
        .then((response) => {
          let blob = new Blob([response.data], {
            type: response.headers["content-type"],
          });
          let img = document.createElement("img");
          let canvas = document.createElement("canvas");
          let ctx = canvas.getContext("2d");

          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            let pngUrl = canvas.toDataURL("image/png");
            setUrlImage(pngUrl);
            setIsLoading(false);
          };

          img.src = URL.createObjectURL(blob);
        })
        .catch(() => {
          return "error";
        })
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 1500);
        });
    }
  }, [url]);

  return [urlImage, isLoading];
}
