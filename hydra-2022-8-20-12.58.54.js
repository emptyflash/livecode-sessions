// Circuit Dimension
// Cameron Alexander (emptyfla.sh)

(async () => {
await loadScript("https://cdn.statically.io/gl/emptyflash/extra-shaders-for-hydra/main/lib/all.js")

osc(1, 1, 1)
	.modulateScale(warp(2, .1, 2, 2, 2), 2)
	.diff(
		src(o0)
		.scale(1.1)
		.rotate(.1, .1)
		.hyperbole(0.01, 20)
		.rotate(.1, .1)
		.scale(0.7)
	)
	.out()
})()
