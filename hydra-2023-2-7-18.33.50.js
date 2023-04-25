const {sculptToHydraRenderer} = await import("https://cdn.jsdelivr.net/gh/emptyflash/shader-park-core/dist/shader-park-core.esm.js")

const code = () => {
	mirrorN(5, .3);
	displace(0, .5 * sin(time / 2), 0)
	let f = fresnel(2);
	let ray = getRayDirection();
	color(normalize(ray)*f)
	sphere(.3)
}
sculptToHydraRenderer(code)
	.out(o1)

src(o0)
	.diff(osc(1,1,1).r())
	.scale(1.1)
	.modulateScale(noise(2), 1)
	.rotate(Math.PI/4)
	.layer(src(o1).luma(), .5)
	.out()
render(o0)