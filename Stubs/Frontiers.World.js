import IStackOwner from './Frontiers.World/IStackOwner.js';

export default (function(){
  'use strict';

  class World{
    static get IStackOwner(){
      return IStackOwner;
    }
  }

  return World;
})();
