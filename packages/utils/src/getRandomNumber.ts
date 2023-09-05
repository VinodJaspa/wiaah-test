export function getRandomContrastingColor() {
  // Generate random RGB values for the color
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Calculate the luminance of the color using the relative luminance formula (Y = 0.2126R + 0.7152G + 0.0722B)
  const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;

  // Check if the luminance is too low (color is too dark) and adjust it
  const brightnessThreshold = 0.5; // You can adjust this threshold as needed
  const isColorDark = luminance < brightnessThreshold;

  // If the color is too dark, return a light color (white), otherwise return the random color
  return isColorDark ? "#ffffff" : `rgb(${red}, ${green}, ${blue})`;
}
