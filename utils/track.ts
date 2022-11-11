import type Compose from "./compose";

/**
 * 轨道
 */
export default class Track {
  target: Record<string, number>;
  parent: Compose | null;
  // 起始时间
  start: number;
  // 动画时间长度
  timeLen: number;
  // 是否循环
  loop: boolean;
  // 需要更新的动画属性值映射集合
  keyMap: Map<string, [number, number][]>;
  constructor(target: Record<string, number>){
    this.target = target;
    this.parent = null;
    this.start = 0;
    this.timeLen = 5;
    this.loop = false;
    this.keyMap = new Map();
  }

  update(t: number) {
    const { keyMap, timeLen, target, loop, start } = this;
    // 当前时间
    let time = t - start;
    if(loop) {
      time = time % timeLen;
    }
    
    for( const [key, fms] of keyMap ){
      const last = fms.length - 1;
      // 状态只能在起始和终止关键帧间变化，
      // 小于起始关键帧的时间就重置为第一帧的时间，
      // 大于终止关键帧的时间就重置为最后一帧的时间
      if(time < fms[0][0]){
        target[key] = fms[0][1];
      }else if(time > fms[last][0]){
        target[key] = fms[last][1];
      }else{
        const value = getValBetweenFms(time, fms, last);
        console.log(value)
        if(value){
          target[key] = 1-value;
        }
        
      }
    }
  }
}

// 点斜式计算当前时间对应的状态值 y = k*x + b (k:斜率 b:截距 x:时间 y:状态)
function getValBetweenFms(time:number, fms:[number, number][], last: number){
  for(let i = 0; i<last; i++){
    const fm1 = fms[i];
    const fm2 = fms[i+1];
    if(time >= fm1[0] && time <= fm2[0]){
      const delta = {
        x: fm2[0] - fm1[0],
        y: fm2[1] = fm1[1],
      }
      const k = delta.y / delta.x;
      const b = fm1[1] - fm1[0] * k;
      return k * time + b;
    }
  }
  return 0;
}