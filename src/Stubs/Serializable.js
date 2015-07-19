export default (function(){
  'use strict';

  class Serializable{
    static GetJXONFromXML(xmlstring){
      return new Promise(function(resolve, reject){
        try{
          JXON.config({
            lowerCaseTags: false,
            trueIsEmpty: false
          });
          resolve(JXON.stringToJs(xmlstring));
        }catch(failure){
          reject(failure);
        }
      });
    }
  }

  return Serializable;
})();
