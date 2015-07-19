import Enum from '../../Shims/Enum.js';

export default (function(){
  'use strict';

  class CloudType extends Enum{

    static get None(){
      return 0|0;
    }

    static get Few(){
      return 1|0;
    }

    static get Scattered(){
      return 2|0;
    }

    static get Broken(){
      return 3|0;
    }

    static get Overcast(){
      return 4|0;
    }

    static get Custom(){
      return 5|0;
    }
  }

  return CloudType;
})();
