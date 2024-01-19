s0.initVideo("https://content.jwplatform.com/videos/L0EsXZLs-1hon4Bsu.mp4")
await import("https://livecode.emptyfla.sh/hydra/all.js")

src(s0)
	.scale(1, 1280 / 696)
	.sobelx()
	.out(o1)

src(o0)
	.diff(src(s0)
		.scale(1, 1280 / 696)
		.luma([.3, .1, .1]))
	.add(o1, .2)
	.modulateScale(noise(2), .01)
	.out(o0)

render(o0)