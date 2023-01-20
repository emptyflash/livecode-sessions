// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/all.js")

shape(4, 0.9)
	.diff(src(o0)
		.scale(0.9)
		.mask(shape(4, 0.9, 0.01))
		.rotate(() => 0.1 * time))
	.out(o1)
src(o1)
	.blur()
	.out(o0)
render(o0)
