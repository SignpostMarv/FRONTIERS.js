import Data from './Frontiers/Data.js';
import World from './Frontiers/World.js';
import Renderers from './non-transposed/Renderers.js';

export default (function(){
  'use strict';

  class Frontiers{

    static get Data(){
      return Data;
    }

    static get World(){
      return World;
    }

    static get Renderers(){
      return Renderers;
    }
  }

  return Frontiers;
})();
