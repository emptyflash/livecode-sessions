void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st -= vec2(.5);
    vec4 c1 = simplexNoise(st * (u_audio[0]/128.) * rotate2d(u_time) + u_time, 10., .1);
    st *= u_audio[0] / 255.;
    vec2 uv = modulateRotate(vec2(fbm(st * rotate2d(u_time * u_audio[1] / 10000.))), c1, 1., 1.);
    vec4 c2 = osc(uv, 6. * (u_audio[0] / 128.), .1, 800. * (u_audio[1] / 255.));
    gl_FragColor = c2;
}
