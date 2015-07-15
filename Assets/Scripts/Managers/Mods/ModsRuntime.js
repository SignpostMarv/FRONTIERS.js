import IO from '../GameData/IO.js';

export default (function(){
  'use strict';

  class ModsRuntime{

    LoadMod(dataType, dataName){
      return IO.LoadWorldData(dataType, dataName);
    }
  }

  return ModsRuntime;
})();
