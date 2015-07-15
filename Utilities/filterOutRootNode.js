export default (function(){
  return function filterOutRootNode(jxon, rootNode){
    'use strict';
    return new Promise(function(resolve, reject){
      if(
        rootNode === undefined ||
        rootNode === null
      ){
        resolve(jxon);
        return;
      }
      if(!(rootNode in jxon)){
        reject(new Error(rootNode + ' not found in jxon object.'));
      }else{
        resolve(jxon[rootNode]);
      }
    });
  };
})();
