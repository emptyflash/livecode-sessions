s0.initScreen(4)
a.show()

src(s0).out(o0)
src(s0).ifpos(src(o3), () => a.fft[0]-0.3).out(o3)
render(o3)











src(s0).ifpos(src(o3), () => a.fft[0]-0.2).out(o3)

src(s0).ifpos(src(o3), () => a.fft[0]-0.15).blend(s0, 0.02).out(o3)

src(s0).ifpos(src(o3), () => a.fft[0]-0.3).diff(s0).out(o3)
