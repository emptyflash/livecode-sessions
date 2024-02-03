await import("https://cdn.statically.io/gl/emptyflash/extra-shaders-for-hydra/main/lib/all.js")

s0.initCam()

src(s0)
	.diff(o0)
.diff(osc(1,1,1))
	.scale(1.2)
	.rotate(.1,.1)
	//.scrollX(.1,-.1)
	.hyperbole4([0.9, 0.1, 0.3, 1.1].ease('easeInOutCubic'))
	.out()