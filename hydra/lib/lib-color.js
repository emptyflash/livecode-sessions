// licensed with GNU AFFERO GENERAL PUBLIC LICENSE Version 3
// author: Thomas Jourdan
// see: https://medium.com/@rupertontheloose/functional-shaders-a-colorful-intro-part5-tinting-with-sepia-tone-cd6c2b49806
setFunction({
  name: 'sepia',
  type: 'color',
  inputs: [
    {name: 'amount',    type: 'float', default: 1.0},
  ],
  glsl: `
  const mat3 sepiaMat = mat3(
    0.393, 0.769, 0.189,
    0.349, 0.686, 0.168,
    0.272, 0.534, 0.131);
  vec3 se = _c0.rgb * sepiaMat;
  return vec4(amount * se + (1.0 - amount) * _c0.rgb, _c0.a);
`})
setFunction({
  name: 'levels',
  type: 'color',
  inputs: [
    {name: 'levels',    type: 'float', default: 3.0},
    {name: 'amount',    type: 'float', default: 1.0},
  ],
  glsl: `
  vec3 le = floor(_c0.rgb * levels) / levels;
  return vec4(amount * le + (1.0 - amount) * _c0.rgb, _c0.a);
`})
// see: https://rosenzweig.io/blog/monotone-portraits-with-glsl.html
// The original source code by Alyssa Rosenzweig is available under the MIT license.
// https://gitlab.freedesktop.org/alyssa/monotone-portraits/blob/master/posterize.html
// The box blur filter is not ported from original source code to Hydra.
setFunction({
  name: 'monotone',
  type: 'color',
  inputs: [
    {name: 'levels', type: 'float', default: 3.0},
    {name: 'hue',    type: 'float', default: 0.6},
    {name: 'amount', type: 'float', default: 1.0},
  ],
  glsl: `
	float grey = dot(_c0.rgb, vec3(0.2126, 0.7152, 0.0722));
	grey = clamp(grey * 1.1, 0.0, 1.0);
	float poster = floor(grey * levels + 0.5) / levels;
	float contrast = clamp(1.4 * (poster - 0.5) + 0.5, 0.0, 1.0);
	vec3 rgb = _hsvToRgb(vec3(hue, 0.4, contrast));
  return vec4(amount * rgb + (1.0 - amount) * _c0.rgb, _c0.a);
`})
// see: https://github.com/kbinani/colormap-shaders/blob/master/shaders/glsl/transform_rose.frag
// by kbinani MIT License
setFunction({
  name: 'grarose',
  type: 'color',
  inputs: [
    {name: 'amount',    type: 'float', default: 1.0},
  ],
  glsl: `
  const float d3 = 1.0 / 3.0;
  float gray = d3 * (_c0.r + _c0.g + _c0.b);
  vec3 co = vec3(1.0);
  if (gray < 0.0) {
      co.r = 54.0 / 255.0;
  } else if (gray < 20049.0 / 82979.0) {
      co.r = (829.79 * gray + 54.51) / 255.0;
  }
  if (gray < 20049.0 / 82979.0) {
      co.g = 0.0;
  } else if (gray < 327013.0 / 810990.0) {
      co.g = (8546482679670.0 / 10875673217.0 * gray - 2064961390770.0 / 10875673217.0) / 255.0;
  } else if (gray <= 1.0) {
      co.g = (103806720.0 / 483977.0 * gray + 19607415.0 / 483977.0) / 255.0;
  }
  if (gray < 0.0) {
      co.b = 54.0 / 255.0;
  } else if (gray < 7249.0 / 82979.0) {
      co.b = (829.79 * gray + 54.51) / 255.0;
  } else if (gray < 20049.0 / 82979.0) {
      co.b = 127.0 / 255.0;
  } else if (gray < 327013.0 / 810990.0) {
      co.b = (792.02249341361393720147485376583 * gray - 64.364790735602331034989206222672) / 255.0;
  }
  return vec4(amount * clamp(co, 0.0, 1.0) + (1.0 - amount) * _c0.rgb, _c0.a);
`})
// see: https://github.com/kbinani/colormap-shaders/blob/master/shaders/glsl/transform_rose.frag
// by kbinani MIT License
setFunction({
  name: 'grawave',
  type: 'color',
  inputs: [
    {name: 'amount',    type: 'float', default: 1.0},
  ],
  glsl: `
  const float d3 = 1.0 / 3.0;
  float gray = d3 * (_c0.r + _c0.g + _c0.b);
  vec3 co;
  if (gray < 0.0) {
      co.r = 124.0 / 255.0;
  } else if (gray <= 1.0) {
      co.r = (128.0 * sin(6.25 * (gray + 0.5)) + 128.0) / 255.0;
  } else {
      co.r = 134.0 / 255.0;
  }
  if (gray < 0.0) {
      co.g = 121.0 / 255.0;
  } else if (gray <= 1.0) {
      co.g = (63.0 * sin(gray * 99.72) + 97.0) / 255.0;
  } else {
      co.g = 52.0 / 255.0;
  }
  if (gray < 0.0) {
      co.b = 131.0 / 255.0;
  } else if (gray <= 1.0) {
      co.b = (128.0 * sin(6.23 * gray) + 128.0) / 255.0;
  } else {
      co.b = 121.0 / 255.0;
  }
  return vec4(amount * clamp(co, 0.0, 1.0) + (1.0 - amount) * _c0.rgb, _c0.a);
`})
setFunction({
  name: 'colcross',
  type: 'combine',
  inputs: [
    {name: 'amount',    type: 'float', default: 1.0},
  ],
  glsl: `
vec3 cc = cross(_c0.rgb, _c1.rgb);
return vec4(amount * cc + (1.0 - amount) * _c0.rgb, _c0.a);
`})
setFunction({
  name: 'coldot',
  type: 'combine',
  inputs: [
    {name: 'amount',    type: 'float', default: 1.0},
  ],
  glsl: `
vec3 cc = vec3(dot(_c0.rgb, _c1.rgb),
               dot(_c0.rgb, _c1.brg),
               dot(_c0.rgb, _c1.gbr));
return vec4(amount * cc + (1.0 - amount) * _c0.rgb, _c0.a);
`})
setFunction({
  name: 'colboost',
  type: 'combine',
  inputs: [
    {name: 'amount',    type: 'float', default: 1.0},
  ],
  glsl: `
vec3 cc = cross(_c0.rgb, _c1.rgb);
cc = normalize(_c0.rgb);
return vec4(amount * cc + (1.0 - amount) * _c0.rgb, _c0.a);
`})
setFunction({
  name: 'colreflect',
  type: 'combine',
  inputs: [
    {
      type: 'float',
      name: 'amount',
      default: 1,
    }
  ],
  glsl: `
vec3 cc = cross(_c0.rgb, normalize(_c1.rgb));
return vec4(amount * cc + (1.0 - amount) * _c0.rgb, _c0.a);
`})
