// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/all.js")

s0.initCam()
src(s0).grawave(0.4).out(o0)
src(s0).grarose(0.6).out(o1)
cwarp().contrast(0.2).grawave(0.7).out(o2)
cwarp().grawave(0.7).invert().out(o3)
render()
