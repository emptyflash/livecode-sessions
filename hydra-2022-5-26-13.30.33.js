// Harmonograph by Cameron Alexander (emptyflash)
// https://emptyfla.sh

p5 = new P5({mode: 'WEBGL'})
p5.hide()


s0.init({ src: p5.canvas } )

const func = (t) => {
      let a = [2.5, 2.1, 1.9][Math.floor(time/10)%3];
      let b = [2.0, 2.2, 2.3, 2.4][Math.floor(time/10)%4];
      let f = 1000;
      let w = 2 * 3.14 * f;
      let h = 1.0 + Math.sin(t / 5000);
      let x = (a + b) * Math.cos(w * t) - h * Math.cos((a - b) / b * w * t);
      let y = (a + b) * Math.sin(w * t) - h * Math.sin((a - b) / b * w * t);
      return [x,y];
}

p5.draw = () => {
  const h = osc(1,1,[127, 128].fast(1/10)).modulateScale(o0).kaleid().mask(src(s0));
  if (Math.floor(time/20) % 2 == 0) {
    h.blend(o0, 0.9).out()
  } else {
    h.diff(o0).out()
  }
  p5.background(0, 0, 0, 0);
  p5.scale(width/2, -height/2);
  for (let i = 1; i < 500; i++) {
    let p1 = func(i-p5.frameCount*100);
    let p2 = func(i-1-p5.frameCount*100);
    p5.stroke(255);
    p5.line(p1[0], p1[1], p2[0], p2[1]);
  }
}
