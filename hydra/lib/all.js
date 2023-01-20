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
// licensed with GNU AFFERO GENERAL PUBLIC LICENSE Version 3
// author: Thomas Jourdan
setFunction({
    name: 'ifpos',
    type: 'combine',
    inputs: [
      {name: 'value',    type: 'float', default: 1.0},
    ],
    glsl: `
    return value < 0.0 ? _c0 : _c1;
  `})
setFunction({
    name: 'ifeven',
    type: 'combine',
    inputs: [
      {name: 'value',  type: 'float', default: 0.0},
      {name: 'eps',    type: 'float', default: 0.01},
    ],
    glsl: `
    return abs(mod(floor(value), 2.0)) < eps ? _c0 : _c1;
  `})
  setFunction({
      name: 'ifzero',
      type: 'combine',
      inputs: [
        {name: 'value',  type: 'float', default: 0.0},
        {name: 'eps',    type: 'float', default: 0.1},
      ],
      glsl: `
      return abs(value) < eps ? _c0 : _c1;
    `})
setFunction({
    name: 'splitview',
    type: 'combine',
    inputs: [
      {name: 'where',  type: 'float', default: 0.5},
    ],
    glsl: `
    return gl_FragCoord.x/resolution.x > where ? _c0 : _c1;
  `})
setFunction({
    name: 'splitviewh',
    type: 'combine',
    inputs: [
      {name: 'where',  type: 'float', default: 0.5},
    ],
    glsl: `
    return gl_FragCoord.y/resolution.y > where ? _c0 : _c1;
  `})
