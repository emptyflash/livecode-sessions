// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
src(o0)
	.add(
		osc(20, .1, .6)
		.rotate(Math.PI / 2)
		.modulateScale(noise(2, .1), .5), [-.016, .015]
		.smooth())
	.modulateScale(noise(2, .1), .01)
	.modulateRotate(noise(1, .1), .01)
	.scale(1.015)
	.scrollX([.0015, -.0015].ease('easeInOutCubic'))
	.out()
