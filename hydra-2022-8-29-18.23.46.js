// Transposition
// by Cameron Alexander (https://emptyfla.sh)

(async () => {
await import("https://livecode.emptyfla.sh/hydra/all.js")

let frame = 0;

src(o0)
	.sort(0, () => frame++, [0, -1, -1, 1].fast(0.5), [1, -1, 0, 1].fast(0.5))
	.layer(osc(5, .3, 2)
		.mask(shape(99, () => 0.4 + 0.2 * Math.sin(time))
			.rotate(.1, .1)
			.scrollX(.1, .1)
			.scrollY(.1, .05)
		))
	.modulateHue(o0, 500)
	.out()
})()
