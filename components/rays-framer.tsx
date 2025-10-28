import{jsx as _jsx}from"react/jsx-runtime";import{addPropertyControls,ControlType}from"framer";import React,{useRef,useEffect,useMemo,useState}from"react";import*as THREE from"three";const RAY_Y_POSITION_1=-.4;const RAY_Y_POSITION_2=-.5;/**
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 *
 * @framerDisableUnlink
 *
 * @framerIntrinsicWidth 400
 * @framerIntrinsicHeight 400
 */
export default function Rays(props){const{raysColor}=props;const containerRef=useRef(null);const rendererRef=useRef(null);const sceneRef=useRef(null);const cameraRef=useRef(null);const meshRef=useRef(null);const frameIdRef=useRef();const darkMode=useDarkMode();const[isMounted,setIsMounted]=useState(false);const animationRef=useRef(props.animation);useEffect(()=>{setIsMounted(true);return()=>setIsMounted(false);},[]);useEffect(()=>{animationRef.current=props.animation;},[props.animation]);const[randomColor1RGB,randomColor2RGB]=useMemo(()=>{if(raysColor.mode==="random"){const h=Math.random()*360;const s=60+Math.random()*40;return[hslToRgb(h,s,50),hslToRgb(h,s,65)];}else{return[[1,1,1],[1,1,1]];}},[raysColor]);const[color1RGB,color2RGB,raysOpacity]=useMemo(()=>{if(raysColor.mode==="random"){return[randomColor1RGB,randomColor2RGB,1];}else{let color1="";let color2="";switch(raysColor.mode){case"single":color1=raysColor.color;color2=raysColor.color;break;case"multi":color1=raysColor.color1;color2=raysColor.color2;break;}const[r1,g1,b1,a1]=colorToRGBA(getColorValue(color1,containerRef));const[r2,g2,b2,a2]=colorToRGBA(getColorValue(color2,containerRef));return[[r1,g1,b1],[r2,g2,b2],Math.max(a1,a2)];}},[raysColor,darkMode,containerRef]);useEffect(()=>{setIsMounted(true);// Setup three.js scene
const container=containerRef.current;if(!container)return;const scene=new THREE.Scene;const camera=new THREE.PerspectiveCamera(75,container.clientWidth/container.clientHeight,.1,1e3);camera.position.z=5;const renderer=new THREE.WebGLRenderer({preserveDrawingBuffer:true,premultipliedAlpha:true,alpha:true,antialias:true,precision:"highp",powerPreference:"high-performance"});renderer.setSize(container.clientWidth,container.clientHeight);renderer.setPixelRatio(1);container.appendChild(renderer.domElement);// Create mesh
const geometry=new THREE.PlaneGeometry(1024,1024);const material=new THREE.ShaderMaterial({fragmentShader:FRAGMENT_SHADER,vertexShader:VERTEX_SHADER,uniforms:{u_colors:{value:[new THREE.Vector4(color1RGB[0],color1RGB[1],color1RGB[2],1),new THREE.Vector4(color2RGB[0],color2RGB[1],color2RGB[2],1)]},u_intensity:{value:mapRange(props.intensity,0,100,0,.5)},u_rays:{value:mapRange(props.rays,0,100,0,.3)},u_reach:{value:mapRange(props.reach,0,100,0,.5)},u_time:{value:Math.random()*1e4},u_mouse:{value:[0,0]},u_resolution:{value:[container.clientWidth,container.clientHeight]},u_rayPos1:{value:[props.position/100*container.clientWidth,RAY_Y_POSITION_1*container.clientHeight]},u_rayPos2:{value:[(props.position/100+.02)*container.clientWidth,RAY_Y_POSITION_2*container.clientHeight]}},wireframe:false,wireframeLinewidth:0,dithering:false,flatShading:true,side:THREE.DoubleSide});const mesh=new THREE.Mesh(geometry,material);scene.add(mesh);// Store refs
sceneRef.current=scene;cameraRef.current=camera;rendererRef.current=renderer;meshRef.current=mesh;// Animation loop
let lastTime=0;const animate=time=>{const animation=animationRef.current;if(!animation.animate){lastTime=time;}const delta=time-lastTime;lastTime=time;if(mesh.material instanceof THREE.ShaderMaterial){if(animation.animate){mesh.material.uniforms.u_time.value+=delta*animation.speed/1e3/10;}}renderer.render(scene,camera);frameIdRef.current=requestAnimationFrame(animate);};frameIdRef.current=requestAnimationFrame(animate);// Cleanup
return()=>{if(frameIdRef.current){cancelAnimationFrame(frameIdRef.current);}renderer.dispose();geometry.dispose();material.dispose();container.removeChild(renderer.domElement);};},[isMounted]);// Update uniforms when props change
useEffect(()=>{if(meshRef.current?.material instanceof THREE.ShaderMaterial){const material=meshRef.current.material;const container=containerRef.current;if(!container)return;material.uniforms.u_colors.value=[new THREE.Vector4(color1RGB[0],color1RGB[1],color1RGB[2],1),new THREE.Vector4(color2RGB[0],color2RGB[1],color2RGB[2],1)];material.uniforms.u_intensity.value=mapRange(props.intensity,0,100,0,.5);material.uniforms.u_rays.value=mapRange(props.rays,0,100,0,.3);material.uniforms.u_reach.value=mapRange(props.reach,0,100,0,.5);material.uniforms.u_rayPos1.value=[props.position/100*container.clientWidth,RAY_Y_POSITION_1*container.clientHeight];material.uniforms.u_rayPos2.value=[(props.position/100+.02)*container.clientWidth,RAY_Y_POSITION_2*container.clientHeight];}},[props.intensity,props.rays,props.reach,props.position,color1RGB,color2RGB]);return /*#__PURE__*/_jsx("div",{ref:containerRef,style:{borderRadius:props.radius,overflow:"hidden",backgroundColor:props.backgroundColor,...props.style}});}Rays.displayName="Light Rays";addPropertyControls(Rays,{raysColor:{type:ControlType.Object,title:"Color",controls:{mode:{type:ControlType.Enum,defaultValue:"single",options:["random","single","multi"],optionTitles:["Random","Single","Multi"],displaySegmentedControl:true,segmentedControlDirection:"vertical"},color:{type:ControlType.Color,defaultValue:"#FFF",hidden:props=>props.mode!=="single"},color1:{type:ControlType.Color,defaultValue:"#FFF",hidden:props=>props.mode!=="multi"},color2:{type:ControlType.Color,defaultValue:"#FFCB47",hidden:props=>props.mode!=="multi"}}},backgroundColor:{type:ControlType.Color,defaultValue:"#000",optional:true,title:"Background"},animation:{type:ControlType.Object,icon:"effect",controls:{animate:{type:ControlType.Boolean,defaultValue:true},speed:{type:ControlType.Number,defaultValue:10,min:1,max:100,step:1,hidden:props=>!props.animate}}},intensity:{type:ControlType.Number,defaultValue:50,min:0,max:100,step:1},rays:{type:ControlType.Number,defaultValue:30,min:0,max:100,step:1},reach:{type:ControlType.Number,defaultValue:40,min:0,max:100,step:1},position:{type:ControlType.Number,defaultValue:80,min:0,max:100,step:1,unit:"%"},radius:{type:ControlType.BorderRadius,defaultValue:"0px",description:"More components at [Framer University](https://frameruni.link/cc)."}});class CanvasErrorBoundary extends React.Component{static getDerivedStateFromError(error){return{hasError:true};}render(){if(this.state.hasError){return null// Render nothing if there's an error
;}return this.props.children;}constructor(props){super(props);this.state={hasError:false};}}function getColorValue(color,elementRef){if(color.startsWith("var(")){const{variableName,defaultValue}=extractCSSVariableInfo(color);const defaultReturnValue=defaultValue||"";if(variableName&&typeof document!=="undefined"){const computedStyle=getComputedStyle(elementRef?.current||document.body);if(computedStyle){const computedValue=computedStyle.getPropertyValue(variableName).trim();return computedValue||defaultReturnValue;}return defaultReturnValue;}return defaultReturnValue;}else{return color;}}function extractCSSVariableInfo(cssString){// Regular expression to match the variable name and default value
const regex=/var\s*\(\s*(--[\w-]+)(?:\s*,\s*((?:"[^"]*"|'[^']*'|[^)]+)))?\s*\)/;// Execute the regex on the input string
const match=regex.exec(cssString);if(match){const variableName=match[1];let defaultValue=match[2]||null;// If defaultValue is present, clean it up
if(defaultValue){// Remove surrounding quotes if present
defaultValue=defaultValue.replace(/^["']|["']$/g,"");// Trim any whitespace
defaultValue=defaultValue.trim();}return{variableName,defaultValue};}return{variableName:"",defaultValue:""};}const colorToRGBA=color=>{let r=1;let g=1;let b=1;let a=1;if(color&&typeof color==="string"){if(color.startsWith("rgba(")){const parts=color.slice(5,-1).split(",");r=parseInt(parts[0])/255;g=parseInt(parts[1])/255;b=parseInt(parts[2])/255;a=parseFloat(parts[3]);}else if(color.startsWith("rgb(")){const parts=color.slice(4,-1).split(",");r=parseInt(parts[0])/255;g=parseInt(parts[1])/255;b=parseInt(parts[2])/255;}else if(color.startsWith("#")){const hex=color.slice(1);if(hex.length===3){r=parseInt(hex[0]+hex[0],16)/255;g=parseInt(hex[1]+hex[1],16)/255;b=parseInt(hex[2]+hex[2],16)/255;}else if(hex.length===6){r=parseInt(hex.slice(0,2),16)/255;g=parseInt(hex.slice(2,4),16)/255;b=parseInt(hex.slice(4,6),16)/255;}else if(hex.length===8){r=parseInt(hex.slice(0,2),16)/255;g=parseInt(hex.slice(2,4),16)/255;b=parseInt(hex.slice(4,6),16)/255;a=parseInt(hex.slice(6,8),16)/255;}}}return[r,g,b,a];};function useDarkMode(){const[isDarkMode,setIsDarkMode]=useState(false);useEffect(()=>{const mediaQuery=window.matchMedia("(prefers-color-scheme: dark)");const handleChange=e=>{// Use requestAnimationFrame to ensure CSS variables have updated
requestAnimationFrame(()=>{// Add a small delay to ensure CSS variables have propagated
setTimeout(()=>{setIsDarkMode(e.matches);},80);});};setIsDarkMode(mediaQuery.matches);mediaQuery.addListener(handleChange);return()=>mediaQuery.removeListener(handleChange);},[]);return isDarkMode;}function hslToRgb(h,s,l){s/=100;l/=100;const c=(1-Math.abs(2*l-1))*s;const x=c*(1-Math.abs(h/60%2-1));const m=l-c/2;let r=0,g=0,b=0;if(h>=0&&h<60){r=c;g=x;b=0;}else if(h>=60&&h<120){r=x;g=c;b=0;}else if(h>=120&&h<180){r=0;g=c;b=x;}else if(h>=180&&h<240){r=0;g=x;b=c;}else if(h>=240&&h<300){r=x;g=0;b=c;}else if(h>=300&&h<360){r=c;g=0;b=x;}return[r+m,g+m,b+m];}function mapRange(value,fromLow,fromHigh,toLow,toHigh){const percentage=(value-fromLow)/(fromHigh-fromLow);return toLow+percentage*(toHigh-toLow);}const VERTEX_SHADER=`
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;const FRAGMENT_SHADER=`
// Uniforms

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform vec4 u_colors[2];
uniform float u_intensity;
uniform float u_rays;
uniform float u_reach;
uniform vec2 u_rayPos1;
uniform vec2 u_rayPos2;

#ifndef FNC_MOD289
#define FNC_MOD289

float mod289(const in float x) { return x - floor(x * (1. / 289.)) * 289.; }
vec2 mod289(const in vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec3 mod289(const in vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec4 mod289(const in vec4 x) { return x - floor(x * (1. / 289.)) * 289.; }

#endif

#ifndef FNC_PERMUTE
#define FNC_PERMUTE

float permute(const in float x) { return mod289(((x * 34.0) + 1.0) * x); }
vec2 permute(const in vec2 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec3 permute(const in vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 permute(const in vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }

#endif

#ifndef FNC_TAYLORINVSQRT
#define FNC_TAYLORINVSQRT
float taylorInvSqrt(in float r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 taylorInvSqrt(in vec2 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 taylorInvSqrt(in vec3 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec4 taylorInvSqrt(in vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
#endif

#ifndef FNC_QUINTIC
#define FNC_QUINTIC 

float quintic(const in float v) { return v*v*v*(v*(v*6.0-15.0)+10.0); }
vec2  quintic(const in vec2 v)  { return v*v*v*(v*(v*6.0-15.0)+10.0); }
vec3  quintic(const in vec3 v)  { return v*v*v*(v*(v*6.0-15.0)+10.0); }
vec4  quintic(const in vec4 v)  { return v*v*v*(v*(v*6.0-15.0)+10.0); }

#endif

#ifndef FNC_PNOISE
#define FNC_PNOISE

float pnoise(in vec2 P, in vec2 rep) {
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, rep.xyxy); 
    Pi = mod289(Pi);        
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;

    vec4 i = permute(permute(ix) + iy);

    vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
    vec4 gy = abs(gx) - 0.5 ;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;

    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);

    vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;

    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));

    vec2 fade_xy = quintic(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

float pnoise(in vec3 P, in vec3 rep) {
    vec3 Pi0 = mod(floor(P), rep); 
    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); 
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P); 
    vec3 Pf1 = Pf0 - vec3(1.0); 
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 * (1.0 / 7.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 * (1.0 / 7.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = quintic(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
}

float pnoise(in vec4 P, in vec4 rep) {
    vec4 Pi0 = mod(floor(P), rep); 
    vec4 Pi1 = mod(Pi0 + 1.0, rep); 
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec4 Pf0 = fract(P); 
    vec4 Pf1 = Pf0 - 1.0; 
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = vec4(Pi0.zzzz);
    vec4 iz1 = vec4(Pi1.zzzz);
    vec4 iw0 = vec4(Pi0.wwww);
    vec4 iw1 = vec4(Pi1.wwww);

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);
    vec4 ixy00 = permute(ixy0 + iw0);
    vec4 ixy01 = permute(ixy0 + iw1);
    vec4 ixy10 = permute(ixy1 + iw0);
    vec4 ixy11 = permute(ixy1 + iw1);

    vec4 gx00 = ixy00 * (1.0 / 7.0);
    vec4 gy00 = floor(gx00) * (1.0 / 7.0);
    vec4 gz00 = floor(gy00) * (1.0 / 6.0);
    gx00 = fract(gx00) - 0.5;
    gy00 = fract(gy00) - 0.5;
    gz00 = fract(gz00) - 0.5;
    vec4 gw00 = vec4(0.75) - abs(gx00) - abs(gy00) - abs(gz00);
    vec4 sw00 = step(gw00, vec4(0.0));
    gx00 -= sw00 * (step(0.0, gx00) - 0.5);
    gy00 -= sw00 * (step(0.0, gy00) - 0.5);

    vec4 gx01 = ixy01 * (1.0 / 7.0);
    vec4 gy01 = floor(gx01) * (1.0 / 7.0);
    vec4 gz01 = floor(gy01) * (1.0 / 6.0);
    gx01 = fract(gx01) - 0.5;
    gy01 = fract(gy01) - 0.5;
    gz01 = fract(gz01) - 0.5;
    vec4 gw01 = vec4(0.75) - abs(gx01) - abs(gy01) - abs(gz01);
    vec4 sw01 = step(gw01, vec4(0.0));
    gx01 -= sw01 * (step(0.0, gx01) - 0.5);
    gy01 -= sw01 * (step(0.0, gy01) - 0.5);

    vec4 gx10 = ixy10 * (1.0 / 7.0);
    vec4 gy10 = floor(gx10) * (1.0 / 7.0);
    vec4 gz10 = floor(gy10) * (1.0 / 6.0);
    gx10 = fract(gx10) - 0.5;
    gy10 = fract(gy10) - 0.5;
    gz10 = fract(gz10) - 0.5;
    vec4 gw10 = vec4(0.75) - abs(gx10) - abs(gy10) - abs(gz10);
    vec4 sw10 = step(gw10, vec4(0.0));
    gx10 -= sw10 * (step(0.0, gx10) - 0.5);
    gy10 -= sw10 * (step(0.0, gy10) - 0.5);

    vec4 gx11 = ixy11 * (1.0 / 7.0);
    vec4 gy11 = floor(gx11) * (1.0 / 7.0);
    vec4 gz11 = floor(gy11) * (1.0 / 6.0);
    gx11 = fract(gx11) - 0.5;
    gy11 = fract(gy11) - 0.5;
    gz11 = fract(gz11) - 0.5;
    vec4 gw11 = vec4(0.75) - abs(gx11) - abs(gy11) - abs(gz11);
    vec4 sw11 = step(gw11, vec4(0.0));
    gx11 -= sw11 * (step(0.0, gx11) - 0.5);
    gy11 -= sw11 * (step(0.0, gy11) - 0.5);

    vec4 g0000 = vec4(gx00.x,gy00.x,gz00.x,gw00.x);
    vec4 g1000 = vec4(gx00.y,gy00.y,gz00.y,gw00.y);
    vec4 g0100 = vec4(gx00.z,gy00.z,gz00.z,gw00.z);
    vec4 g1100 = vec4(gx00.w,gy00.w,gz00.w,gw00.w);
    vec4 g0010 = vec4(gx10.x,gy10.x,gz10.x,gw10.x);
    vec4 g1010 = vec4(gx10.y,gy10.y,gz10.y,gw10.y);
    vec4 g0110 = vec4(gx10.z,gy10.z,gz10.z,gw10.z);
    vec4 g1110 = vec4(gx10.w,gy10.w,gz10.w,gw10.w);
    vec4 g0001 = vec4(gx01.x,gy01.x,gz01.x,gw01.x);
    vec4 g1001 = vec4(gx01.y,gy01.y,gz01.y,gw01.y);
    vec4 g0101 = vec4(gx01.z,gy01.z,gz01.z,gw01.z);
    vec4 g1101 = vec4(gx01.w,gy01.w,gz01.w,gw01.w);
    vec4 g0011 = vec4(gx11.x,gy11.x,gz11.x,gw11.x);
    vec4 g1011 = vec4(gx11.y,gy11.y,gz11.y,gw11.y);
    vec4 g0111 = vec4(gx11.z,gy11.z,gz11.z,gw11.z);
    vec4 g1111 = vec4(gx11.w,gy11.w,gz11.w,gw11.w);

    vec4 norm00 = taylorInvSqrt(vec4(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100)));
    g0000 *= norm00.x;
    g0100 *= norm00.y;
    g1000 *= norm00.z;
    g1100 *= norm00.w;

    vec4 norm01 = taylorInvSqrt(vec4(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101)));
    g0001 *= norm01.x;
    g0101 *= norm01.y;
    g1001 *= norm01.z;
    g1101 *= norm01.w;

    vec4 norm10 = taylorInvSqrt(vec4(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110)));
    g0010 *= norm10.x;
    g0110 *= norm10.y;
    g1010 *= norm10.z;
    g1110 *= norm10.w;

    vec4 norm11 = taylorInvSqrt(vec4(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111)));
    g0011 *= norm11.x;
    g0111 *= norm11.y;
    g1011 *= norm11.z;
    g1111 *= norm11.w;

    float n0000 = dot(g0000, Pf0);
    float n1000 = dot(g1000, vec4(Pf1.x, Pf0.yzw));
    float n0100 = dot(g0100, vec4(Pf0.x, Pf1.y, Pf0.zw));
    float n1100 = dot(g1100, vec4(Pf1.xy, Pf0.zw));
    float n0010 = dot(g0010, vec4(Pf0.xy, Pf1.z, Pf0.w));
    float n1010 = dot(g1010, vec4(Pf1.x, Pf0.y, Pf1.z, Pf0.w));
    float n0110 = dot(g0110, vec4(Pf0.x, Pf1.yz, Pf0.w));
    float n1110 = dot(g1110, vec4(Pf1.xyz, Pf0.w));
    float n0001 = dot(g0001, vec4(Pf0.xyz, Pf1.w));
    float n1001 = dot(g1001, vec4(Pf1.x, Pf0.yz, Pf1.w));
    float n0101 = dot(g0101, vec4(Pf0.x, Pf1.y, Pf0.z, Pf1.w));
    float n1101 = dot(g1101, vec4(Pf1.xy, Pf0.z, Pf1.w));
    float n0011 = dot(g0011, vec4(Pf0.xy, Pf1.zw));
    float n1011 = dot(g1011, vec4(Pf1.x, Pf0.y, Pf1.zw));
    float n0111 = dot(g0111, vec4(Pf0.x, Pf1.yzw));
    float n1111 = dot(g1111, Pf1);

    vec4 fade_xyzw = quintic(Pf0);
    vec4 n_0w = mix(vec4(n0000, n1000, n0100, n1100), vec4(n0001, n1001, n0101, n1101), fade_xyzw.w);
    vec4 n_1w = mix(vec4(n0010, n1010, n0110, n1110), vec4(n0011, n1011, n0111, n1111), fade_xyzw.w);
    vec4 n_zw = mix(n_0w, n_1w, fade_xyzw.z);
    vec2 n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);
    float n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);
    return 2.2 * n_xyzw;
}
#endif

#ifndef SRGB_EPSILON 
#define SRGB_EPSILON 0.00000001
#endif

#ifndef FNC_SRGB2RGB
#define FNC_SRGB2RGB

float srgb2rgb(float channel) {
    return (channel < 0.04045) ? channel * 0.0773993808 : pow((channel + 0.055) * 0.947867298578199, 2.4);
}

vec3 srgb2rgb(vec3 srgb) {
    return vec3(srgb2rgb(srgb.r + SRGB_EPSILON), 
                srgb2rgb(srgb.g + SRGB_EPSILON),
                srgb2rgb(srgb.b + SRGB_EPSILON));
}

vec4 srgb2rgb(vec4 srgb) {
    return vec4(srgb2rgb(srgb.rgb), srgb.a);
}

#endif

#if !defined(FNC_SATURATE) && !defined(saturate)
#define FNC_SATURATE
#define saturate(x) clamp(x, 0.0, 1.0)
#endif

#ifndef SRGB_EPSILON 
#define SRGB_EPSILON 0.00000001
#endif

#ifndef FNC_RGB2SRGB
#define FNC_RGB2SRGB

float rgb2srgb(float channel) {
    return (channel < 0.0031308) ? channel * 12.92 : 1.055 * pow(channel, 0.4166666666666667) - 0.055;
}

vec3 rgb2srgb(vec3 rgb) {
    return saturate(vec3(rgb2srgb(rgb.r - SRGB_EPSILON), rgb2srgb(rgb.g - SRGB_EPSILON), rgb2srgb(rgb.b - SRGB_EPSILON)));
}

vec4 rgb2srgb(vec4 rgb) {
    return vec4(rgb2srgb(rgb.rgb), rgb.a);
}

#endif

#ifndef FNC_MIXOKLAB
#define FNC_MIXOKLAB
vec3 mixOklab( vec3 colA, vec3 colB, float h ) {

    #ifdef MIXOKLAB_COLORSPACE_SRGB
    colA = srgb2rgb(colA);
    colB = srgb2rgb(colB);
    #endif

    const mat3 kCONEtoLMS = mat3(                
         0.4121656120,  0.2118591070,  0.0883097947,
         0.5362752080,  0.6807189584,  0.2818474174,
         0.0514575653,  0.1074065790,  0.6302613616);
    const mat3 kLMStoCONE = mat3(
         4.0767245293, -1.2681437731, -0.0041119885,
        -3.3072168827,  2.6093323231, -0.7034763098,
         0.2307590544, -0.3411344290,  1.7068625689);

    vec3 lmsA = pow( kCONEtoLMS * colA, vec3(1.0/3.0) );
    vec3 lmsB = pow( kCONEtoLMS * colB, vec3(1.0/3.0) );
    
    vec3 lms = mix( lmsA, lmsB, h );

    vec3 rgb = kLMStoCONE*(lms*lms*lms);

    #ifdef MIXOKLAB_COLORSPACE_SRGB
    return rgb2srgb(rgb);
    #else
    return rgb;
    #endif
}

vec4 mixOklab( vec4 colA, vec4 colB, float h ) {
    return vec4( mixOklab(colA.rgb, colB.rgb, h), mix(colA.a, colB.a, h) );
}
#endif


float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed)
{
    vec2 sourceToCoord = coord - raySource;
    float cosAngle = dot(normalize(sourceToCoord), rayRefDirection);
    
    // Calculate the diagonal length
    float diagonal = length(u_resolution);

    return clamp(
        (.45 + 0.15 * sin(cosAngle * seedA + u_time * speed)) +
        (0.3 + 0.2 * cos(-cosAngle * seedB + u_time * speed)),
        u_reach, 1.0) *
        clamp((diagonal - length(sourceToCoord)) / diagonal, u_reach, 1.0);
}

void main()
{
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv.y = 1.0 - uv.y;
    vec2 coord = vec2(gl_FragCoord.x, u_resolution.y - gl_FragCoord.y);
    float speed = u_rays * 10.0;
    
    // Set the parameters of the sun rays
    vec2 rayPos1 = u_rayPos1;
    vec2 rayRefDir1 = normalize(vec2(1.0, -0.116));
    float raySeedA1 = 36.2214*speed;
    float raySeedB1 = 21.11349*speed;
    float raySpeed1 = 1.5*speed;
    
    vec2 rayPos2 = u_rayPos2;
    vec2 rayRefDir2 = normalize(vec2(1.0, 0.241));
    float raySeedA2 = 22.39910*speed;
    float raySeedB2 = 18.0234*speed;
    float raySpeed2 = 1.1*speed;
    
    // Calculate ray strengths
    float strength1 = rayStrength(rayPos1, rayRefDir1, coord, raySeedA1, raySeedB1, raySpeed1);
    float strength2 = rayStrength(rayPos2, rayRefDir2, coord, raySeedA2, raySeedB2, raySpeed2);
    
    // Calculate brightness attenuation
    float brightness = 1.0*u_reach - (coord.y / u_resolution.y);
    float attenuation = clamp(brightness + (0.5 + u_intensity), 0.0, 1.0);
    
    // Calculate alpha values while preserving color
    float alpha1 = strength1 * attenuation * u_colors[0].a;
    float alpha2 = strength2 * attenuation * u_colors[1].a;
    
    // Pre-multiply the colors with their alpha values
    vec3 premultColor1 = u_colors[0].rgb * alpha1;
    vec3 premultColor2 = u_colors[1].rgb * alpha2;
    
    // Blend the pre-multiplied colors
    vec3 blendedColor = premultColor1 + premultColor2;
    float blendedAlpha = alpha1 + alpha2 * (1.0 - alpha1);
    
    // Un-premultiply the final color
    vec3 finalRGB = blendedColor / max(blendedAlpha, 0.0001);
    
    gl_FragColor = vec4(finalRGB * blendedAlpha, blendedAlpha);
}
`;
export const __FramerMetadata__ = {"exports":{"default":{"type":"reactComponent","name":"Rays","slots":[],"annotations":{"framerIntrinsicHeight":"400","framerSupportedLayoutWidth":"fixed","framerDisableUnlink":"*","framerSupportedLayoutHeight":"fixed","framerIntrinsicWidth":"400","framerContractVersion":"1"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./Rays_Prod.map