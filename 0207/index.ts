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





