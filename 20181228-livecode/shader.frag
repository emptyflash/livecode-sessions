float polygon(vec2 st, float n) {
    float a = atan(st.x, st.y) + 3.14;
    float r = 6.28 / n;

    float d = cos(floor(.5+a/r)*r-a) * length(st);
    return 1.0-smoothstep(.4, .41, d);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st -= 0.5;
    float r = polygon(st * 2., mod(u_time, 10.) + 3.);
    float g = polygon(st * 2., mod(u_time, 10.) + 4.);
    float b = polygon(st * 2., mod(u_time, 10.) + 5.);
    vec3 color = vec3(r, g, b);
    gl_FragColor = vec4(color, 1.0);
}
