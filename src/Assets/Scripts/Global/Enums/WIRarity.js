import Enum from '../../../../Shims/Enum.js';

export default (function(){
  'use strict';

  class WIRarity extends Enum{

    static get Rarity(){
      return 0|0;
    }

    static get Common(){
      return 1|0;
    }

    static get Uncommon(){
      return 2|0;
    }

    static get Rare(){
      return 4|0;
    }

    static get Exclusive(){
      return 8|0;
    }

    static get FlagsAll(){
      return WIRarity.Common | WIRarity.Uncommon | WIRarity.Rare | WIRarity.Exclusive;
    }

  }

  return WIRarity;
})();
