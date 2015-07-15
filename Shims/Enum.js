export default (function(){
  'use strict';

  var
    valProp = Symbol('val'),
    stringProp = Symbol('string')
  ;

  class Enum{
    constructor(val){
      this.fromVal(val);
    }

    toInt(){
      return this[valProp]|0;
    }

    toString(){
      return this[stringProp];
    }

    fromVal(val){
      if(typeof(val) === 'string'){
        this.fromString(val);
      }else{
        this.fromInt(val);
      }
    }

    fromString(val){
      if(typeof(val) !== 'string'){
        throw new Error('Argument 1 must be a string!');
      }
      var
        numVal = 0|0,
        descriptor
      ;
      if(
        !this.constructor.hasOwnProperty(val) ||
        (
          !(descriptor = Object.getOwnPropertyDescriptor(
            this.constructor,
            val
          )) ||
          !('get' in descriptor) ||
          typeof(descriptor.get) !== 'function' ||
          typeof(numVal = descriptor.get()) !== 'number'
        )
      ){
        console.error('trying to instantiate from string', this, val);
        throw new Error('Cannot instantiate from string!');
      }

      this[stringProp] = val;
      this[valProp] = numVal|0;
    }

    fromInt(val){
      if(typeof(val) !== 'number'){
        console.log(this, val);
        throw new Error('Argument 1 must be a number!');
      }
      val = val|0;
      var
        con = this.constructor,
        enumProps = Object.getOwnPropertyNames(con).filter(function(prop){
          if([
            'caller',
            'callee',
            'arguments',
          ].indexOf(prop) >= 0){
            return false;
          }
          try{
            var
              desc = Object.getOwnPropertyDescriptor(con, prop)
            ;
            return (
              !!desc &&
              'get' in desc &&
              typeof(desc.get) === 'function' &&
              desc.get() === val
            );
          }catch(exception){
            console.error('exception for prop', prop, exception);
          }
          return false;
        })
      ;
      if(enumProps.length < 1){
        console.log( Object.getOwnPropertyDescriptor(con, Object.getOwnPropertyNames(con)[7]).get() === val, val);
        throw new Error('Cannot instantiate from number!');
      }

      this[stringProp] = enumProps[0];
      this[valProp] = val;
    }
  }

  Enum.prototype[valProp] = undefined;
  Enum.prototype[stringProp] = '';

  return Enum;
})();
