export default (function(){
  'use strict';

  var
    props = Symbol('props'),
    registry = Symbol('registry')
  ;

  class GameObject{
    constructor(name){
      if(GameObject[registry].has(name)){
        throw new Error('Object already exists on registry!');
      }
      this[props].Name = name;
    }

    get Name(){
      return this[props].Name;
    }

    static Find(name){
      return GameObject[registry].get(name);
    }

    static FindOrMake(name){
      if(!GameObject[registry].has(name)){
        return new GameObject(name);
      }
      return GameObject.Find(name);
    }
  }

  GameObject.prototype[props] = {};
  GameObject[registry] = {};

  return GameObject;
})();
