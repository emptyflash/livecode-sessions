setFunction({
	name: 'modi',
	type: 'util',
	inputs: [{
			name: 'x',
			type: 'int'
		},
		{
			name: 'y',
			type: 'int'
		},
	],
	glsl: `
  		return x - y * (x / y);
`
});

setFunction({
	name: 'or',
	type: 'util',
	inputs: [{
			name: 'x',
			type: 'int'
		},
		{
			name: 'y',
			type: 'int'
		},
	],
	glsl: `
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
`
});

setFunction({
	name: 'and',
	type: 'util',
	inputs: [{
			name: 'x',
			type: 'int'
		},
		{
			name: 'y',
			type: 'int'
		},
	],
	glsl: `
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
`
});

setFunction({
  name: 'asdf',
  type: 'src',
  inputs: [],
  glsl: `
  float r = float(modi(or(int(_st.x), int(_st.y)), int(20.0 + 17.0 * sin(tim))));
  return vec4(r,r,r,1.0);
  `
});
asdf().out()
/*

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
*/
