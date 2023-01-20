s0.initScreen(4)

src(s0)
  .altline(1)
  .out(o1)
render(o1)

src(s0)
	.invert().add(cwarp(2))
	.out(o0)
	render(o0)

src(o1)
  .invert(2)
	.centermag(0.5, 0.3)
	.out(o2)
render(o2)

cwarp(1, () => 0.5 + 0.5*Math.sin(time))
  .diff(src(o0).blend(warp(0.1), 0.1))
	.out(o3)
render(o3)
