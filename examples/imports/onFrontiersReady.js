window.onFrontiersReady = (function(){
  'use strict';
  var
    loaded = false
  ;
  return function(cb, err){
    if(loaded){
      cb();
      return;
    }
    err = err || function(msg){
      console.error(msg);
    };
    require(['FRONTIERS'], function(FRONTIERS){
      window.Frontiers = FRONTIERS;
      loaded = true;
      cb();
    });
  };
})();