// licensed with GNU AFFERO GENERAL PUBLIC LICENSE Version 3
// author: Thomas Jourdan
setFunction({
  name: 'whitenoise',
  type: 'src',
  inputs: [
    {name: 'size',    type: 'float', default: 10.0},
    {name: 'dynamic', type: 'float', default:  0.0},
  ],
  glsl: `
  // see: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
  const highp float a = 12.9898;
  const highp float b = 78.233;
  const highp float c = 43758.5453;
  highp float dt = dot(floor((_st * resolution) / size), vec2(dynamic*time) + vec2(a ,b));
  highp float sn = mod(dt, 3.141592653589793);
  highp float d = fract(sin(sn) * c);
  return vec4(d, d, d, 1);
`})
setFunction({
  name: 'colornoise',
  type: 'src',
  inputs: [
    {name: 'size',    type: 'float', default: 10.0},
    {name: 'dynamic', type: 'float', default:  0.0},
  ],
  glsl: `
  highp float rr;
  highp float gg;
  highp float bb;
  // see: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
  {
  const highp float a = 12.9898;
  const highp float b = 78.233;
  const highp float c = 43758.5453;
  highp float dt = dot(floor((_st * resolution) / size), vec2(dynamic*time) + vec2(a ,b));
  highp float sn= mod(dt, 3.141592653589793);
  rr = fract(sin(sn) * c);
  }
  {
  const highp float a = 12.9898;
  const highp float b = 78.233;
  const highp float c = 43758.5453;
  highp float dt = dot(floor((_st * resolution) / size) + vec2(0.123, 0.567), vec2(dynamic*time) + vec2(a ,b));
  highp float sn = mod(dt, 3.141592653589793);
  gg = fract(sin(sn) * c);
  }
  {
  const highp float a = 12.9898;
  const highp float b = 78.233;
  const highp float c = 43758.5453;
  highp float dt = dot(floor((_st * resolution) / size) + vec2(0.543, 0.905), vec2(dynamic*time) + vec2(a ,b));
  highp float sn = mod(dt, 3.141592653589793);
  bb = fract(sin(sn) * c);
  }
  return vec4(rr, gg, bb, 1);
`})
setFunction({
  name: 'unoise',
  type: 'src',
  inputs: [
    {name: 'scale',   type: 'float', default: 10.0},
    {name: 'offset',  type: 'float', default:  0.1},
  ],
  glsl: `
  float noi = _noise(vec3(_st*scale, offset*time));
  noi = 0.5 + 0.5 * noi;
  return vec4(noi, noi, noi, 1.0);
`})
setFunction({
  name: 'turb',
  type: 'src',
  inputs: [
    {name: 'scale',   type: 'float', default: 10.0},
    {name: 'offset',  type: 'float', default:  0.1},
    {name: 'octaves', type: 'float', default:  3.0},
  ],
  glsl: `
  int on = int(abs(octaves));
  float fr = fract(octaves);
  vec2 pos = scale * _st;
  float sc = 1.0;
  float fbm = 0.0;
  for (int io = 0; io<8; io++) {
    fbm += sc * _noise(vec3(pos, offset * time));
    pos *= 2.0;
    sc /= 2.0;
    if(io >= on) break;
  }
  fbm += fr * sc * _noise(vec3(pos, offset * time));
  return vec4(fbm, fbm, fbm, 1.0);
`})
setFunction({
  name: 'uturb',
  type: 'src',
  inputs: [
    {name: 'scale',   type: 'float', default: 10.0},
    {name: 'offset',  type: 'float', default:  0.1},
    {name: 'octaves', type: 'float', default:  3.0},
  ],
  glsl: `
  int on = int(abs(octaves));
  float fr = fract(octaves);
  vec2 pos = scale * _st;
  float sc = 1.0;
  float fbm = 0.0;
  for (int io = 0; io<8; io++) {
    fbm += sc*_noise(vec3(pos, offset*time));
    pos *= 2.0;
    sc /= 2.0;
    if(io >= on) break;
  }
  fbm += fr * sc * _noise(vec3(pos, offset * time));
  fbm = 0.5 + 0.5 * fbm;
  return vec4(fbm, fbm, fbm, 1.0);
`})
// inspired by Inigo Quilez: domain warping - 2002
// see: https://www.iquilezles.org/www/articles/warp/warp.htm
setFunction({
  name: 'warp',
  type: 'src',
  inputs: [
    {name: 'scalei',       type: 'float', default: 10.0},
    {name: 'offset',       type: 'float', default:  0.1},
    {name: 'octaves',      type: 'float', default:  2.0},
    {name: 'octavesinner', type: 'float', default:  3.0},
    {name: 'scale',        type: 'float', default:  1.0},
  ],
  glsl: `
  int oin = int(abs(octavesinner));
  float fri = fract(octavesinner);
  float fbmx = 0.0;
  {
  vec2 pos = scalei * _st;
  float sc = 1.0;
  for (int io = 0; io<8; io++) {
    fbmx += sc * _noise(vec3(pos, offset * time));
    pos *= 2.0;
    sc /= 2.0;
    if(io >= oin) break;
  }
  fbmx += fri * sc * _noise(vec3(pos, offset * time));
  }
  float fbmy = 0.0;
  {
  vec2 pos = scalei * (_st + vec2(5.123, 3.987));
  float sc = 1.0;
  for (int io = 0; io<8; io++) {
    fbmy += sc * _noise(vec3(pos, offset * time));
    pos *= 2.0;
    sc /= 2.0;
    if(io >= oin) break;
  }
  fbmy += fri * sc * _noise(vec3(pos, offset * time));
  }
  int on = int(abs(octaves));
  float fr = fract(octaves);
  float fbm = 0.0;
  vec2 pos = scale * vec2(fbmx, fbmy);
  float sc = 1.0;
  for (int io = 0; io<8; io++) {
    fbm += sc * _noise(vec3(pos, offset * time));
    pos *= 2.0;
    sc /= 2.0;
    if(io >= on) break;
  }
  fbm += fr * sc * _noise(vec3(pos, offset * time));
  return vec4(fbm, fbm, fbm, 1.0);
`})
setFunction({
  name: 'cwarp',
  type: 'src',
  inputs: [
    {name: 'scalei',       type: 'float', default: 10.0},
    {name: 'offset',       type: 'float', default:  0.1},
    {name: 'octaves',      type: 'float', default:  2.0},
    {name: 'octavesinner', type: 'float', default:  3.0},
    {name: 'scale',        type: 'float', default:  1.0},
    {name: 'focus',        type: 'float', default:  0.5},
  ],
  glsl: `
  #define FOCUS pow(r, abs(focus))
  float r = length(vec2(_st.y-0.5, _st.x-0.5));
  int oin = int(abs(octavesinner));
  float fri = fract(octavesinner);
  float fbmx = 0.0;
  {
  vec2 pos = scalei * _st;
  float sc = 1.0;
  for (int io = 0; io<8; io++) {
    fbmx += sc * _noise(vec3(pos, offset * time));
    pos *= 2.0;
    sc /= 2.0;
    if(io >= oin) break;
  }
  fbmx += fri * sc * _noise(vec3(pos, offset * time));
  fbmx = (0.5 + 0.5 * fbmx) - FOCUS;
  }
  float fbmy = 0.0;
  {
  vec2 pos = scalei * (_st + vec2(5.123, 3.987));
  float sc = 1.0;
  for (int io = 0; io<8; io++) {
    fbmy += sc * _noise(vec3(pos, offset * time));
    pos *= 2.0;
    sc /= 2.0;
    if(io >= oin) break;
  }
  fbmy += fri * sc * _noise(vec3(pos, offset * time));
  fbmy = (0.5 + 0.5 * fbmy) - FOCUS;
  }
  int on = int(abs(octaves));
  float fr = fract(octaves);
  float fbm = 0.0;
  vec2 pos = scale * vec2(fbmx, fbmy);
  float sc = 1.0;
  for (int io = 0; io<8; io++) {
    fbm += sc*_noise(vec3(pos, offset*time));
    pos *= 2.0;
    sc /= 2.0;
    if(io >= on) break;
  }
  fbm += fr * sc * _noise(vec3(pos, offset * time));
  fbm = (0.5 + 0.5 * fbm) - FOCUS;
  return vec4(fbm, fbm, fbm, 1.0);
`})
// licensed with GNU AFFERO GENERAL PUBLIC LICENSE Version 3
// author: Thomas Jourdan
//
// see: Ebert, Musgrave, Peachey, Perlin Worley
// "Texturing and Modeling – A Procedural Approach"
setFunction({
  name: 'pulse',
  type: 'src',
  inputs: [
    {name: 'edge',    type: 'float', default: 0.5},
    {name: 'width',   type: 'float', default: 0.05},
    {name: 'epsilon', type: 'float', default: 0.001},
  ],
  glsl: `
    float ea = abs(epsilon);
    float wa = abs(width);
    float d0 = smoothstep(edge-ea, edge+ea, _st.x);
    float d1 = smoothstep(edge+wa-ea, edge+wa+ea, _st.x);
    float d = d0-d1;
    return vec4(d, d, d, 1);
`})
setFunction({
  name: 'pulsetrain',
  type: 'src',
  inputs: [
    {name: 'train',   type: 'float', default: 3.0},
    {name: 'edge',    type: 'float', default: 0.5},
    {name: 'width',   type: 'float', default: 0.05},
    {name: 'epsilon', type: 'float', default: 0.001},
  ],
  glsl: `
    float ea = abs(epsilon);
    float wa = abs(width);
    float xp = _st.x;
    float d = 0.0;
    int itr = int(train);
    for(int ii = 0; ii < 10; ii++) {
      float d0 = smoothstep(edge-ea, edge+ea, xp);
      float d1 = smoothstep(edge+wa-ea, edge+wa+ea, xp);
      if(ii >= itr) break;
      d += d0-d1;
      xp += 1.0 / float(itr);
    }
    return vec4(d, d, d, 1);
`})
// see: https://andrewhungblog.wordpress.com/2018/07/28/shader-art-tutorial-hexagonal-grids/
setFunction({
  name: 'hextile',
  type: 'src',
  inputs: [
    {name: 'tiles',   type: 'float', default: 10.0},
  ],
  glsl: `
  const vec2 s = vec2(1.0, sqrt(3.0));
  vec2 p = (_st - 0.5) * tiles;
  vec4 hC = floor(vec4(p, p - vec2(0.5, 1)) / s.xyxy) + 0.5;
  vec4 h = vec4(p - hC.xy*s, p - (hC.zw + 0.5) * s);
  float d = length(h.xy) < length(h.zw) ?
            fract(p.x*0.5) < 0.5 ? 0.75 : 0.0 :
            fract(p.x*0.5-s.y-0.01) < 0.5 ? 0.25 : 1.0;
  return vec4(d, d, d, 1);
`})
setFunction({
  name: 'checker',
  type: 'src',
  inputs: [
    {name: 'repeats',   type: 'float', default: 10},
  ],
  glsl: `
  vec2 c = floor(repeats * (_st - 0.5));
  float d = sign(mod(c.x + c.y, 2.0));
  return vec4(d, d, d, 1);
`})
setFunction({
  name: 'concentric',
  type: 'src',
  inputs: [
    {name: 'scale',   type: 'float', default: 100},
    {name: 'centerX', type: 'float', default: 0.5},
    {name: 'centerY', type: 'float', default: 0.5},
  ],
  glsl: `
   float d = sin(scale*distance(_st, vec2(centerX, centerY)));
   return vec4(d, d, d, 1);
`})
setFunction({
  name: 'spiral',
  type: 'src',
  inputs: [
    {name: 'a',         type: 'float', default: 1.0},
    {name: 'b',         type: 'float', default: 5.0},
    {name: 'thickness', type: 'float', default: 0.1},
  ],
  glsl: `
    vec2 center = _st - vec2(0.5);
    float thick = clamp(thickness, 0.0, 1.0);
    float phi = atan(center.y, center.x) / 6.283185307179586 + 0.5;
    float r = length(center);
    float where = mod(a* phi - b *r, 1.0);
    const float epsilon = 0.00001;
    float d = smoothstep(epsilon, epsilon, where)
            - smoothstep(thick-epsilon, thick+epsilon, where);
    return vec4(d, d, d, 1);
`})
// see: Darwyn Peachey, Building Procedural Textures, page 37
setFunction({
  name: 'brick',
  type: 'src',
  inputs: [
    {name: 'width',  type: 'float', default: 0.25},
    {name: 'height', type: 'float', default: 0.08},
    {name: 'gap',    type: 'float', default: 0.01},
  ],
  glsl: `
  vec2 p = _st-0.5;
  const float eps = 0.001;
  float BMWIDTH = width+gap;
  float BMHEIGHT = height+gap;
  float MWF = gap * 0.5 / BMWIDTH;
  float MHF = gap * 0.5 / BMHEIGHT;
  float bms = p.x / BMWIDTH;
  float bmt = p.y / BMHEIGHT;
  if(mod(bmt*0.5, 1.0) > 0.5)
    bms += 0.5;
  float sbrick = floor(bms);
  float tbrick = floor(bmt);
  bms -= sbrick;
  bmt -= tbrick;
  float w = smoothstep(MWF, MWF+eps, bms) - smoothstep(1.0-MWF-eps, 1.0-MWF, bms);
  float h = smoothstep(MHF, MHF+eps, bmt) - smoothstep(1.0-MHF-eps, 1.0-MHF, bmt);
  float d = w*h;
  return vec4(d, d, d, 1);
`})
setFunction({
  name: 'wave',
  type: 'src',
  inputs: [
    {name: 'time',    type: 'float', default: 0.0},
    {name: 'frequ',   type: 'float', default: 10.0},
    {name: 'loops',   type: 'float', default: 3.0},
    {name: 'thick',   type: 'float', default: 0.025},
  ],
  glsl: `
  const float eps = 0.001;
  float x = _st.x - time;
  float y = _st.y - 0.5;
  float scale = 0.25;
  float l = 0.0;
  for(int i=0; i<6; ++i) {
    y += scale * sin(frequ * x);
    if(l >= loops) break;
    scale *= 0.5;
    frequ *= 2.0;
    l += 1.0;
  }
  float d = smoothstep(0.0, eps, y) - smoothstep(thick, thick+eps, y);
  return vec4(d, d, d, 1);
`})
// see: https://en.wikipedia.org/wiki/Harmonograph
setFunction({
  name: 'lissa',
  type: 'src',
  inputs: [
    {name: 'time',   type: 'float', default: 0.0},
    {name: 'frequ',   type: 'float', default: 10.0},
    {name: 'loops',   type: 'float', default: 3.0},
    {name: 'thick',   type: 'float', default: 0.025},
  ],
  glsl: `
  const float eps = 0.001;
  _st -= 0.5;
  vec2 pol = vec2(
    atan(_st.y, _st.x),
    2.0*length(_st)
  );
  float x = pol.x - time;
  float y = pol.y - 0.5;
  float scale = 0.25;
  float l = 0.0;
  for(int i=0; i<6; ++i) {
    y += scale * sin(frequ * x);
    if(l >= loops) break;
    scale *= 0.5;
    frequ *= 2.0;
    l += 1.0;
  }
  float d = smoothstep(0.0, eps, y) - smoothstep(thick, thick+eps, y);
  return vec4(d, d, d, 1);
`})
// licensed with GNU AFFERO GENERAL PUBLIC LICENSE Version 3
// author: Thomas Jourdan
// see: 4x4 Bayer Dithering by kbjwes77
// see: https://www.shadertoy.com/view/WstXR8
setFunction({
  name: 'dither',
  type: 'color',
  inputs: [
  ],
  glsl: `
  float lum = 0.299 * _c0.r + 0.587 * _c0.g + 0.114 * _c0.b;
  int x = int(mod(gl_FragCoord.x, 4.0));
  int y = int(mod(gl_FragCoord.y, 4.0));
  float bayer = 0.0;
  if(x == 0) {
    if(y == 0) {
    }
    else if(y == 1) {
      bayer = 8.0/16.0;
    }
    else if(y == 2) {
      bayer = 2.0/16.0;
    }
    else if(y == 3) {
      bayer = 10.0/16.0;
    }
  }
  else if(x == 1) {
    if(y == 0) {
      bayer = 12.0/16.0;
    }
    else if(y == 1) {
      bayer = 4.0/16.0;
    }
    else if(y == 2) {
      bayer = 14.0/16.0;
    }
    else if(y == 3) {
      bayer = 6.0/16.0;
    }
  }
  else if(x == 2) {
    if(y == 0) {
      bayer = 3.0;
    }
    else if(y == 1) {
      bayer = 11.0/16.0;
    }
    else if(y == 2) {
      bayer = 1.0/16.0;
    }
    else if(y == 3) {
      bayer = 9.0/16.0;
    }
  }
  else if(x == 3) {
    if(y == 0) {
      bayer = 15.0/16.0;
    }
    else if(y == 1) {
      bayer = 7.0/16.0;
    }
    else if(y == 2) {
      bayer = 13.0/16.0;
    }
    else if(y == 3) {
      bayer = 5.0/16.0;
    }
  }
  return (lum+1.0/32.0) > bayer ? vec4(1, 1, 1, _c0.a) : vec4(0, 0, 0, _c0.a);
`})
setFunction({
  name: 'dither2',
  type: 'color',
  inputs: [
  ],
  glsl: `
  float lum = 0.299 * _c0.r + 0.587 * _c0.g + 0.114 * _c0.b;
  int x = int(mod(gl_FragCoord.x, 2.0));
  int y = int(mod(gl_FragCoord.y, 2.0));
  float bayer = 0.0;
  if(x == 0) {
    if(y == 0) {
    }
    else if(y == 1) {
      bayer = 3.0/4.0;
    }
  }
  else if(x == 1) {
    if(y == 0) {
      bayer = 2.0/4.0;
    }
    else if(y == 1) {
      bayer = 1.0/14.0;
    }
  }
  bayer += 1.0/8.0;
  return vec4(
    step(bayer, _c0.r),
    step(bayer, _c0.g),
    step(bayer, _c0.b),
    _c0.a);
`})
setFunction({
  name: 'dither4',
  type: 'color',
  inputs: [
  ],
  glsl: `
  int x = int(mod(gl_FragCoord.x, 4.0));
  int y = int(mod(gl_FragCoord.y, 4.0));
  float bayer = 1.0/32.0;
  if(x == 0) {
    if(y == 0) {
    }
    else if(y == 1) {
      bayer = 8.0/16.0+1.0/32.0;
    }
    else if(y == 2) {
      bayer = 2.0/16.0+1.0/32.0;
    }
    else if(y == 3) {
      bayer = 10.0/16.0+1.0/32.0;
    }
  }
  else if(x == 1) {
    if(y == 0) {
      bayer = 12.0+1.0/32.0;
    }
    else if(y == 1) {
      bayer = 4.0/16.0+1.0/32.0;
    }
    else if(y == 2) {
      bayer = 14.0/16.0+1.0/32.0;
    }
    else if(y == 3) {
      bayer = 6.0/16.0+1.0/32.0;
    }
  }
  else if(x == 2) {
    if(y == 0) {
      bayer = 3.0;
    }
    else if(y == 1) {
      bayer = 11.0/16.0+1.0/32.0;
    }
    else if(y == 2) {
      bayer = 1.0/16.0+1.0/32.0;
    }
    else if(y == 3) {
      bayer = 9.0/16.0+1.0/32.0;
    }
  }
  else if(x == 3) {
    if(y == 0) {
      bayer = 15.0/16.0+1.0/32.0;
    }
    else if(y == 1) {
      bayer = 7.0/16.0+1.0/32.0;
    }
    else if(y == 2) {
      bayer = 13.0/16.0+1.0/32.0;
    }
    else if(y == 3) {
      bayer = 5.0/16.0+1.0/32.0;
    }
  }
  return vec4(
    step(bayer, _c0.r),
    step(bayer, _c0.g),
    step(bayer, _c0.b),
    _c0.a);
`})
setFunction({
  name: 'ditherrnd',
  type: 'color',
  inputs: [
  ],
  glsl: `
  float lum = 0.299 * _c0.r + 0.587 * _c0.g + 0.114 * _c0.b;
  // see: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
  const highp float a = 12.9898;
  const highp float b = 78.233;
  const highp float c = 43758.5453;
  highp float dt= dot(gl_FragCoord.xy ,vec2(a ,b));
  highp float sn= mod(dt, 3.141592653589793);
  highp float tresh = fract(sin(sn) * c);
  return lum > tresh ? vec4(1, 1, 1, _c0.a) : vec4(0, 0, 0, _c0.a);
`})
setFunction({
  name: 'ditherrndcolor',
  type: 'color',
  inputs: [
  ],
  glsl: `
  float lum = 0.299 * _c0.r + 0.587 * _c0.g + 0.114 * _c0.b;
  // see: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
  const highp float a = 12.9898;
  const highp float b = 78.233;
  const highp float c = 43758.5453;
  highp float dt= dot(gl_FragCoord.xy ,vec2(a ,b));
  highp float sn= mod(dt, 3.141592653589793);
  highp float tresh = fract(sin(sn) * c);
  return vec4(
    step(tresh, _c0.r),
    step(tresh, _c0.g),
    step(tresh, _c0.b),
    _c0.a);
`})
setFunction({
  name: 'erode',
  type: 'color',
  inputs: [
  ],
  glsl: `
  vec3 outputColor = vec3(1.0);
	outputColor = min(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  1))/resolution.xy).rgb);
	outputColor = min(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2( 0,  1))/resolution.xy).rgb);
	outputColor = min(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  1))/resolution.xy).rgb);
	outputColor = min(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  0))/resolution.xy).rgb);
	outputColor = min(outputColor, texture2D(tex0, (gl_FragCoord.xy)/resolution.xy).rgb);
	outputColor = min(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  0))/resolution.xy).rgb);
	outputColor = min(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2(-1, -1))/resolution.xy).rgb);
	outputColor = min(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2( 0, -1))/resolution.xy).rgb);
	outputColor = min(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2( 1, -1))/resolution.xy).rgb);
  return vec4(outputColor, _c0.a);
`})
setFunction({
  name: 'dilate',
  type: 'color',
  inputs: [
  ],
  glsl: `
  vec3 outputColor = vec3(0.0);
	outputColor = max(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  1))/resolution.xy).rgb);
	outputColor = max(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2( 0,  1))/resolution.xy).rgb);
	outputColor = max(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  1))/resolution.xy).rgb);
	outputColor = max(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  0))/resolution.xy).rgb);
	outputColor = max(outputColor, texture2D(tex0, (gl_FragCoord.xy)/resolution.xy).rgb);
	outputColor = max(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  0))/resolution.xy).rgb);
	outputColor = max(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2(-1, -1))/resolution.xy).rgb);
	outputColor = max(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2( 0, -1))/resolution.xy).rgb);
	outputColor = max(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2( 1, -1))/resolution.xy).rgb);
  return vec4(outputColor, _c0.a);
`})
setFunction({
  name: 'blur',
  type: 'color',
  inputs: [
  ],
  glsl: `
  vec3 outputColor;
	outputColor  = 0.077847 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  1))/resolution.xy).rgb;
	outputColor += 0.123317 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0,  1))/resolution.xy).rgb;
	outputColor += 0.077847 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  1))/resolution.xy).rgb;
	outputColor += 0.123317 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  0))/resolution.xy).rgb;
	outputColor += 0.195346 * texture2D(tex0, (gl_FragCoord.xy)/resolution.xy).rgb;
	outputColor += 0.123317 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  0))/resolution.xy).rgb;
	outputColor += 0.077847 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1, -1))/resolution.xy).rgb;
	outputColor += 0.123317 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0, -1))/resolution.xy).rgb;
	outputColor += 0.077847 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1, -1))/resolution.xy).rgb;
  return vec4(outputColor, _c0.a);
`})
setFunction({
  name: 'blurmore',
  type: 'color',
  inputs: [
  ],
  glsl: `
  vec3 outputColor;
  outputColor  = 0.003765 * texture2D(tex0, (gl_FragCoord.xy + vec2(-2, -2))/resolution.xy).rgb;
  outputColor += 0.015019 * texture2D(tex0, (gl_FragCoord.xy + vec2(-2, -1))/resolution.xy).rgb;
  outputColor += 0.023792 * texture2D(tex0, (gl_FragCoord.xy + vec2(-2,  0))/resolution.xy).rgb;
  outputColor += 0.015019 * texture2D(tex0, (gl_FragCoord.xy + vec2(-2,  1))/resolution.xy).rgb;
  outputColor += 0.003765 * texture2D(tex0, (gl_FragCoord.xy + vec2(-2,  2))/resolution.xy).rgb;
  outputColor += 0.015019 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1, -2))/resolution.xy).rgb;
  outputColor += 0.059912 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1, -1))/resolution.xy).rgb;
  outputColor += 0.094907 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  0))/resolution.xy).rgb;
  outputColor += 0.059912 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  1))/resolution.xy).rgb;
  outputColor += 0.015019 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  2))/resolution.xy).rgb;
  outputColor += 0.023792 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0, -2))/resolution.xy).rgb;
  outputColor += 0.094907 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0, -1))/resolution.xy).rgb;
  outputColor += 0.150342 * texture2D(tex0, gl_FragCoord.xy/resolution.xy).rgb;
  outputColor += 0.094907 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0,  1))/resolution.xy).rgb;
  outputColor += 0.023792 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0,  2))/resolution.xy).rgb;
  outputColor += 0.015019 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1, -2))/resolution.xy).rgb;
  outputColor += 0.059912 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1, -1))/resolution.xy).rgb;
  outputColor += 0.094907 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  0))/resolution.xy).rgb;
  outputColor += 0.059912 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  1))/resolution.xy).rgb;
  outputColor += 0.015019 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  2))/resolution.xy).rgb;
  outputColor += 0.003765 * texture2D(tex0, (gl_FragCoord.xy + vec2( 2, -2))/resolution.xy).rgb;
  outputColor += 0.015019 * texture2D(tex0, (gl_FragCoord.xy + vec2( 2, -1))/resolution.xy).rgb;
  outputColor += 0.023792 * texture2D(tex0, (gl_FragCoord.xy + vec2( 2,  0))/resolution.xy).rgb;
  outputColor += 0.015019 * texture2D(tex0, (gl_FragCoord.xy + vec2( 2,  1))/resolution.xy).rgb;
  outputColor += 0.003765 * texture2D(tex0, (gl_FragCoord.xy + vec2( 2,  2))/resolution.xy).rgb;
  return vec4(outputColor, _c0.a);
`})
setFunction({
  name: 'edge',
  type: 'color',
  inputs: [
  ],
  glsl: `
  vec3 outputColor;
	outputColor  = -1.0/8.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  1))/resolution.xy).rgb;
	outputColor += -1.0/8.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0,  1))/resolution.xy).rgb;
	outputColor += -1.0/8.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  1))/resolution.xy).rgb;
	outputColor += -1.0/8.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  0))/resolution.xy).rgb;
	outputColor += 1.0 *      texture2D(tex0, (gl_FragCoord.xy)/resolution.xy).rgb;
	outputColor += -1.0/8.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  0))/resolution.xy).rgb;
	outputColor += -1.0/8.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1, -1))/resolution.xy).rgb;
	outputColor += -1.0/8.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0, -1))/resolution.xy).rgb;
	outputColor += -1.0/8.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1, -1))/resolution.xy).rgb;
  return vec4(outputColor, _c0.a);
`})
setFunction({
  name: 'sobelx',
  type: 'color',
  inputs: [
  ],
  glsl: `
  vec3 outputColor;
	outputColor  = -1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  1))/resolution.xy).rgb;
	outputColor += -2.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0,  1))/resolution.xy).rgb;
	outputColor += -1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  1))/resolution.xy).rgb;
	outputColor +=  1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1, -1))/resolution.xy).rgb;
	outputColor +=  2.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0, -1))/resolution.xy).rgb;
	outputColor +=  1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1, -1))/resolution.xy).rgb;
  return vec4(outputColor, _c0.a);
`})
setFunction({
  name: 'sobely',
  type: 'color',
  inputs: [
  ],
  glsl: `
  vec3 outputColor;
  outputColor  = -1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  1))/resolution.xy).rgb;
	outputColor +=  0.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0,  1))/resolution.xy).rgb;
	outputColor +=  1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  1))/resolution.xy).rgb;
	outputColor += -2.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  0))/resolution.xy).rgb;
	outputColor += 0.0 *      texture2D(tex0, (gl_FragCoord.xy)/resolution.xy).rgb;
	outputColor +=  2.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  0))/resolution.xy).rgb;
	outputColor += -1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1, -1))/resolution.xy).rgb;
	outputColor +=  0.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0, -1))/resolution.xy).rgb;
	outputColor +=  1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1, -1))/resolution.xy).rgb;
  return vec4(outputColor, _c0.a);
`})
setFunction({
  name: 'sharpen',
  type: 'color',
  inputs: [
  ],
  glsl: `
  vec3 outputColor;
	outputColor  = -1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0,  1))/resolution.xy).rgb;
	outputColor += -1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  0))/resolution.xy).rgb;
	outputColor += 5.0 *      texture2D(tex0, (gl_FragCoord.xy)/resolution.xy).rgb;
	outputColor += -1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  0))/resolution.xy).rgb;
	outputColor += -1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0, -1))/resolution.xy).rgb;
  return vec4(outputColor, _c0.a);
`})
setFunction({
  name: 'emboss',
  type: 'color',
  inputs: [
  ],
  glsl: `
  vec3 outputColor;
	outputColor  = -2.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  1))/resolution.xy).rgb;
	outputColor += -1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0,  1))/resolution.xy).rgb;
	outputColor += -1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  0))/resolution.xy).rgb;
	outputColor +=  1.0 * texture2D(tex0, (gl_FragCoord.xy)/resolution.xy).rgb;
	outputColor +=  1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  0))/resolution.xy).rgb;
	outputColor +=  1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0, -1))/resolution.xy).rgb;
	outputColor +=  2.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1, -1))/resolution.xy).rgb;
  return vec4(outputColor, _c0.a);
`})
setFunction({
  name: 'altline',
  type: 'color',
  inputs: [
    {name: 'width', type: 'float', default: 1.0},
  ],
  glsl: `
  if(int(mod(gl_FragCoord.y/max(width,1.0), 2.0)) == 0)
    return texture2D(tex0, gl_FragCoord.xy/resolution.xy);
  vec2 p = vec2(resolution.x - gl_FragCoord.x, gl_FragCoord.y);
  return texture2D(tex0, p/resolution.xy);
`})
// From https://ciphrd.com/2020/04/08/pixel-sorting-on-shader-using-well-crafted-sorting-filters-glsl/
setFunction({
  name: 'sort',
  type: 'color',
  inputs: [
    {name: 'threshold', type: 'float', default: 0.2},
    {name: 'frame', type: 'int', default: 0},
    {name: 'dirX', type: 'float', default: 1},
    {name: 'dirY', type: 'float', default: 0},
  ],
  glsl: `
  vec2 uv2 = gl_FragCoord.xy/resolution.xy;
  float fParity = mod(float(frame), 2.) * 2. - 1.;
  float vp = mod(floor(uv2.x * resolution.x), 2.0) * 2. - 1.;
  vec2 dir = vec2(dirX, dirY);
  dir *= fParity * vp;
	dir /= resolution.xy;
  vec4 curr = texture2D(tex0, uv2);
	vec4 comp = texture2D(tex0, uv2 + dir);
  float gCurr = (curr.r+curr.g+curr.b)/3.; // gscale(curr.rgb);
	float gComp = (comp.r+comp.g+comp.b)/3.; // gscale(comp.rgb);
  if (uv2.x + dir.x < 0.0 || uv2.x + dir.x > 1.0) {
		return curr;
	}
  if (dir.x < 0.0) {
		if (gCurr > threshold && gComp > gCurr) {
			return comp;
		} else {
			return curr;
		}
	} 
	else {
		if (gComp > threshold && gCurr >= gComp) {
			return comp;
		} else {
			return curr;
		}
	}
`})
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
function pow2ceil(v) {
  var p = 2;
  while (v >>= 1) {
    p <<= 1;
  }
  return p;
}

