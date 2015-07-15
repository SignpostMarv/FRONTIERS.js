export default (function(){
  'use strict';

  var
    props = Symbol('props')
  ;

  class WIGroupLoadState{

    constructor(val){
      this[props] = {};
      this[props].val = 0|0;
      if(typeof(val) === 'number'){
        this[props].val = val|0;
      }
    }

    toUint(){
      return Math.max(0, this[props].val)|0;
    }

    static fromUint(val){
      return new WIGroupLoadState(Math.max(0, val)|0);
    }

    static get None(){
      return 0;
    }

    static get Uninitialized(){
      return 1;
    }

    static get Initializing(){
      return 2;
    }

    static get Initialized(){
      return 4;
    }

    static get PreparingToLoad(){
      return 8;
    }

    static get Loading(){
      return 16;
    }

    static get Loaded(){
      return 32;
    }

    static get PreparingToUnload(){
      return 64;
    }

    static get Unloading(){
      return 128;
    }

    static get Unloaded(){
      return 256;
    }

  }

  return WIGroupLoadState;
})();
