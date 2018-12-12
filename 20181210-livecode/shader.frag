// Go to local.cameron.pizza
void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st -= 0.5;
    st -= vec2(noise(st) * cos(u_time), noise(st * tan(u_time)));
    //st = kaleidoscope(st);
    st *= rotate2d(u_time);
    st *= 10.0 * sin(u_time);
    vec3 color = vec3(fbm(st * sin(u_time * 3.0)), fbm(st / cos(u_time * 5.0)), abs(fbm(st * cos(u_time * 3.0))));
    color /= fbm(vec2(fract(st.y * sin(u_time * 2.0)), fract(st.x / tan(u_time))));
    st += 0.5;
    gl_FragColor = vec4(color, 1.0);
}
