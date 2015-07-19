import Manager from './Manager/Manager.js';
import ModsRuntime from './Mods/ModsRuntime.js';

export default (function(){
  'use strict';

  var
    props = Symbol('props'),
    staticProps = Symbol('props')
  ;

  class Mods extends Manager{

    constructor(){
      super();
      this[props] = {};
      this[props].Runtime = new ModsRuntime();
    }

    get Runtime(){
      return this[props].Runtime;
    }

    static get Get(){
      return Mods[staticProps].Get;
    }
  }

  Mods[staticProps] = {
    Get: new Mods(),
  };

  return Mods;
})();
