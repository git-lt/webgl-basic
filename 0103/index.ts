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
gl.drawArrays(gl.POINTS, 0, 1);



