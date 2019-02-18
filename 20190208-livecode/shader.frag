void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    gl_FragColor = osc(modulateRotate(modulate(st, simplexNoise(st, 1., 1.), 1.), osc(st, 1., 1., 1.), 1., 1.), 60., .1, 17.);
}
