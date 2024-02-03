// Hi I'm emptyflash
// I'm livecoding in hydra
// Here's a script of some stuff I like to use
await import("https://livecode.emptyfla.sh/hydra/all.js")

a.show()
let audioTime = 0
update = () => {
	audioTime += a.fft[3]
}
let frame = 0
src(o0)
	//.sort(0, () => frame++, [1, 1], [1, 0])
	.diff(
		osc(2, .1, 1)
		.modulate(warp(1, 1, 2, 2, 2)
		)
		//.repeat(2, 2)
  		,0.3
	)
	.colorama([0.002, 0.003, 0.001])
	.hyperbole8([0.3, 0.2, 0.4, 0.09, 0.02, 0.03].fast(0.5)
		.ease('easeInOutCubic'))
	.scale(() => Math.sin(audioTime * .1) * 0.1 + 1.0)
	//.rotate(() => a.fft[2] * Math.PI, 0)
	.out()