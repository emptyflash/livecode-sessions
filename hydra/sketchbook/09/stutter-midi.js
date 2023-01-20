s0.initScreen(3)

src(s0).out(o0)
src(s0).ifpos(src(o3), () => Math.sin(time)-cc[1]).out(o3)

src(s0).ifpos(src(o3), () => Math.sin(time)-cc[1]).blend(s0, 0.02).out(o3)

src(s0).ifpos(src(o3), () => Math.sin(time)-cc[1]).diff(s0).out(o3)

render(o3)
