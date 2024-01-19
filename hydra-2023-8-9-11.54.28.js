s0.initVideo("https://content.jwplatform.com/videos/ZP0EPXDc-czuqdBNV.mp4")

src(o0)
	.layer(src(s0)
		.luma([0.065,.3].ease('easeInOutCubic'))
		.scrollX(.1, .1)
	)
	.modulate(noise(2, [.01, 1].fast(.1)), [.005, .01])
	.out()