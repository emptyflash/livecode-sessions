(async () => {
await loadScript("https://cdn.statically.io/gl/emptyflash/extra-shaders-for-hydra/main/lib/all.js")

src(o0)
	.scale(0.8)
	.rotate(.1, 0)
	.scrollX(.1, 0)
	.diff(
		osc(5, .05, 126)
		.kaleid(100)
		.modulate(warp(2, .05), .5)
	)
	.hyperbole([0.01, 0.3].fast(0.2).ease('easeInOutCubic'), 20)
	//.kaleid(2)
	// 	.modulateScale(shape(99, 0.1, 0.6)
	// 		.modulate(warp(.1, .1)).scrollY(.1,.1), 10)
	.out()
})()
