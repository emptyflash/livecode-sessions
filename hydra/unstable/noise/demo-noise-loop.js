noiseloop()
  .out(o0)
noiseloop()
  .pixelate(4)
  .rotate()
  .out(o1)
noiseloop(2, 0.3)
  .thresh()
  .out(o2)
noiseloop()
  .shift(0.7)
  .out(o3)
render()