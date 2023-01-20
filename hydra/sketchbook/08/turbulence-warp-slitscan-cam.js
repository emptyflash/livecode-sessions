// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// by Kandid
// Create slit scan with #Hydra
// Sketch 8

await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-noise.js")

s0.initCam()
src(o0)
	.layer(src(s0)
		.mask(cwarp(3, 0.1, 1, 1, 3.0, () => Math.sin(0.02*time)).rotate(() => -0.01 * time).thresh(0.4)))
		.saturate(0.99)
	.out(o0);
render(o0)
