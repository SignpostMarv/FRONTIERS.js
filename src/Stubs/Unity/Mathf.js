export default (function(){
  'use strict';

  class Mathf{

    static Clamp(val, min, max){
      val = +val;
      min = +min;
      max = +max;

      return Math.max(min, Math.min(max, val));
    }
  }

  return Mathf;
})();
