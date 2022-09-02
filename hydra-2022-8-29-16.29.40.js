// Yer a fractal, Harry
// by Cameron Alexander (https://emptyfla.sh)

s0.initCam()

src(o0)
	.scale(0.7)
	.rotate(.1, .01)
	.scrollX(.1, .01)
	.kaleid([1.3, 2, 6, 7].fast(0.1))
	.diff(osc(10,.1,126).kaleid(99))
	.layer(src(s0).luma())
	.out()