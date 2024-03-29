#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
const int BIT_COUNT = 8;
int modi(int x, int y) {
    return x - y * (x / y);
}
int or(int a, int b) {
    int result = 0;
    int n = 1;

    for(int i = 0; i < BIT_COUNT; i++) {
        if ((modi(a, 2) == 1) || (modi(b, 2) == 1)) {
            result += n;
        }
        a = a / 2;
        b = b / 2;
        n = n * 2;
        if(!(a > 0 || b > 0)) {
            break;
        }
    }
    return result;
}

int and(int a, int b) {
    int result = 0;
    int n = 1;

    for(int i = 0; i < BIT_COUNT; i++) {
        if ((modi(a, 2) == 1) && (modi(b, 2) == 1)) {
            result += n;
        }

        a = a / 2;
        b = b / 2;
        n = n * 2;

        if(!(a > 0 && b > 0)) {
            break;
        }
    }
    return result;
}

int not(int a) {
    int result = 0;
    int n = 1;
    
    for(int i = 0; i < BIT_COUNT; i++) {
        if (modi(a, 2) == 0) {
            result += n;    
        }
        a = a / 2;
        n = n * 2;
    }
    return result;
}
int xor(int a, int b) {
    // (A OR B) AND (NOT (A AND B))
    return and(or(a, b), not(and(a, b)));
}

void main() {
    vec2 st = gl_FragCoord.xy;
    
    //st *= mat2(cos(u_time), -sin(u_time), sin(u_time), cos(u_time));
    float r = float(modi(or(int(st.x), int(st.y)), int(20.0 + 17.0 * sin(u_time))));

    gl_FragColor = vec4(r,r,r,1.0);
}
