await import("https://local.emptyfla.sh/bundle-global.js")

window.audioTime1 = window.audioTime1 || 0
window.audioTime2 = window.audioTime2 || 0
update = () => {
	audioTime1 += a.fft[0]
	audioTime2 += a.fft[3]
}

flameEngine.setConfig(
	flame()
	.screenInitScale(.2)
	.screenInitVal(.8)
	.colorful(0.4)
	.mapExposure(1.)
	.addTransform(
		transform()
		.sinusoidal()
		.rotateY(() => audioTime2 * .01, 0, 5)
		.build()
	)
	.addTransform(
		transform()
		.swirl()
		.x(() => [a.fft[0], .1])
		.build()
	)
	.addTransform(
		transform()
		.fisheye()
		.x(() => [.1, a.fft[2]*2+5])
		.rotateY(() => audioTime1 * .01, 0)
		.build()
	)
	.addTransform(
		transform()
		.fisheye()
		.rotateX(() => audioTime1 * .01, 0, .1)
		.build()
	)

	.view([1.1, 1.1, 0, 0])
)
flameEngine.start()

s0.init({
	src: flameEngine.canvas
})

src(o0)
		.layer(src(s0)
			.luma().rotate(.1,.1))
		.modulateScale(noise(10), .01)
	.out()