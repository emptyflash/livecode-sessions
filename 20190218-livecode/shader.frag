void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st *= rotate2d(u_time * 0.1);
    st += u_time * 0.01;
    vec2 uv = vec2(fbm(st), fbm(st));
    vec2 uv2 = modulateRotate(uv, simplexNoise(st, 10., 1.), 1., 1.);
    gl_FragColor = osc(uv2, 60., .1, 14.);
}
