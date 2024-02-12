await import("https://livecode.emptyfla.sh/hydra/all.js")

s0.initImage("https://i.imgur.com/R0g7R07.png")
s1.initVideo("https://content.jwplatform.com/videos/Fz9u0Nxz-dU9tCcor.mp4")
s2.initImage("https://i.imgur.com/Rj8pjrG.png")
s3.initImage("https://i.imgur.com/VcFSC7w.png")

let image = src(o1)
	.add(o2)

src(o0)
	.diff(image
		.mult(solid(1, 0, 0, 0), [1, 0].ease('easeInOutCubic')))
	.layer(src(s1)
        .scale(2)
		.luma(.1)
		.invert([0.4, 0].ease('easeInOutCubic')))
	.diff(src(s2))
	.modulateScale(warp(1, .08), .02)
	.modulateHue(o0, .8)
	.out(o0)

src(s0)
	.sobelx()
	.out(o1)

src(s0)
	.sobely()
	.out(o2)

src(o0)
	.layer(s3)
	.layer(s2)
	.out(o3)

render(o3)