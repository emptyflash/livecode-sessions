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
