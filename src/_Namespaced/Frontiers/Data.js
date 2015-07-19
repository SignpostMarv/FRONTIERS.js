import GameData from '../../Assets/Scripts/Managers/GameData.js';
import MobileReference from '../../Assets/Scripts/Managers/GameData/MobileReference.js';

export default (function(){
  'use strict';

  class Data{

    static get GameData(){
      return GameData;
    }

    static get MobileReference(){
      return MobileReference;
    }
  }

  return Data;
})();
