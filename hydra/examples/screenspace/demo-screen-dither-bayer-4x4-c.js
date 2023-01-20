// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// this example is based on a sketch by Olivia Jack
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-screen.js")

osc(100, 0.01, 1.4)
	.rotate(0, 0.1)
	.mult(osc(10, 0.1).modulate(osc(10).rotate(0, -0.1), 1))
	.color(2.83,0.91,0.39)
  .out(o0)
src(o0)
  .contrast(1.1)
  .dither4().out(o1);
render(o1)
