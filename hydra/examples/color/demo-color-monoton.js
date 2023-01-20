// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-color.js")

s0.initCam()
src(s0).monotone(3, () => 0.02*time, 0.8).out(o0)
render(o0)
