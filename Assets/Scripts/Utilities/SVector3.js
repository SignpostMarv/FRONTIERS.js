import XmlHelper from '../Managers/GameData/XmlHelper.js';

export default (function(){
  var
    props = Symbol('props')
  ;

  class SVector3{

    constructor(x=+0, y=+0, z=+0){
      this.x = x;
      this.y = y;
      this.z = z;
    }

    get x(){
      return this[props].x;
    }

    set x(val){
      if(typeof(val) !== 'number'){
        throw new Error('x must be a number!');
      }
      this[props].x = +val;
    }

    get y(){
      return this[props].y;
    }

    set y(val){
      if(typeof(val) !== 'number'){
        throw new Error('y must be a number!');
      }
      this[props].y = +val;
    }

    get z(){
      return this[props].z;
    }

    set z(val){
      if(typeof(val) !== 'number'){
        throw new Error('z must be a number!');
      }
      this[props].z = +val;
    }

    static get zero(){
      return new SVector3();
    }

    static get one(){
      return new SVector3(+1, +1, +1);
    }

    CopyFrom(other){
      if(!(other instanceof SVector3)){
        throw new Error('Can only copy from instances of SVector3');
      }
      this.x = other.x;
      this.y = other.y;
      this.z = other.z;
    }

    Add(other){
      if(!(other instanceof SVector3)){
        throw new Error('Can only Add from instances of SVector3');
      }
      return new SVector3(
        this.x + other.x,
        this.y + other.y,
        this.z + other.z
      );
    }

    Subtract(other){
      if(!(other instanceof SVector3)){
        throw new Error('Can only Subtract from instances of SVector3');
      }
      return new SVector3(
        this.x - other.x,
        this.y - other.y,
        this.z - other.z
      );
    }

    toString(){
      return (
        this.x.toString() + ',' +
        this.y.toString() + ',' +
        this.z.toString()
      );
    }

    static Parse(sVector3String){
      sVector3String += '';
      var
        sVector3 = new SVector3(),
        splitString = sVector3String.split(',')
      ;
      if(splitString.length >= 2){
        sVector3.x = parseFloat(splitString[0]);
        sVector3.y = parseFloat(splitString[1]);
        sVector3.z = parseFloat(splitString[2]);
      }

      return sVector3;
    }

    static Random(min, max){
      if(typeof(min) !== 'number' || typeof(max) !== 'number'){
        throw new Error('Min and max constraints must be supplied as number!');
      }
      return new SVector3(
        Math.random() * (max - min) + min,
        Math.random() * (max - min) + min,
        Math.random() * (max - min) + min
      );
    }

    static FromJXON(jxon){
      return XmlHelper.JXON2Type(
        jxon,
        null,
        SVector3,
        [
          'x',
          'y',
          'z'
        ]
      );
    }
  }

  SVector3.prototype[props] = {};
  SVector3.prototype[props].x = +0;
  SVector3.prototype[props].y = +0;
  SVector3.prototype[props].z = +0;

  return SVector3;
})();
