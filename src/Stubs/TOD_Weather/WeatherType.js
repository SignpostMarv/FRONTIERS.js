import Enum from '../../Shims/Enum.js';

export default (function(){
  'use strict';

  class WeatherType extends Enum{

    static get Clear(){
      return 0|0;
    }

    static get Dust(){
      return 1|0;
    }

    static get Fog(){
      return 2|0;
    }

    static get Storm(){
      return 3|0;
    }

    static get Custom(){
      return 4|0;
    }
  }

  return WeatherType;
})();
