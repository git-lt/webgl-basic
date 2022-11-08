import { Color } from 'https://unpkg.com/three/build/three.module.js';

// const color = new Color(1, 0, 0);
const color = new Color('rgba(255,9,0,1)');

const canvas = document.getElementById('canvas');
 
// 设置大小
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 创建3画布对象
const gl = canvas.getContext('webgl');

// 生成随颜色填充画布
function setRandomColor(){
  // 每次色相偏移 0.005 度 (色相、饱合度、亮度)
  color.offsetHSL(0.001, 0, 0);
  gl.clearColor(color.r, color.g, color.b, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  requestAnimationFrame(setRandomColor);
}

setRandomColor();

// 声明颜色
// gl.clearColor(0,0,0,1);
// 清空
// gl.clear(gl.COLOR_BUFFER_BIT);

