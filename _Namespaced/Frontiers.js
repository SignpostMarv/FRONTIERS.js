import Data from './Frontiers/Data.js';
import World from './Frontiers/World.js';

export default (function(){
  'use strict';

  class Frontiers{

    static get Data(){
      return Data;
    }

    static get World(){
      return World;
    }

  }

  return Frontiers;
})();
