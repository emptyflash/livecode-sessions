// Mirror Fractal Redux
// by emptyflash (https://emptyfla.sh)

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
	glsl: `vec2 st = _st * vec2(repeatX, repeatY);
         st.x = mod(floor(st.x), 2.0) == 0.0 ? fract(st.x) : 1.0 - fract(st.x);
         st.y = mod(floor(st.y), 2.0) == 0.0 ? fract(st.y) : 1.0 - fract(st.y);
        return st;`
}, )


src(o0)
	.diff(osc(5,.1,1).mask(shape(3, .3, .1)))
	.contrast(0.99)
	.scale(1.4)
	.scrollX(.1,.03)
	.rotate(.1,.05)
	.mirroredRepeat(2,2)
// 	.kaleid(2)
	.out()