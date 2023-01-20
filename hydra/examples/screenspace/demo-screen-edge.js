// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-cond.js")

s0.initCam();
src(s0).edge().out(o1)
src(o1).dilate().color(2.5, 2.5, 2.5).out(o2)
src(o2).splitview(s0).out(o3)
render(o3)
