import Enum from '../../../../Shims/Enum.js';

export default (function(){
  'use strict';

  class WISize extends Enum{

    static get Tiny(){
      return 0|0;
    }

    static get Small(){
      return 1|0;
    }

    static get Medium(){
      return 2|0;
    }

    static get Large(){
      return 3|0;
    }

    static get Huge(){
      return 4|0;
    }

    static get NoLimit(){
      return 5|0;
    }
  }

  return WISize;
})();
