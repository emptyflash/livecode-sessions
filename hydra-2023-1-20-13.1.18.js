const { sculptToHydraRenderer } = await import("https://livecode.emptyfla.sh/hydra/all.js")

sculptToHydraRenderer(() => {
		rotateX(time / 5)
		rotateZ(time / 3)
		displace(sin(time), 0, 0)
		mirrorN(3, 1)
		torus(0.3, 0.08 + 0.1 * sin(time))
	})
	.out(o0)
let frame = 0;
src(o1)
	.diff(solid(1, 0, 0)
		.mult(osc(15, .1))
		.modulate(src(o0)), .2)
	.scrollX(.1,-.1)
	.rotate(.1,.1)
	.hyperbole8([0.01, 0.1, 0.4, 0.8, 0.5, .2, .04].fast(.5)
		.ease('easeInOutCubic'))
	.blend(solid(1, 0, 0)
		.mult(osc(20, 0))
		.modulate(src(o0), 10), [.2, .2, .8].smooth())
	.out(o1)
solid(1, 0, 0)
	.mult(osc(15, .1))
	.modulate(src(o0), 10)
	.out(o2)
render(o1)