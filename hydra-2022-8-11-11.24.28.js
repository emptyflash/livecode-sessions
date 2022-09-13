// Machine Elves
// Cameron Alexander (emptyfla.sh)
(async () => {
await loadScript("https://livecode.emptyfla.sh/hydra/all.js")

osc(2, .1, 126)
	.modulate(warp(7, .1), 2)
	.hyperbole([.01, 0.1, 0.3, 0.7, 0.8, 0.85].fast(0.3).ease("easeInOutCubic"))
	.modulateHue(o0, .01)
	.out()
})()
