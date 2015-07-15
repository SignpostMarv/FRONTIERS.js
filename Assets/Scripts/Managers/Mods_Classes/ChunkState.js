import applyDefaultPropsSpecToObject from '../../../../Utilities/applyDefaultPropsSpecToObject.js';
import Mod from '../Mods/Mod.js';
import SVector3 from '../../Utilities/SVector3.js';
import ChunkDisplaySettings from './ChunkDisplaySettings.js';
import XmlHelper from '../GameData/XmlHelper.js';

export default (function(){
  'use strict';

  var
    props = Symbol('props')
  ;

  class ChunkState extends Mod{
    constructor(){
      super();
      applyDefaultPropsSpecToObject(
        this,
        props,
        {
          ID: 0|0,
          WorldName: 'FRONTIERS',
          NeighboringChunkLeft: -1|0,
          NeighboringChunkTop: -1|0,
          NeighboringChunkRight: -1|0,
          NeighboringChunkBot: -1|0,
          ArbitraryPosition: false,
          SizeX: 0|0,
          SizeZ: 0|0,
          XTilePosition: 0|0,
          ZTilePosition: 0|0,
          YOffset: +0,
          TileOffset: SVector3.zero,
          DisplaySettings: new ChunkDisplaySettings(),
        }
      );
    }

    get IgnoreProfileDataIfOutdated(){
      return true;
    }

    get ID(){
      return this[props].ID;
    }

    set ID(val){
      if(typeof(val) !== 'number'){
        throw new Error('ID must be a number!');
      }
      this[props].ID = (val|0);
    }

    get WorldName(){
      return this[props].WorldName;
    }

    set WorldName(val){
      this[props].WorldName = (val + '');
    }

    get NeighboringChunkLeft(){
      return this[props].NeighboringChunkLeft;
    }

    set NeighboringChunkLeft(val){
      if(typeof(val) !== 'number'){
        throw new Error('NeighboringChunkLeft must be a number!');
      }
      this[props].NeighboringChunkLeft = (val|0);
    }

    get NeighboringChunkTop(){
      return this[props].NeighboringChunkTop;
    }

    set NeighboringChunkTop(val){
      if(typeof(val) !== 'number'){
        throw new Error('NeighboringChunkTop must be a number!');
      }
      this[props].NeighboringChunkTop = (val|0);
    }

    get NeighboringChunkRight(){
      return this[props].NeighboringChunkRight;
    }

    set NeighboringChunkRight(val){
      if(typeof(val) !== 'number'){
        throw new Error('NeighboringChunkRight must be a number!');
      }
      this[props].NeighboringChunkRight = (val|0);
    }

    get NeighboringChunkBot(){
      return this[props].NeighboringChunkBot;
    }

    set NeighboringChunkBot(val){
      if(typeof(val) !== 'number'){
        throw new Error('NeighboringChunkBot must be a number!');
      }
      this[props].NeighboringChunkBot = (val|0);
    }

    get ArbitraryPosition(){
      return this[props].ArbitraryPosition;
    }

    set ArbitraryPosition(val){
      this[props].ArbitraryPosition = !!val;
    }

    get SizeX(){
      return this[props].SizeX;
    }

    set SizeX(val){
      if(typeof(val) !== 'number'){
        throw new Error('SizeX must be a number!');
      }
      this[props].SizeX = (val|0);
    }

    get SizeZ(){
      return this[props].SizeZ;
    }

    set SizeZ(val){
      if(typeof(val) !== 'number'){
        throw new Error('SizeZ must be a number!');
      }
      this[props].SizeZ = (val|0);
    }

    get XTilePosition(){
      return this[props].XTilePosition;
    }

    set XTilePosition(val){
      if(typeof(val) !== 'number'){
        throw new Error('XTilePosition must be a number!');
      }
      this[props].XTilePosition = (val|0);
    }

    get ZTilePosition(){
      return this[props].ZTilePosition;
    }

    set ZTilePosition(val){
      if(typeof(val) !== 'number'){
        throw new Error('ZTilePosition must be a number!');
      }
      this[props].ZTilePosition = (val|0);
    }

    get YOffset(){
      return this[props].YOffset;
    }

    set YOffset(val){
      if(typeof(val) !== 'number'){
        throw new Error('YOffset must be a number!');
      }
      this[props].YOffset = +val;
    }

    get TileOffset(){
      return this[props].TileOffset;
    }

    set TileOffset(val){
      this[props].TileOffset.CopyFrom(val);
    }

    get DisplaySettings(){
      return this[props].DisplaySettings;
    }

    set DisplaySettings(val){
      this[props].DisplaySettings.copyFrom(val);
    }

    static FromJXON(jxon){
      return XmlHelper.JXON2Type(
        jxon,
        null,
        ChunkState,
        [
          'ID',
          'WorldName',
          'NeighboringChunkLeft',
          'NeighboringChunkTop',
          'NeighboringChunkRight',
          'NeighboringChunkBot',
          'ArbitraryPosition',
          'SizeX',
          'SizeZ',
          'XTilePosition',
          'ZTilePosition',
          'YOffset',
        ],
        {
          TileOffset: SVector3,
          DisplaySettings: ChunkDisplaySettings,
        }
      ).then(typeInstance => {
        return Mod.FromJXON(jxon, typeInstance);
      });
    }
  }

  return ChunkState;
})();
