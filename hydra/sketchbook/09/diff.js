s0.initScreen(4)
src(o0).diff(osc().rotate(1.2)).out(o1)
render(o1)

















src(o0).diff(osc().rotate(() => 1.5+0.5*Math.sin(time))).out(o1)
