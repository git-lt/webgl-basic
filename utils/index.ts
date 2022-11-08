export function initShader(gl:WebGL2RenderingContext, vsSource:string, fsSource:string){
  const program = gl.createProgram() as WebGLProgram;

  const vertextShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if(!vertextShader || !fragmentShader) return false;

  // 顶着色器 与 片元着色器 绑定到 program 中
  gl.attachShader(program, vertextShader);
  gl.attachShader(program, fragmentShader);

  // program 连接到 webgl 中
  gl.linkProgram(program);

  // 启动 program
  gl.useProgram(program);
  // @ts-ignore;
  gl.program = program;

  return true;
}

/**
 * 创建着色器对象
 */
export function loadShader(gl: WebGL2RenderingContext, type:number, source:string){
  // 创建着色器对象
  const shader = gl.createShader(type) as WebGLShader;
  // 绑定着色器对象
  gl.shaderSource(shader, source);
  // 编译着色器对象
  gl.compileShader(shader);
  return shader;
}