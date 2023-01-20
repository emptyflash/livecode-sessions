// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-pattern.js")

a = () => 1 + 10 * (1 + Math.sin(0.137 * time));
t = () => 0.137 * time;
s0.initCam()
hextile(a).out(o0)
hextile(a).rotate(t).add(gradient(),-1).out(o1)
hextile(a).modulateRotate(concentric(10.0,0.75,0.25).rotate(t)).out(o2)
src(s0).modulate(hextile(a),0.2).out(o3)
render()
