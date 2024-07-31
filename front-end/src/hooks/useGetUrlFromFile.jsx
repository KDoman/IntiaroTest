import { useState } from "react";

export const useGetUrlFromFile = (setIsConvertedByFile) => {
  const [pngUrl, setPngUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const readFileInput = (event) => {
    setIsError(false);
    setPngUrl(null);
    setIsLoading(true);
    setIsConvertedByFile ? setIsConvertedByFile(true) : "";
    const file = event.target.files[0];
    setPngUrl(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const pngUrl = canvas.toDataURL("image/png");

          setPngUrl(pngUrl);
        };

        img.onerror = () => {
          setTimeout(() => {
            setIsError(true);
          }, 1500);
          throw new Error("Wrong file type, try again");
        };
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };

    reader.onerror = () => {
      console.log("Error reading file");
      setIsLoading(false);
    };

    reader.readAsDataURL(file);
  };

  return [pngUrl, readFileInput, isLoading, isError, setPngUrl];
};
