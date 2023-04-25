await import("https://emptyfla.sh/bl4st/bundle-global.js")

flameEngine.setConfig(
  flame()
  .exposure(1.5)
  .colorful(.8)
  .addTransform(
    transform()
    .fisheye()
    .rotateO()
  )
  .addTransform(
    transform()
    .spherical()
    .rotateY(1,1,1)
  )
  .addTransform(
    transform()
    .spherical()
    .rotateO(1,1,1)
  )
)

flameEngine.start()

s0.init({src: flameEngine.canvas})
src(o0).layer(src(s0).luma()).modulateScale(o0, -.01).modulateScale(noise(2), -.01).out()