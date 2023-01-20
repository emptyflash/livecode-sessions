// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-color.js")

osc(()=>3*cc[0], ()=>0.5*cc[1], ()=>cc[2])
	.rotate(() => -0.17 * time)
	.colreflect(osc(()=>12*cc[3], ()=>0.23*cc[4], ()=>cc[5])
		.rotate(() => 0.1 * time), 0.3)
	.out(o0)
render(o0)
