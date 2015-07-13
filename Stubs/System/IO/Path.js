export default (function(){
  'use strict';

  class Path{
    static Combine(){
      return Array.prototype.slice.call(arguments).join('/');
    }

    static GetDirectoryName(path){
      var
        parts = path.split('/')
      ;
      parts.pop();

      return parts.join('/');
    }

    static GetFileName(path){
      return path.split('/').pop();
    }
  }

  return Path;
})();
