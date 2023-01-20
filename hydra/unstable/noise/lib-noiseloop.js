// licensed with GNU AFFERO GENERAL PUBLIC LICENSE Version 3
// author: Thomas Jourdan
setFunction({
  name: 'noiseloop',
  type: 'src',
  inputs: [
    {name: 'scale',  type: 'float', default: 10.0},
    {name: 'speed',  type: 'float', default:  1.0},
    {name: 'radius', type: 'float', default:  1.0},
  ],
  glsl: `
  return vec4(vec3(_noise4D(vec4(_st * scale,
                                 radius * cos(speed * time),
                                 radius * sin(speed * time)))), 1.0);
`})
