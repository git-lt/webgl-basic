
precision mediump float;

uniform vec4 u_FragColor;

void main(){
  // 计算像素点距离中心点的位置，
  // 绘制区域是 1x1 的大小，圆形半径为0.5，
  // 只有像素中心点距离圆的中心点小于半径0.5的像素会被绘制，大于则舍弃
  float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
  // 小于 0.5 会被绘制，大于等于时，会被舍弃
  if(dist < 0.5){
    gl_FragColor = u_FragColor;
  }else{
    discard;
  }
}