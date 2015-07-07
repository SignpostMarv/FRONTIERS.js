export default (function(){
  'use strict';

  class GroundType{
    static get Dirt(){
      return 0|0;
    }

    static get Leaves(){
      return 1|0;
    }

    static get Metal(){
      return 2|0;
    }

    static get Mud(){
      return 3|0;
    }

    static get Snow(){
      return 4|0;
    }

    static get Stone(){
      return 5|0;
    }

    static get Water(){
      return 6|0;
    }

    static get Wood(){
      return 7|0;
    }

  }

  return GroundType;
})();
