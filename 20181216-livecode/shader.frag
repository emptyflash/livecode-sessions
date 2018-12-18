void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st -= 0.5;
    st += vec2(noise(st * cos(u_time)), fbm(st * cos(u_time)));
    st *= 5.0;
    st *= rotate2d(u_time);
    vec3 color = vec3(0.);
    color.r = fbm(st * (sin(u_time * 5.) + 1.1));
    color.g = fbm(st * (sin(u_time * 2.) + 1.1));
    color.b = fbm(st * (sin(u_time * 1.) + 1.1));
    st += 0.5;
    color *= mod(st.x * st.y * 1.0 + 0.5, 1.7);
    gl_FragColor = vec4(color, 1.0);
}
