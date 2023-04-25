await import("https://emptyfla.sh/bl4st/bundle-global.js")

flameEngine.setConfig(
	flame()
	.colorful(.7)
	.mapExposure(2)
	.addTransform(
		transform()
		.hyperbolic()
		.rotateX()
		.build()
	)
	.addTransform(
		transform()
		.fisheye()
		.rotateY()
		.build()
	)
	.addTransform(
		transform()
		.fisheye()
		.rotateO()
		.build()
	)
)

flameEngine.start()

s0.init({
	src: flameEngine.canvas
})

src(o0)
	.diff(
		src(s0)
		.luma())
// 	.scrollX(.1,.1)
	.scale(1.002)
	.modulateRotate(noise(1), .01)
	.out()