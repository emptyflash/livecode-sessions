void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    gl_FragColor = osc(st, 60., .1, 14.);
}
