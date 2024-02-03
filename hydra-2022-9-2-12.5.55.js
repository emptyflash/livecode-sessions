await import("https://livecode.emptyfla.sh/hydra/all.js")

let frame = 0;
src(o0)
	//.sort(0, () => frame++, [1, 1], [0, 1])
	.layer(
		osc(20, .1, 1)
		.kaleid(99)
		.modulate(warp())
		//.hyperbole8(.2)
		.mask(
			shape(99, 0.4, 0.0001)
          	.modulate(warp())
			.scrollX(.1, .3)
			.scrollY(.1, .5)
			.repeat(3, 3)
		)
	)
	.scale(1.05)
	.rotate(.2,0)
	//.modulateHue(o0, 100)
	.hyperbole8(0.02)
	.out()