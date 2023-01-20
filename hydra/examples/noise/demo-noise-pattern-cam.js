// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-noise.js")

s0.initCam()
src(s0).modulate(colornoise(150, 1).rotate(() => time)).out(o0)
colornoise(150, 1).rotate(() => time).modulate(src(s0)).out(o1)
src(s0).modulate(turb(10, 0.1, 6)).out(o2)
turb(10, 0.1, 6).modulatePixelate(src(s0)).out(o3)
render()
