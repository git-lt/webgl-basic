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

const points = [
  {x: 0, y: 0, size: 10},
]

render();

function render(){
  gl.clear(gl.COLOR_BUFFER_BIT)
  points.forEach(v => {
    gl.vertexAttrib2f(a_Position, v.x, v.y);
    gl.vertexAttrib1f(a_PointSize, v.size);
    gl.drawArrays(gl.POINTS, 0, 1);
  })
}

// 通过点击鼠标点击连续绘制多个大小随机的点
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

  points.push({ x, y, size: Math.random() * 50+10});

  render();
})



// gl.vertexAttrib1f(a_Position, .1);
// gl.vertexAttrib1f(a_PointSize, 100);

// gl.drawArrays(gl.POINTS, 0, 1);





