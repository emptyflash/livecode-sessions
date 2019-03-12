void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    float a = float(u_audio[1]);
    gl_FragColor = osc(st, 60., .1, a);
}
