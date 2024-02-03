await import("https://hyper-hydra.glitch.me/hydra-convolutions.js")
await import("https://livecode.emptyfla.sh/hydra/all.js")

blur(o0, 1)
	.out(o1)

sharpen(o1, 1)
	.out(o2)

warp(1, .1)
	.out(o3)

src(o2)
	.blend(osc(10, .1)
		.thresh()
		.mult(osc(10, .1)
			.thresh()
			.rotate(Math.PI / 2, .1)).luma(), [.15, .33]
		.smooth())
	.modulateRotate(src(o3), .05)
	.modulateScale(src(o3).scale(.9), .1)
	.out()