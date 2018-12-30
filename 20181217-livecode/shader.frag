void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    //st += vec2(noise(vec2(u_time)), 0.0);
    vec2 st1 = st + vec2(-0.1, -0.1) * rotate2d(u_time);
    vec2 st2 = st + vec2(0.1, -0.1) * rotate2d(u_time);
    vec2 st3 = st + vec2(0.0, 0.1) * rotate2d(u_time);
    float cir1 = circle(st1, noise(st*10.0 + vec2(tan(u_time)))/4.0);
    float cir2 = circle(st2, noise(st*10.0 + vec2(tan(u_time)))/4.0);
    float cir3 = circle(st3, noise(st*10.0 + vec2(tan(u_time)))/4.0);
    vec3 color = vec3(cir1, cir2, cir3);
    //color *= mod(st.x * st.y, 0.1);
    gl_FragColor = vec4(color, 1.0);
}
