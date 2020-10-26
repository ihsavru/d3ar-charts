
export function scaleBandInvert(scale, coord) {
  const eachBand = scale.step();
  const index = Math.floor((coord / eachBand));
  const val = scale.domain()[index];
  return val;
}
