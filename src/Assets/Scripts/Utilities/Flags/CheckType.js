export default (function(){
  'use strict';

  class CheckType{

    static get MatchAll(){
      return 0|0;
    }

    static get MatchAny(){
      return 1|0;
    }

    static get MatchExact(){
      return 2|0;
    }
  }

  return CheckType;
})();
