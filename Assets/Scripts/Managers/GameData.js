import Manager from './Manager/Manager.js';
import IO from './GameData/IO.js';

export default (function(){
  'use strict';

  class GameData extends Manager{
    get Get(){
      return GameData;
    }

    static get IO(){
      return IO;
    }
  }

  return GameData;
})();
