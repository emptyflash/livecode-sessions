void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st = fract(st);
    st *= 10.;
    st *= vec2(noise(vec2(u_time)), noise(vec2(-u_time)));
    st *= rotate2d(u_time);
    float r = mod(st.x, clamp(abs(tan(u_time)), .1, .9)) * 3.;
    float g = mod(st.y / st.x, clamp(abs(tan(u_time)), .1, .9)) * 3.;
    float b = mod(st.y, clamp(abs(tan(u_time)), .1, .9)) * 3.;
    vec3 color = vec3(r, g, b);
    gl_FragColor = vec4(color, 1.0);
}
