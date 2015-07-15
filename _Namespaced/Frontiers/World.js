import WIFlags from '../../Assets/Scripts/Managers/WorldItems_Classes/WIFlags.js';
import CharacterFlags from '../../Assets/Scripts/Managers/Characters_Classes/CharacterFlags.js';

export default (function(){
  'use strict';

  class World{

    static get WIFlags(){
      return WIFlags;
    }

    static get CharacterFlags(){
      return CharacterFlags;
    }
  }

  return World;
})();
