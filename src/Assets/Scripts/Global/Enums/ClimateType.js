import Enum from '../../../../Shims/Enum.js';

export default (function(){
  'use strict';

  class ClimateType extends Enum{

    static get Arctic(){
      return 0|0;
    }

    static get Desert(){
      return 1|0;
    }

    static get Rainforest(){
      return 2|0;
    }

    static get Temperate(){
      return 3|0;
    }

    static get TropicalCoast(){
      return 4|0;
    }

    static get Wetland(){
      return 5|0;
    }
  }

  return ClimateType;
})();
