// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-pattern.js")

// triangle wave
tw = () => (0.131 * time) % 1.0;
pulse(tw, 0.1).out(o0)
pulse(tw, 0.1).kaleid(1.5).out(o1)
cx = () => 0.5 + 0.25 * Math.cos(0.231 * time);
cy = () => 0.5 + 0.25 * Math.sin(0.371 * time);
noise().modulatePixelate(pulse(tw, 0.1), 4).out(o2)
pulse(tw, 0.02).modulate(concentric(100, cx, cy)).out(o3)
render()
