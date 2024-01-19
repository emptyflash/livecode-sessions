await import("https://livecode.emptyfla.sh/hydra/all.js")

src(o0)
	.layer(osc(30, 0.05)
		.color(
			[220 / 255, 162 / 255, 37 / 255].ease('easeInOutCubic'),
			[243 / 255, 210 / 255, 127 / 255].ease('easeInOutCubic'),
			[255 / 255, 223 / 255, 163 / 255].ease('easeInOutCubic'),
		)
		.rotate(.1, .01)
		.luma(.4))
	.koch()
	.scale(0.7, height / width)
	.out();
