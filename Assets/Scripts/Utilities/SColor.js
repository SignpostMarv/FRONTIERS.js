export default (function(){
  'use strict';
  var
    props = Symbol('props')
  ;

  class SColor{
    constructor(R=+0, G=+0, B=+0, A=+1){
      this.a = A;
      this.r = R;
      this.g = G;
      this.b = B;
    }

    get a(){
      return this[props].a;
    }

    set a(val){
      if(typeof(val) === 'string'){
        val = parseFloat(val);
      }else if(typeof(val) !== 'number'){
        throw new Error('val must be a number!');
      }
      this[props].a = val;
    }

    get r(){
      return this[props].r;
    }

    set r(val){
      if(typeof(val) === 'string'){
        val = parseFloat(val);
      }else if(typeof(val) !== 'number'){
        throw new Error('val must be a number!');
      }
      this[props].r = val;
    }

    get g(){
      return this[props].g;
    }

    set g(val){
      if(typeof(val) === 'string'){
        val = parseFloat(val);
      }else if(typeof(val) !== 'number'){
        throw new Error('val must be a number!');
      }
      this[props].g = val;
    }

    get b(){
      return this[props].b;
    }

    set b(val){
      if(typeof(val) === 'string'){
        val = parseFloat(val);
      }else if(typeof(val) !== 'number'){
        throw new Error('val must be a number!');
      }
      this[props].b = val;
    }

    copyFrom(val){
      if(!(val instanceof SColor)){
        console.error(val);
        throw new Error('SColor can only copy from SColor');
      }
      this.r = val.r;
      this.g = val.g;
      this.b = val.b;
      this.a = val.a;
    }

    static get Random(){
      return new SColor(
        Math.random(),
        Math.random(),
        Math.random(),
        +1
      );
    }

    static get Black(){
      return new SColor(
        +0,
        +0,
        +0,
        +1
      );
    }

    static get White(){
      return new SColor(
        +1,
        +1,
        +1,
        +1
      );
    }

    toString(){
      var
        out = '',
        intChannel = 0|0
      ;
      for(var channel of [
        this.r,
        this.g,
        this.b
      ]){
        intChannel = (channel * 0xff)|0;
        if(intChannel < 0x10){
          out += '0';
        }
        out += intChannel.toString(16);
      }

      return out;
    }

    static FromJXON(jxon, obj){
      return new Promise(function(resolve, reject){
        if(obj === undefined){
          obj = new SColor();
        }else if(!(obj instanceof SColor)){
          console.error(obj);
          reject(new Error(
            'Supplied object must be instanceof SColor'
          ));
          return;
        }
        obj.r = jxon.r;
        obj.g = jxon.g;
        obj.b = jxon.b;
        obj.a = jxon.a;
        resolve(obj);
      });
    }
  }

  SColor.prototype[props] = {};
  SColor.prototype[props].a = +1;
  SColor.prototype[props].r = +0;
  SColor.prototype[props].g = +0;
  SColor.prototype[props].b = +0;

  return SColor;
})();
