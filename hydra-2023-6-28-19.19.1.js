await import("https://livecode.emptyfla.sh/hydra/all.js")

src(o0)
	.dither()
	.out(o1)

src(o1)
	.diff(o0)
	.scale([.99, 1.01].fast(0.1)
		.ease('easeInOutCubic'))
	.mask(osc(10, .2)
		.scrollX(0, .03)
		.rotate(0, .07)
		.kaleid(2)
		.scrollY(0, .1)
		.kaleid(4))
	.out(o0)