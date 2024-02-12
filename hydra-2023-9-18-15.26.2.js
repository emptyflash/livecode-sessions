// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await import("https://livecode.emptyfla.sh/hydra/all.js")

src(o0)
	.layer(src(o2)
		.luma(.1))
	.layer(src(o3)
		.luma(.1))
	.modulateScale(src(o1)
		.pixelate(100, 100), .005)
	.modulateHue(src(o1), 5)
	.out()

osc(.5, .1, 1)
	.mask(
		warp(1, .05)
		.thresh(.01))
	.out(o1)

src(o1)
	.sobely()
	.out(o2)

src(o1)
	.sobelx()
	.out(o3)

render(o0)