export function updateTextureParams(output, params) {
  let newWidth = width;
  let newHeight = height;
  if (params?.wrap?.[0] == "mirror" || params?.wrapS == "mirror" || params?.wrap?.[1] == "mirror" || params?.wrapT == "mirror") {
    newWidth = pow2ceil(width);
    newHeight  = pow2ceil(height);
  }
  output.fbos = (Array(2)).fill().map(() => output.regl.framebuffer({
    color: output.regl.texture({
      mag: 'nearest',
      width: newWidth,
      height: newHeight,
      format: 'rgba',
      ...params,
    }),
    depthStencil: false
  }))
}

setFunction({
  name: 'src2',
  type: 'src',
  inputs: [
    {
      type: 'sampler2D',
      name: 'tex',
      default: NaN,
    }
  ],
  glsl:
`return texture2D(tex, _st);`
});

setFunction({
	name: 'scrollX2',
	type: 'coord',
	inputs: [{
			type: 'float',
			name: 'scrollX',
			default: 0.5,
		},
		{
			type: 'float',
			name: 'speed',
			default: 0,
		}
	],
	glsl: `   _st.x += scrollX + time*speed;
   return _st;`
});

setFunction({
	name: 'scrollY2',
	type: 'coord',
	inputs: [{
			type: 'float',
			name: 'scrollY_',
			default: 0.5,
		},
		{
			type: 'float',
			name: 'speed',
			default: 0,
		}
	],
	glsl: `   _st.y += scrollY_ + time*speed;
   return _st;`
});
