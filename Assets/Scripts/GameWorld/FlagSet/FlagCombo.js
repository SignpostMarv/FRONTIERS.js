import applyDefaultPropsSpecToObject from '../../../../Utilities/applyDefaultPropsSpecToObject.js';

export default (function(){
  'use strict';

  var
    props = Symbol('props'),
    defaultProps = {
      Name: function(){
        return 'Combo';
      },
      Values: function(){
        return [];
      },
    }
  ;

  class FlagCombo{
    constructor(){
      applyDefaultPropsSpecToObject(this, props, defaultProps);
    }

    get Name(){
      return this[props].Name;
    }

    set Name(val){
      this[props].Name = (val + '');
    }

    get Values(){
      return this[props].Values;
    }

    set Values(val){
      if(!(val instanceof Array)){
        throw new Error('FlagCombo.Values must be an Array');
      }
      this[props].Values = val;
    }

    get Combo(){
      var
        c = 0|0,
        i = 0|0
      ;
      for(i=0;i<this.Values.length;i++){
        c |= 1 << this.Values[i];
      }
      return c;
    }
  }

  return FlagCombo;
})();
