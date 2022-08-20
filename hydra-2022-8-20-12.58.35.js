// Alien Mouth
// Cameron Alexander (emptyfla.sh)

(async () => {
await loadScript("https://cdn.statically.io/gl/emptyflash/extra-shaders-for-hydra/main/lib/all.js")


src(o0)
	.scale(1,1,1.01)
	.modulateHue(o0, 10)
	.layer(
		osc(20, .1, 2)
  .kaleid(99)
  		.rotate(Math.PI/4, 0)
		.mask(warp(2, .02, 2, 2, 2)
			.luma(0.1, 0.01)))
	.kaleid(2)
	.out()
})()
