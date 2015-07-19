import Mod from '../Mods/Mod.js';
import XmlHelper from '../GameData/XmlHelper.js';

export default (function(){
  'use strict';

  var
    props = Symbol('props')
  ;

  class ChunkDisplaySettings extends Mod{
    constructor(){
      super();
      this[props] = {
        ArbitraryTilePosition: false,
        ArbitraryTileSize: false,
      };
    }

    get ArbitraryTilePosition(){
      return this[props].ArbitraryTilePosition;
    }

    set ArbitraryTilePosition(val){
      this[props].ArbitraryTilePosition = !!val;
    }

    get ArbitraryTileSize(){
      return this[props].ArbitraryTileSize;
    }

    set ArbitraryTileSize(val){
      this[props].ArbitraryTileSize = !!val;
    }

    static FromJXON(jxon){
      return XmlHelper.JXON2Type(
        jxon,
        null,
        ChunkDisplaySettings,
        [
          'ArbitraryTilePosition',
          'ArbitraryTileSize',
        ]
      ).then(typeInstance => {
        return Mod.FromJXON(jxon, typeInstance);
      });
    }
  }

  return ChunkDisplaySettings;
})();
