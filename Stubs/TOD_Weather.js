import WeatherType from './TOD_Weather/WeatherType.js';
import CloudType from './TOD_Weather/CloudType.js';

export default (function(){
  'use strict';

  class TOD_Weather{

    static get WeatherType(){
      return WeatherType;
    }

    static get CloudType(){
      return CloudType;
    }
  }

  return TOD_Weather;
})();
