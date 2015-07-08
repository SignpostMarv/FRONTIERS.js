export default (function(){
  'use strict';

  class DataType{

    static get Base(){
      return 0|0;
    }

    static get World(){
      return 1|0;
    }

    static get Profile(){
      return 2|0;
    }
  }

  return DataType;
})();
