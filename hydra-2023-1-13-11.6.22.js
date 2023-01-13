bpm = 160

src(o0)
	.blend(osc(40, .1, 1)
		.modulate(noise(1))
		.rotate(.1, .1), [0.009, 0.05].fast(0.25).smooth())
	.modulateHue(o0, 40)
	.scale(1.001)
	.out()