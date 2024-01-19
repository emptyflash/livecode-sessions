await import("https://livecode.emptyfla.sh/hydra/all.js")

// Hi I'm emptyflash
// The code you see creates the visuals

window.audioTime = window.audioTime || 0
update = () => {
	window.audioTime += a.fft[3]
}

flameEngine.setConfig(
	flame()
	.colorful(.7)
	.mapExposure(1.4)
	.addTransform(
		transform()
		.spherical()
		.rotateO(1, .1)
		.build()
	)
	.addTransform(
		transform()
		.hyperbolic()
		.rotateX(1, .1)
		.build()
	)
	.addTransform(
		transform()
		.fisheye()
		.rotateO(1, .4)
		.build()
	)
	.addTransform(
		transform()
		.heart()
		.rotateX(1, .5)
		.build()
	)
)
hush()
flameEngine.start()

s0.init({
	src: flameEngine.canvas
})

src(o0)
	// 	.diff(osc(4, .1, 1), .3)
	.diff(src(s0)
		.luma())
	.add(src(s0).rotate(), ()=>a.fft[2]*.1)
	// 		.rotate(()=>audioTime/1000, 0)
// 	.scrollX(() => audioTime / 1000, 0)
	// 	.modulateScale(noise(1), .01)
	// 		.modulate(noise(2), () => a.fft[2] * .01)
	// 	.modulateHue(o0, () => a.fft[0] * 20)
	// 	.mirroredRepeat([3, 5], [3, 5])
	// 		.hyperbole8([.01, .07, .03].ease('easeInOutCubic'))

// 	.modulateScale(shape([99, 4, 3], .3, .7), () => Math.sin(time) * a.fft[0] / 10)
		.modulateScale(noise(2, .4), ()=>0.1*a.fft[0])
	.out()