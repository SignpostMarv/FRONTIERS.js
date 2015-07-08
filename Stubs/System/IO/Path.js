export default (function(){
  'use strict';

  class Path{
    static Combine(){
      return Array.prototype.slice.call(arguments).join('/');
    }
  }

  return Path;
})();
