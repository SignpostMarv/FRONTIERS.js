import Frontiers from './_Namespaced/Frontiers.js';
import Mods_Classes from './Assets/Scripts/Managers/Mods_Classes.js';
import Enums from './Assets/Scripts/Global/Enums.js';
import Manager from './Assets/Scripts/Managers/Manager.js';
import AmbientAudioManager from './Stubs/AmbientAudioManager.js';
import Mods from './Assets/Scripts/Managers/Mods.js';

export default (function(){
  'use strict';

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

  Frontiers.AmbientAudioManager = AmbientAudioManager;

  Frontiers.Mods = Mods;

  return Frontiers;
})();
