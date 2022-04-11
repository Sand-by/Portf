const fragmentShader = `
uniform float iTime;
uniform vec3 iResolution;
#define PI 3.1415926535897932384626433832795

void mainImage(out vec4 fragColor, in vec2 fragCoord){
    vec2 uv = (gl_FragCoord.xy*2.-iResolution.xy)/min(iResolution.x,iResolution.y);
    vec3 color = vec3(0.);
    vec2 pos = vec2(sin(iTime*PI),cos(iTime*PI));
    color = vec3(0.1/length(uv+pos*0.5));
    fragColor = vec4(color,1.0);
}
void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
 }`
export default fragmentShader;