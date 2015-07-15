import CheckType from './Flags/CheckType.js';

export default (function(){
  'use strict';

  class Flags{

    static get CheckType(){
      return CheckType;
    }

    static Has(objectFlagsEnum, checkFlagsEnum){
      return Flags.Check(objectFlagsEnum, checkFlagsEnum, CheckType.MatchAny);
    }

    static Check(objectFlagsEnum, checkFlagsEnum, checkType){
      if(
        typeof(objectFlagsEnum) !== 'number' ||
        typeof(checkFlagsEnum) !== 'number'
      ){
        throw new Error(
          'Flags::Check() can only compare numbers!'
        );
      }

      objectFlagsEnum = Math.max(0, objectFlagsEnum)|0;
      checkFlagsEnum = Math.max(0, checkFlagsEnum)|0;

      if(objectFlagsEnum === 0 || checkFlagsEnum === 0){
        return false;
      }

      var
        check = false
      ;

      switch(checkType){
        case CheckType.MatchExact:
          check = (objectFlagsEnum === checkFlagsEnum);
        break;

        case CheckType.MatchAny:
          check = ((objectFlagsEnum & checkFlagsEnum) !== 0);
        break;

        default:
        case CheckType.MatchAll:
          check = ((objectFlagsEnum & checkFlagsEnum) === objectFlagsEnum);
        break;
      }
    }
  }

  return Flags;
})();
