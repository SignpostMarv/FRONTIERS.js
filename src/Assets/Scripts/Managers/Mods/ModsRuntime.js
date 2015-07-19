import IO from '../GameData/IO.js';

export default (function(){
  'use strict';

  class ModsRuntime{

    LoadMod(dataType, dataName){
      return IO.LoadWorldData(dataType, dataName);
    }

    Texture(dataType, dataName){
      return IO.LoadWorldTexture(dataType, dataName);
    }
  }

  return ModsRuntime;
})();
