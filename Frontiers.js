import Mods_Classes from './Assets/Scripts/Mods_Classes.js';

class Frontiers{}

for(var c in Mods_Classes){
  if(Mods_Classes.hasOwnProperty(c)){
    Frontiers[c] = Mods_Classes[c];
  }
}

export default Frontiers;
