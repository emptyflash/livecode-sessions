// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-color.js")

s0.initCam()
src(s0).monotone(3, () => 0.1*time, 0.8).out(o0)
src(s0).levels(3, 0.5).out(o1)
src(s0).grarose(0.5).out(o2)
src(s0).grawave(0.3).out(o3)
render()
