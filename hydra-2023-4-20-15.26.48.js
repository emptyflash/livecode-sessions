// You, Sorted
// by emptyflash (https://emtpyfla.sh)

await import("https://livecode.emptyfla.sh/hydra/all.js")

let frame = 0;

s0.initCam()

let cameraFlipped = src(s0)
	.scale(1, -1)

src(o0)
	.sort(0.1, () => frame++, [1, 1], [1, 0])
	.layer(cameraFlipped.luma())
	.out()

src(o0)
	.modulateScale(o0, .5)
	.modulateScale(o0, 1)
	.diff(osc(1, 1, 1)
		.modulate(cameraFlipped, 3)
		.modulate(warp(2), .01))
	.out(o1)

render(o1)