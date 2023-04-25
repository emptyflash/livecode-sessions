const {
	flame,
	transform,
	Engine
} = await import("https://emptyfla.sh/bl4st/bundle.js")

const canvas = document.createElement("canvas")
const engine = new Engine(canvas)
engine.init()
engine.setConfig(
	flame()
	.mapExposure(2.6)
	.colorful(.3)
	.screenInitScale(1)
	.addTransform(
		transform()
		.spherical()
		.x([.01, .1])
		.y(({time}) => [.1, .2 + .1 * Math.cos(time)])
		.o(({time}) => [.01, .5 + .1 * Math.sin(time)])
		.build()
	)
	.addTransform(
		transform()
		.spherical()
		.build()
	)
	.iterations(5)
	.view([1.1, 1.1, 0, 0])
)
engine.render()
s0.init({
	src: canvas
})
src(o0)
	.layer(src(s0)
		.luma())
	.modulateRotate(noise(1), .1)
	.out()