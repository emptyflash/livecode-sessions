(async () => {
await import("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/all.js")

osc(2, 1, 127)
	.kaleid(10)
	.mask(warp(1, .2))
	.saturate()
	.diff(src(o0)
        .colorama(0.02)
		.scale(1.01)
         , 0.25)
	.out()
})()
