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

// @ts-ignore
const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
// @ts-ignore
const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
// @ts-ignore 获取 uniform 定义的变量
const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

gl.vertexAttrib1f(a_Position, .1);
gl.vertexAttrib1f(a_PointSize, 100);
// 设置 uniform 变量的值，改变颜色
gl.uniform4f(u_FragColor, 0, 0, 1, 1);

gl.drawArrays(gl.POINTS, 0, 1);



const points = [
  {x: 0, y: 0, size: 10, color: { r: 1, g: 0, b: 0, a: 1}},
]

render();

function render(){
  gl.clear(gl.COLOR_BUFFER_BIT)
  points.forEach(({ x, y, size, color: { r,g,b,a }}) => {
    gl.vertexAttrib2f(a_Position, x, y);
    gl.vertexAttrib1f(a_PointSize, size);
    const arr = new Float32Array([r, g, b, a])
    gl.uniform4fv(u_FragColor, arr);
    gl.drawArrays(gl.POINTS, 0, 1);
  })
}

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

  // 随机大小 随机颜色
  const size = Math.random() * 50+10;
  const color = {r: Math.random(), g: Math.random(), b: Math.random(), a: 1};

  points.push({ x, y, size, color });
  render();
})




