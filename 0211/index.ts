import { initShader } from '../utils/index'
import vsSource from './glsl/vertex.glsl?raw';
import fsSource from './glsl/fragment.glsl?raw';
import Compose from '../utils/compose';
import Track from '../utils/track';


  //合成对象
  const compose = new Compose();

// set canvas size
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// webgl context
const gl = canvas.getContext('webgl') as WebGL2RenderingContext;

// 开启颜色混合功能
gl.enable(gl.BLEND)
// 设置混合
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

initShader(gl, vsSource, fsSource);

gl.clearColor(0, 0, 0, 0);
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


// let starts = [];
const defaultPoint = {x: 0, y: 0, s: 10, a:1 };

const starts: typeof defaultPoint[] = []


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
  const s = Math.random() * 5 + 2;
  // 固定白色，只随机透明度
  const a = 1;
  const obj = { x, y, s, a };
  starts.push(obj);

  const track = new Track(obj);
  track.start = new Date().getTime();
  track.timeLen = 2000;
  track.loop = true;
  track.keyMap = new Map([
    [
      'a', [
        [500, a],
        [1000, 0],
        [1500, a],
      ]
    ]
  ])

  compose.add(track);
})

function render(){
  gl.clear(gl.COLOR_BUFFER_BIT)
  starts.forEach(({ x, y, s, a}) => {
    gl.vertexAttrib2f(a_Position, x, y);
    gl.vertexAttrib1f(a_PointSize, s);
    const arr = new Float32Array([0.87, 0.91, 1, a])
    gl.uniform4fv(u_FragColor, arr);
    gl.drawArrays(gl.POINTS, 0, 1);
  })
}


function tick(){
  compose.update(new Date().getTime());
  render();
  requestAnimationFrame(tick);
}

tick();



