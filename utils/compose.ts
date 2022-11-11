import type Track from "./track";
/**
 * 合成类
 */
export default class Compose {
  parent: Track | null;
  children: Track[];
  constructor(){
    this.parent = null;
    this.children = [];
  }
  add(obj:Track){
    obj.parent = this;
    this.children.push(obj);
  }
  update(t:number){
    this.children.forEach(v => {
      v.update(t);
    })
  }
}