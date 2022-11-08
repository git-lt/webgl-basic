const canvas = document.getElementById('canvas');

// 设置大小
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 创建3画布对象
const gl = canvas.getContext('webgl');

// 声明颜色
gl.clearColor(0,0,0,1);

// 清空
gl.clear(gl.COLOR_BUFFER_BIT);


// ------------------------------- CSS颜色
const rgbCss = 'rgba(0, 255, 33, 1)';
const reg = RegExp(/\((.*)\)/);
const rgbStr = reg.exec(rgbCss)[1];

console.log(rgbStr);
const rgba = rgbStr.split(',').map(n => parseInt(n, 10));

console.log(rgba);
const [r, g, b, a] = rgba;

gl.clearColor(r,g,b,a);

gl.clear(gl.COLOR_BUFFER_BIT);