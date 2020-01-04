uniform sampler2D	texture;
uniform float 		width;
uniform float 		height;

void make_kernel(inout vec4 n[9], sampler2D tex, vec2 coord)
{
	float w = 1.0 / width;
	float h = 1.0 / height;

	n[0] = texture2D(tex, coord + vec2( -w, -h));
	n[1] = texture2D(tex, coord + vec2(0.0, -h));
	n[2] = texture2D(tex, coord + vec2(  w, -h));
	n[3] = texture2D(tex, coord + vec2( -w, 0.0));
	n[4] = texture2D(tex, coord);
	n[5] = texture2D(tex, coord + vec2(  w, 0.0));
	n[6] = texture2D(tex, coord + vec2( -w, h));
	n[7] = texture2D(tex, coord + vec2(0.0, h));
	n[8] = texture2D(tex, coord + vec2(  w, h));
}

void main(void) 
{
	vec4 n[9];
	make_kernel( n, texture, gl_TexCoord[0].st );

	vec4 sobel_edge_h = n[2] + (2.0*n[5]) + n[8] - (n[0] + (2.0*n[3]) + n[6]);
  	vec4 sobel_edge_v = n[0] + (2.0*n[1]) + n[2] - (n[6] + (2.0*n[7]) + n[8]);
	vec4 sobel = sqrt((sobel_edge_h * sobel_edge_h) + (sobel_edge_v * sobel_edge_v));

	gl_FragColor = vec4( 1.0 - sobel.rgb, 1.0 );
}
        void main()
        {
            gl_FragColor = fColor * texture2D( texture, fTexCoord );
        }

                    vec2 p = gl_FragCoord.xy;
            vec4 p0 = texture2D(utexture, (p + vec2(-1.0, -1.0)) / u_size);
            vec4 p1 = texture2D(utexture, (p + vec2(0.0, -1.0)) / u_size);
            vec4 p2 = texture2D(utexture, (p + vec2(1.0, -1.0)) / u_size);
            vec4 p3 = texture2D(utexture, (p + vec2(-1.0, 0.0)) / u_size);
            vec4 p5 = texture2D(utexture, (p + vec2(1.0, 0.0)) / u_size);
            vec4 p6 = texture2D(utexture, (p + vec2(-1.0, 1.0)) / u_size);
            vec4 p7 = texture2D(utexture, (p + vec2(0.0, 1.0)) / u_size);
            vec4 p8 = texture2D(utexture, (p + vec2(1.0, 1.0)) / u_size);
            vec4 gx = -p0 + p2 - 2.0 * p3 + 2.0 * p5 - p6 + p8;
            vec4 gy = -p0 - 2.0 * p1 - p2 + p6 + 2.0 * p7 + p8;
            // gl_FragColor = vec4(sqrt(gx * gx + gy * gy), 1.0); 


                   precision mediump float;

        varying vec4 fColor;
        varying  vec2 fTexCoord;

        uniform sampler2D utexture;

        uniform float u_size;

        mat3 sx = mat3( 
            1.0, 2.0, 1.0, 
            0.0, 0.0, 0.0, 
            -1.0, -2.0, -1.0 
        );
        mat3 sy = mat3( 
            1.0, 0.0, -1.0, 
            2.0, 0.0, -2.0, 
            1.0, 0.0, -1.0 
        );

        void main() {

            vec3 diffuse = texture(screenTexture, TexCoords.st).rgb;
            mat3 I;
            for (int i=0; i<3; i++) {
                for (int j=0; j<3; j++) {
                    vec3 sample  = texelFetch(screenTexture, ivec2(gl_FragCoord) + ivec2(i-1,j-1), 0 ).rgb;
                    I[i][j] = length(sample); 
                }
            }

            float gx = dot(sx[0], I[0]) + dot(sx[1], I[1]) + dot(sx[2], I[2]); 
            float gy = dot(sy[0], I[0]) + dot(sy[1], I[1]) + dot(sy[2], I[2]);

            float g = sqrt(pow(gx, 2.0)+pow(gy, 2.0));
            color = vec4(diffuse - vec3(g), 1.0);

            gl_FragColor = texture2D( utexture, fTexCoord );

        }