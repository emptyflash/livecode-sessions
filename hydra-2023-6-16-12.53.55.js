await import("https://livecode.emptyfla.sh/hydra/all.js")

src(o0)
	.blurmore()
	.out(o1)

src(o1)
	.sharpen()
	.out(o2)

src(o2)
	.blurmore()
	.out(o3)

src(o3)
	.sharpen()
	.sub(shape(4)
		.modulateScrollX(noise(1), 1)
        .modulateScrollY(noise(1), 1))
	.diff(noise(4, .07))
	.out()