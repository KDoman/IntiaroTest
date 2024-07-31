import { getRandomNameForPngFile } from "../helpers/getRandomNameForPngFile";

export const getPngDownloadedImage = async (fileURL, inputFileName) => {
  const name = inputFileName ? inputFileName : getRandomNameForPngFile();

  try {
    const response = await fetch(fileURL);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Wystąpił błąd podczas pobierania pliku:", error);
  }
};
