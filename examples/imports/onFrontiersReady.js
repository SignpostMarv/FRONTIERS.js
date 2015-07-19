System.transpiler = 'babel';
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
    System.import(
      '../src/FRONTIERS.js'
    ).then(function(Frontiers){
      window.Frontiers = Frontiers.default;
      loaded = true;
      cb();
    }, err);
  };
})();
