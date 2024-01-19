await import("https://livecode.emptyfla.sh/hydra/all.js")

flameEngine.setConfig(
	flame()
	.colorful(.6)
	.exposure(1.2)
	.addTransform(
		transform()
		.fisheye()
		.o([1, 0])
	)
	.addTransform(
		transform()
		.spherical()
		.rotateY(1, .1, 1.3)
	)
	.addTransform(
		transform()
		.hyperbolic()
		.rotateO(1, .1, 1.2)
	)
)
flameEngine.start()

s0.init({src: flameEngine.canvas})
src(s0).out()