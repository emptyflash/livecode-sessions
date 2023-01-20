// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-noise.js")

whitenoise(5, 1).out(o0)
colornoise(5, 1).out(o1)
whitenoise(15, 0).out(o2)
colornoise(15, 0).out(o3)
render()
