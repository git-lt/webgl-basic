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

gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT)


// 从程序中获取 attribute 变量 a_Position
// @ts-ignore
const a_Position = gl.getAttribLocation(gl.program, 'a_Position');

// 给 a_Position 赋值
gl.vertexAttrib1f(a_Position, 0.1);
// gl.vertexAttrib2f(a_Position, 0.3, -.5);
// gl.vertexAttrib3f(a_Position, 0.3, -.5, -1);

// 绘制点
gl.drawArrays(gl.POINTS, 0, 1);


// 通过点击鼠标绘制 点
canvas.addEventListener('click', ({ clientX, clientY }) => {
  // canvas 坐标转 webgl 坐标
  let { left, top, width, height } = canvas.getBoundingClientRect();
  const [ canvasX, canvasY ] = [clientX - left, clientY - top];
  const [ halfWidth, halfHeight ] = [width / 2, height / 2];
  // 计算基于中心点的坐标
  const [xBaseCenter, yBaseCenter] = [ canvasX - halfWidth, canvasY - halfHeight]
  // y方向 上正下负(基于canvas坐标，计算出来的y，是上负下正，这与webgl结果相反)
  const yBaseCenterTop = -yBaseCenter;
  // 计算webgl坐标: webgl 坐标区间是[-1, 1]
  const [x, y] = [xBaseCenter / halfWidth, yBaseCenterTop / halfHeight];

  gl.clear(gl.COLOR_BUFFER_BIT)
  
  gl.vertexAttrib2f(a_Position, x, y);
  gl.drawArrays(gl.POINTS, 0, 1);
})





