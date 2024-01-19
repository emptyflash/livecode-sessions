// Aurora Digitalis
// by Cameron Alexander (emptyfla.sh)

await loadScript("https://livecode.emptyfla.sh/hydra/all.js")

src(o0)
	.blend(
		warp(2)
		.brightness()
		.luma()
		.color(() => Math.cos(time*0.3) * 0.5 + 0.5, () => 0.9 + Math.sin(time*0.8) * 0.4, 0.9, 1), 0.05
	)
	//.color(0.0, 0.5, 0.9, 1)
		.scale(1, 0.99)
	.modulateScale(o0, 0.08)
	.out()