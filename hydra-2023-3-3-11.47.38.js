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
	.screenInitScale(.2)
	.screenInitVal(.8)
	.colorful(0.4)
	.mapExposure(1.6)
	.addTransform(
		transform()
		.fisheye()
		.x(({
			time
		}) => [.2, 1.5 * Math.sin(time / 5)])
		.build()
	)
	.addTransform(
		transform()
		.fisheye()
		.y(({
			time
		}) => [.2, 1.5 * Math.cos(time / 3)])
		.build()
	)
	.view([1.1, 1.1, 0, 0])
)
engine.render()

s0.init({
	src: canvas
})
src(o0)
	.layer(src(s0)
		.luma())
	.modulateScale(noise(1), .1)
	.out()