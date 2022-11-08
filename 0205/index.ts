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
// @ts-ignore
const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');

gl.vertexAttrib1f(a_Position, .1);
gl.vertexAttrib1f(a_PointSize, 100);

gl.drawArrays(gl.POINTS, 0, 1);





