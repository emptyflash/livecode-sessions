await import("https://emptyfla.sh/bl4st/bundle-global.js")
await import("https://livecode.emptyfla.sh/hydra/all.js")

flameEngine.setConfig(
	flame()
  	.mapExposure(7)
  	.colorful(.7)
  	.addTransform(
      transform()
      .spherical()
      .weight(.1)
      .wvar(.6)
      .x(({time}) => [10*Math.sin(time/5), .1])
      .build()
    )
  	.addTransform(
      transform()
      .fisheye()
      .wvar(.22)
      .y(({time}) => [Math.cos(time/3), .1])
      .build()
    )
  	.addTransform(
      transform()
      .swirl()
      .wvar(.5)
      .build()
    )
  	.addTransform(
      transform()
      .spiral()
      .o(({time}) => [Math.cos(time/3), .1])
      .build()
    )
  .firstLevel(8)
  .lastLevel(11)
  .view([.5,.5,0,0])

)
flameEngine.render()

s0.init({
	src: flameEngine.canvas
})
src(o0)
	.layer(src(s0)
		.luma())
	.modulateScale(warp(1,.1), .01)
	.modulateHue(src(o0), 1)
	.out()