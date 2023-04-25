(async () => {
await import("https://livecode.emptyfla.sh/hydra/all.js")
updateTextureParams(o0, {wrap: ["mirror", "mirror"]})
src2(o0)
	.blend(osc(15, 0.1, 1), 0.1)
	.scale(0.9, 16/9)
.rotate(()=>Math.abs(Math.sin(time*0.01))*Math.PI*2+1,0)
	.out()
})()
