s0.initScreen(0)
src(s0)
  .sdf(0.5,
       () => 0.7 + 0.3 * Math.sin(0.53*time),
       () => 0.3 + 0.2 * Math.sin(0.17*time),
       0.1,
       () => time, () => 0.51*time)
  .out(o0)
render(o0)
