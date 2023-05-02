function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function darkerRgb(hex?: string, percent?: number) {
  if (hex == undefined || percent == undefined) {
    return undefined;
  }
  let rgb = hexToRgb(hex);

  if (rgb) {
    let r = Math.round(rgb.r * (1 - percent));
    let g = Math.round(rgb.g * (1 - percent));
    let b = Math.round(rgb.b * (1 - percent));
    return rgbToHex(r, g, b);
  }
}

export { darkerRgb };
