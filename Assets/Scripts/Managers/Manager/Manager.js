import GameObject from '../../../../Stubs/Unity/GameObject.js';

export default (function(){
  'use strict';

  var
    props = Symbol('props'),
    staticProps = Symbol('props'),
    defaultProps = {
      mInitialized: function(){
        return false;
      },
      mTexturesLoaded: function(){
        return false;
      },
      mModsLoaded: function(){
        return false;
      },
      mGameLoaded: function(){
        return false;
      },
      mGameSaved: function(){
        return false;
      },
      mGameEnded: function(){
        return false;
      },
      mParentUnderManager: function(){
        return true;
      },
    }
  ;

  class Manager{
    constructor(){
      for(var prop of Object.keys(defaultProps)){
        this[props][prop] = defaultProps[prop]();
      }
    }

    static get ManagersParent(){
      return Manager[staticProps].ManagersParent;
    }

    static set ManagersParent(val){
      if(!(val instanceof GameObject)){
        throw new Error('ManagersParent must be an instanceof GameObject!');
      }
      Manager[staticProps] = val;
    }

    static get DetailsInfo(){
      return Manager[staticProps].DetailsInfo;
    }

    static set DetailsInfo(val){
      Manager[staticProps].DetailsInfo = (val + '');
    }

    static get GameObjectName(){
      return 'Frontiers_Manager';
    }

    get Initialized(){
      return this[props].mInitialized;
    }

    get TexturesLoaded(){
      return this[props].mTexturesLoaded;
    }

    get ModsLoaded(){
      return this[props].mModsLoaded;
    }

    get GameLoaded(){
      return this[props].mGameLoaded;
    }

    get GameSaved(){
      return this[props].mGameSaved;
    }

    get GameEnded(){
      return this[props].mGameEnded;
    }
  }

  Manager.prototype[props] = {};
  Manager[staticProps] = {};

  return Manager;
})();
