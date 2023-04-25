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
window.updateTextureParams = updateTextureParams

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


const shaderPark = await import("https://cdn.jsdelivr.net/gh/emptyflash/shader-park-core/dist/shader-park-core.esm.js")
window.sculptToHydraRenderer = shaderPark.sculptToHydraRenderer

await import("https://emptyfla.sh/bl4st/bundle-global.js")

setFunction({
	name: 'mirroredRepeat',
	type: 'coord',
	inputs: [{
			type: 'float',
			name: 'repeatX',
			default: 3,
		},
		{
			type: 'float',
			name: 'repeatY',
			default: 3,
		}
	],
	glsl: 'vec2 st = _st * vec2(repeatX, repeatY);'+
         'st.x = mod(floor(st.x), 2.0) == 0.0 ? fract(st.x) : 1.0 - fract(st.x);'+
         'st.y = mod(floor(st.y), 2.0) == 0.0 ? fract(st.y) : 1.0 - fract(st.y);'+
        'return st;'
})
