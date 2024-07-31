export function getImageUrl(inputUrl) {
  try {
    const url = new URL(inputUrl);
    if (url.href) {
      return url.href;
    }
  } catch (error) {
    console.error("Something went wrong. Make sure URL is okey ;)");
  }
}
