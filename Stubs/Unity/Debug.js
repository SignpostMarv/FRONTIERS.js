export default (function(){
  'use strict';

  class Debug{

    static Log(thing){
      console.log(thing);
    }

    static LogException(thing){
      console.error(thing);
    }

    static LogError(thing){
      console.error(thing);
    }
  }

  return Debug;
})();
