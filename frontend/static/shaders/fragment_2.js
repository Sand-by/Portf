const fragmentShader_2 = `
uniform float iTime;
uniform vec3 iResolution;
uniform vec2 iMouse;
#define S(a,b,t) smoothstep(a,b,t)
float DistLine(vec2 p, vec2 a, vec2 b) 
{ vec2 pa= p-a;
 vec2 ba= b-a;
 float t = clamp(dot(pa,ba)/dot(ba,ba), 0.,1.);
 return length(pa-ba*t);
}


float N21(vec2 p) 
{
    p= fract(p*vec2(233.34, 851.73));
    p+= dot(p,p+23.45);
    return fract(p.x*p.y);
}

vec2 N22(vec2 p)
{
	float n =N21(p);
    return vec2(n,N21(p+n));
}

vec2 GetPos(vec2 id,vec2 offs) {
    
	vec2 n= N22(id+offs)*iTime+(iMouse.x+iMouse.y)*2.;
	//float x = sin(iTime*n.x);
    //float y =cos(iTime*n.y);
    return offs+sin(n)*.4;
    //vec2(x,y)*.4;
        

}


float Line(vec2 p, vec2 a, vec2 b){
float d = DistLine(p,a,b);
float m = S(.03,.01,d);
float d2= length(a-b);   
    
m*=S(1.2, .8 , d2)*.5+S(.05, .03, abs(d2-.75));
    
    return m;
}



float Layer (vec2 uv){
    float m =0.;
    vec2 gv = fract(uv)-.5;
    vec2 id = floor(uv);
	    
 
    int i = 0;
    vec2 p [9];
    for(float y = -1.; y<=1.;y++)
    {
        for(float x = -1.; x<=1.;x++)
        {
        p[i++]= GetPos(id,vec2(x,y));
        
        }
    
        }
    
    float t=iTime*10.;
    for(int i = 0; i<9;i++)
    {
    m+=Line(gv,p[4],p[i]);
        
        vec2 j = (p[i]-gv)*20.;
     float sparkle = 1./dot(j,j);   
    m+=sparkle*(sin(t+fract(p[i].x)*10.)*.5+.5);
    }
    
    m+=Line(gv,p[1],p[3]);
    
    m+=Line(gv,p[1],p[5]);
    
    m+=Line(gv,p[5],p[7]);
    
    m+=Line(gv,p[7],p[3]);

return m;
}



void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (gl_FragCoord.xy-.5*iResolution.xy)/min(iResolution.x,iResolution.y);
    //uv = uv/2.;
    // uv.x-=iMouse.x*.12;
    // uv.y-=iMouse.y*.12;

    float gradient = uv.y;
    
    float m =  0.;
    float t = iTime*.1;
    
    float s = sin(t);
    float c = cos(t);
    mat2 rot = mat2(c,-s,s,c);
    
    uv*=rot*2.;
    for(float i=0.; i <1.; i+=1./4.){
   			 float z = fract(i+t);
        	 float size = mix(10. , .5, z);
        float fade= S(0., .5 , z)*S(1., .8, z);
        
        	 m+=Layer(uv*size+i*20.)*fade;
    }
    vec3 base = sin(t*5.*vec3(.345, .456, .657))*.4+.6;
    vec3 col = m*base;
    col-=gradient*base;
    // col = pow(col,1./vec3(.5));
    fragColor = vec4(col,1.0);
}
void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
 }`
export default fragmentShader_2;