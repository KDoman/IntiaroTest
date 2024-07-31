export function getRandomNameForPngFile() {
  const randomNumber = Math.floor(Math.random() * 1000000);
  const fileName = `PNG_${randomNumber}`;
  return fileName;
}
