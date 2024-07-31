export function getLetterFromFullMeasurements(array, letter, callback) {
  array.forEach((word) => {
    if (word.includes(letter)) {
      const match = word.match(/[\d.]+/);
      if (match) {
        const convertion = parseFloat(match[0]);
        callback(convertion);
      }
    }
  });
}
