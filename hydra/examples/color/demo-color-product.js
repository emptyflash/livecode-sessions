// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-color.js")

s0.initCam()
src(s0).colcross(solid(0.75, 0.5, 0.75), 0.5).out(o0)
src(s0).colcross(osc(), 0.6).out(o1)
src(s0).colboost(solid(0.75,0.5,0.75,1), 0.7).out(o2)
src(s0).coldot(osc(6, 0.1, 1).rotate(() => 0.1 * time), 0.7).out(o3)
render()
