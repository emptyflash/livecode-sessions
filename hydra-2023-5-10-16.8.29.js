await import("https://livecode.emptyfla.sh/hydra/all.js")

flameEngine.setConfig(
	flame()
	.colorful(.5)
	.exposure(2)
	.addTransform(
		transform()
		.spherical()
		.rotateO(1, 1)
	)
	.addTransform(
		transform()
		.fisheye()
// 		.rotateO(1, .1)
	)
	.addTransform(
		transform()
		.heart()
// 		.rotateX(1, .1)
	)
)
flameEngine.start()
s0.init({
	src: flameEngine.canvas
})

src(o0)
	// 	.diff(osc(5, .5, 2), [0, 1].smooth())
// 	.add(src(s0)
// 		.mask(noise()), [1, 0].ease('easeInOutCubic'))
	.rotate(.1, .1)
		.scrollY(.1, .1)
		.kaleid(4)
// 	.hyperbole4([.08, .001, .005].ease('easeInOutCubic'))
// 	.scrollX(.5, 0)
// 	.modulateScale(noise(1), .1)
	.layer(src(s0).luma())
	.out()