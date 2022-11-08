attribute vec4 a_Position;

void main(){
  // 点位
  gl_Position = a_Position;
  // 尺寸
  gl_PointSize = 50.0;
}
