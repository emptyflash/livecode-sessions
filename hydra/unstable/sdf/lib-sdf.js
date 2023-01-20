// licensed with GNU AFFERO GENERAL PUBLIC LICENSE Version 3
// author: Thomas Jourdan
setFunction({
  name: 'sdf',
  type: 'color',
  inputs: [
    {name: 's',  type: 'float', default: 0.0},
    {name: 'ri', type: 'float', default: 0.7},
    {name: 'ro', type: 'float', default: 0.2},
    {name: 'h',  type: 'float', default: 0.1},
    {name: 'rx', type: 'float', default: 0.0},
    {name: 'ry', type: 'float', default: 0.0},
    {name: 'rz', type: 'float', default: 0.0},
  ],
  glsl: `
  const vec3 camera_position = vec3(0.0, 0.0, -1.5);
  return vec4(_sdf_ray_march(tex0,
                            _c0,
                             s,
                             camera_position,
                             vec3(2.0*(gl_FragCoord.xy/resolution.xy-vec2(0.5)), 1.0),
                             vec3(rx, ry, rz),
                             vec3(ri, ro, h)), 1.0);
`})
