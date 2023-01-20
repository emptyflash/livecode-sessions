// based on a sketch by Flor de Fuego
//https://flordefuego.github.io/
osc(30, 0.01, 1)
	.mult(osc(20, -0.1, 1)
		.modulate(noise(3, 1))
		.rotate(0.7))
	.posterize([3, 10, 2].fast(0.5)
		.smooth(1))
	.modulateRotate(o0, () => mouse.x * 0.003)
	.invert()
	.out(o0)
src(o0)
  .sdf(() => 0.5 + 0.5 * Math.sin(0.87*time),
       () => 0.7 + 0.3 * Math.sin(0.53*time),
       () => 0.3 + 0.2 * Math.sin(0.17*time),
       0.1,
       () => time, () => 0.51*time)
  .out(o1)
render()
