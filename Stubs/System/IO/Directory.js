export default (function(){
  'use strict';

  class Directory{

    static Exists(dir){
      return new Promise(function(resolve){
        fetch(dir).then(function(response){
          resolve(response.status === 200);
        }).catch(function(failure){
          console.error(failure);
          resolve(false);
        });
      });
    }
  }

  return Directory;
})();
