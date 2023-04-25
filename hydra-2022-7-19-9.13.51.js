(async () => {
await import("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/all.js")

src(o0)
	.mask(shape(4,2))
	.invert()
	//.colorama(0.03)
	//.modulateScale(warp(.1, .1, 10), .01)
	//.modulateScale(o0)
	.scale(()=>mouse.x/1920)
	.rotate(() => 2* Math.PI * mouse.y /1080)
	//.kaleid(6)
	.out()
})()
