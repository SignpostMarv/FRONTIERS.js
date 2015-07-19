import Enum from '../../../../Shims/Enum.js';

export default (function(){
  'use strict';

  class TemperatureRange extends Enum{

    static get A_DeadlyCold(){
      return 0|0;
    }

    static get B_Cold(){
      return 1|0;
    }

    static get C_Warm(){
      return 2|0;
    }

    static get D_Hot(){
      return 3|0;
    }

    static get E_DeadlyHot(){
      return 4|0;
    }
  }

  return TemperatureRange;
})();
