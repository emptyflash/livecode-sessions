osc(10, 1, 126)
	.kaleid([5, 10, 4])
	.modulate(noise())
	.modulateScale(shape(100, 0.1, () => Math.abs(Math.sin(time))), 10.0)
	.modulateRotate(o0)
	.blend(src(o0))
	.colorama(0.09)
	.out()