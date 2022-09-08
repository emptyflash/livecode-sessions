(async () => {
await loadScript("https://livecode.emptyfla.sh/hydra/all.js")

let frame = 0;

let mask = osc(2, 1, 2)
	.mask(shape(4, 1, .001)
		.luma())
	.modulate(warp(.1, .1), 2)

src(o0)
	.blend(src(o0)
		.sobelx(), [0, 0.15])
	.blend(src(o0)
		.sobely(), [0.15, 0])
	.layer(mask)
	.out(o0)

src(o0)
	.layer(mask.mult(solid(0, 0, 0, 1)))
	.out(o1)


render(o1)
})()
