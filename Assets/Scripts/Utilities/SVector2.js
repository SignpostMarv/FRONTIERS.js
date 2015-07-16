export default (function(){
  'use strict';

  var
    props = {}
  ;

  class SVector2{
    constructor(x=+0, y=+0){
      this[props.x] = x;
      this[props.y] = y;
    }

    get x(){
      return this[props.x];
    }
    set x(val){
      if(typeof(val) === 'string'){
        val = parseFloat(val);
      }else if(typeof(val) !== 'number'){
        throw new Error('val must be numeber!');
      }
      this[props.x] = val;
    }

    get y(){
      return this[props.y];
    }
    set y(val){
      if(typeof(val) === 'string'){
        val = parseFloat(val);
      }else if(typeof(val) !== 'number'){
        throw new Error('val must be numeber!');
      }
      this[props.y] = val;
    }

    CopyFrom(other){
      if(!(other instanceof SVector2)){
        console.error(other);
        throw new Error(
          'Can only copy from other instances of SVector2'
        );
      }
      this.x = other.x;
      this.y = other.y;
    }

    static get zero(){
      return new SVector2();
    }

    static get one(){
      return new SVector2(1, 1);
    }
  }

  for(var prop of [
    'x',
    'y'
  ]){
    props[prop] = Symbol(prop);
  }

  SVector2.prototype[props.x] = +0;
  SVector2.prototype[props.y] = +0;

  return SVector2;
})();
