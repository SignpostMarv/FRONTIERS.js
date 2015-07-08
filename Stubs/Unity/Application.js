import RuntimePlatform from './RuntimePlatform.js';

export default (function(){
  'use strict';

  class Application{

    static get platform(){
      return RuntimePlatform.ES2015;
    }
  }

  return Application;
})();
