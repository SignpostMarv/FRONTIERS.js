import Mods_Classes from './Assets/Scripts/Managers/Mods_Classes.js';
import Enums from './Assets/Scripts/Global/Enums.js';
import Manager from './Assets/Scripts/Managers/Manager.js';
import GameData from './Assets/Scripts/Managers/GameData.js';

export default (function(){
  'use strict';

  class Data{

    static get GameData(){
      return GameData;
    }
  }

  class Frontiers{
    static get Data(){
      return Data;
    }
  }

for(var c in Mods_Classes){
  if(Mods_Classes.hasOwnProperty(c)){
    Frontiers[c] = Mods_Classes[c];
  }
}

  for(let enumKey of Object.keys(Enums)){
    Frontiers[enumKey] = Enums[enumKey];
  }

  for(let managerKey of Object.keys(Manager)){
    Frontiers[managerKey] = Manager[managerKey];
  }

  return Frontiers;
})();
