// licensed with GNU AFFERO GENERAL PUBLIC LICENSE Version 3
// author: Thomas Jourdan
setFunction({
  name: 'invtile',
  type: 'coord',
  inputs: [
    {name: 'amount',    type: 'float', default: 1.0},
  ],
  glsl: `
  vec2 xy = _st - vec2(0.5);
  return mix(abs(xy), exp(abs(xy)), amount) + vec2(0.5);
`})
setFunction({
  name: 'invsqrt',
  type: 'coord',
  inputs: [
    {name: 'amount',    type: 'float', default: 0.5},
  ],
  glsl: `
  vec2 xy = _st - vec2(0.5);
  xy = inversesqrt(abs(xy)+vec2(amount));
  return xy + vec2(0.5);
`})
setFunction({
  name: 'abslog',
  type: 'coord',
  inputs: [
    {name: 'amount',    type: 'float', default: 1.0},
  ],
  glsl: `
  vec2 xy = _st - vec2(0.5);
  xy.x = log(abs(xy.x)+amount);
  xy.y = log(abs(xy.y)+amount);
  xy += 0.5;
  return xy;
`})
setFunction({
  name: 'swave',
  type: 'coord',
  inputs: [
    {name: 'amount',    type: 'float', default: 1.0},
  ],
  glsl: `
  vec2 xy = _st - vec2(0.5);
  xy = mix(xy.xx, xy.yy, amount*dot(xy, xy.yx));
  return xy + vec2(0.5);
`})
setFunction({
  name: 'centermag',
  type: 'coord',
  inputs: [
    {name: 'r',  type: 'float', default: 0.4},
    {name: 'h',  type: 'float', default: 0.2},
    {name: 'cx', type: 'float', default: 0.0},
    {name: 'cy', type: 'float', default: 0.0},
  ],
  glsl: `
  vec2 xy = _st - vec2(cx+0.5, cy+0.5);
  h = r + h;
  float hr = r * sqrt(1.0 - ((r - h) / r) * ((r - h) / r));
  float rr = length(xy);
  return (rr < hr ? xy * (r - h) / sqrt(r * r - rr * rr) : xy) + vec2(cx+0.5, cy+0.5);
`})
setFunction({
  name: 'hyperbole',
  type: 'coord',
  inputs: [
    {name: 'offset',  type: 'float', default: 0.5},
    {name: 'folds',  type: 'float', default: 12},
  ],
  glsl: `
  vec2 st = _st;
  st -= 0.5;
  int foldSteps = int(abs(folds));
  for (int i = 0; i < 100; i++) {
    st.xy = abs(st) / abs(dot(st, st)) - vec2(offset);
    if (i >= foldSteps) break;
  }
  return st;
`})
// TODO update old scripts and remove these
setFunction({
  name: 'hyperbole8',
  type: 'coord',
  inputs: [
    {name: 'offset',  type: 'float', default: 0.5},
  ],
  glsl: `
  vec2 st = _st;
  st -= 0.5;
  for (int i = 0; i < 8; i++) {
    st.xy = abs(st) / abs(dot(st, st)) - vec2(offset);
  }
  return st;
`})
setFunction({
  name: 'hyperbole4',
  type: 'coord',
  inputs: [
    {name: 'offset',  type: 'float', default: 0.5},
  ],
  glsl: `
  vec2 st = _st;
  st -= 0.5;
  for (int i = 0; i < 4; i++) {
    st.xy = abs(st) / abs(dot(st, st)) - vec2(offset);
  }
  return st;
`})
setFunction({
  name: 'hyperbole20',
  type: 'coord',
  inputs: [
    {name: 'offset',  type: 'float', default: 0.5},
  ],
  glsl: `
  vec2 st = _st;
  st -= 0.5;
  for (int i = 0; i < 20; i++) {
    st.xy = abs(st) / abs(dot(st, st)) - vec2(offset);
  }
  return st;
`})

const { sculptToHydraRenderer } = await import("https://cdn.jsdelivr.net/gh/emptyflash/shader-park-core/dist/shader-park-core.esm.js")
export { sculptToHydraRenderer }
