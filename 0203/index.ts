import { initShader } from '../utils/index'
import vsSource from './glsl/vertex.glsl?raw';
import fsSource from './glsl/fragment.glsl?raw';

// set canvas size
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// webgl context
const gl = canvas.getContext('webgl') as WebGL2RenderingContext;

initShader(gl, vsSource, fsSource);

// 从程序中获取 attribute 变量 a_Position
// @ts-ignore
const a_Position = gl.getAttribLocation(gl.program, 'a_Position');

// 刷新画布
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT)


// // 绘制点
// gl.vertexAttrib2f(a_Position, 0.2, 0);
// gl.drawArrays(gl.POINTS, 0, 1);

// gl.vertexAttrib2f(a_Position, -0.2, 0);
// gl.drawArrays(gl.POINTS, 0, 1);

const points = [
  {x: -0.2, y: 0},
  {x: 0.2, y: 0},
]


// 将之前的点缓存，然后一次性绘制所有的点
setTimeout(() => {
  points.push({x: 0, y: 0});
  render();
}, 1000)


function render(){
  gl.clear(gl.COLOR_BUFFER_BIT);
  points.forEach(v => {
    gl.vertexAttrib2f(a_Position, v.x, v.y);
    gl.drawArrays(gl.POINTS, 0, 1);
  })
}
render();







