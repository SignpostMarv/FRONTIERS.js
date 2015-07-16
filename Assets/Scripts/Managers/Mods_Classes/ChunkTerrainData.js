import Mod from '../Mods/Mod.js';
import TerrainkMaterialSettings from './TerrainkMaterialSettings.js';
import SColor from '../../Utilities/SColor.js';
import Serializable from '../../../../Stubs/Serializable.js';
import TerrainPrototypeTemplate from './TerrainPrototypeTemplate.js';
import TerrainTextureTemplate from './TerrainTextureTemplate.js';
import XmlHelper from '../GameData/XmlHelper.js';

export default (function(){
  'use strict';
  var
    props = Symbol('props'),
    defaultProps = {
      HeightmapResolution: function(){
        return 0|0;
      },
      HeightmapHeight: function(){
        return 0|0;
      },
      SplatmapGroundTypes: function(){
        return [];
      },
      MaterialSettings: function(){
        return new TerrainkMaterialSettings();
      },
      GrassTint: function(){
        return SColor.White;
      },
      WindSpeed: function(){
        return +0.497;
      },
      WindSize: function(){
        return +0.493;
      },
      WindBending: function(){
        return +0.495;
      },
      DetailTemplates: function(){
        return [];
      },
      TreeTemplates: function(){
        return [];
      },
      TextureTemplates: function(){
        return [];
      },
      PassThroughChunkData: function(){
        return false;
      },
    }
  ;

  class ChunkTerrainData extends Mod{
    constructor(){
      super();
      for(var prop of Object.keys(defaultProps)){
        this[props][prop] = defaultProps[prop]();
      }
    }

    get IgnoreProfileDataIfOutdated(){
      return true;
    }

    get HeightmapResolution(){
      return this[props].HeightmapResolution;
    }

    set HeightmapResolution(val){
      if(typeof(val) !== 'number'){
        throw new Error('HeightmapResolution must be a number!');
      }
      this[props].HeightmapResolution = val|0;
    }

    get HeightmapHeight(){
      return this[props].HeightmapHeight;
    }

    set HeightmapHeight(val){
      if(typeof(val) !== 'number'){
        throw new Error('HeightmapHeight must be a number!');
      }
      this[props].HeightmapHeight = val|0;
    }

    get SplatmapGroundTypes(){
      return this[props].SplatmapGroundTypes;
    }

    set SplatmapGroundTypes(val){
      if(!(val instanceof Array)){
        if(
          typeof(val) === 'string' &&
          val === ''
        ){
          val = [];
        }else{
        throw new Error('SplatmapGroundTypes must be instanceof Array');
        }
      }
      this[props].SplatmapGroundTypes = val;
    }

    get MaterialSettings(){
      return this[props].MaterialSettings;
    }

    set MaterialSettings(val){
      this[props].MaterialSettings.CopyFrom(val);
    }

    get GrassTint(){
      return this[props].GrassTint;
    }

    set GrassTint(val){
      this[props].GrassTint.CopyFrom(val);
    }

    get WindSpeed(){
      return this[props].WindSpeed;
    }

    set WindSpeed(val){
      if(typeof(val) !== 'number'){
        throw new Error('WindSpeed must be a number!');
      }
      this[props].WindSpeed = +val;
    }

    get WindSize(){
      return this[props].WindSize;
    }

    set WindSize(val){
      if(typeof(val) !== 'number'){
        throw new Error('WindSize must be a number!');
      }
      this[props].WindSize = +val;
    }

    get WindBending(){
      return this[props].WindBending;
    }

    set WindBending(val){
      if(typeof(val) !== 'number'){
        throw new Error('WindBending must be a number!');
      }
      this[props].WindBending = +val;
    }

    get DetailTemplates(){
      return this[props].DetailTemplates;
    }

    set DetailTemplates(val){
      if(!(val instanceof Array)){
        if(
          typeof(val) === 'object' &&
          Object.keys(val).length === 1 &&
          Object.keys(val)[0] === 'TerrainPrototypeTemplate' &&
          val.TerrainPrototypeTemplate instanceof Array
        ){
          val = val.TerrainPrototypeTemplate;
        }else{
        throw new Error('DetailTemplates must be instanceof Array');
        }
      }
      this[props].DetailTemplates = val;
    }

    get TreeTemplates(){
      return this[props].TreeTemplates;
    }

    set TreeTemplates(val){
      if(!(val instanceof Array)){
        if(
          typeof(val) === 'object' &&
          Object.keys(val).length === 1 &&
          Object.keys(val)[0] === 'TerrainPrototypeTemplate' &&
          val.TerrainPrototypeTemplate instanceof Array
        ){
          val = val.TerrainPrototypeTemplate;
        }else{
        throw new Error('TreeTemplates must be an instanceof Array');
        }
      }
      this[props].TreeTemplates = val;
    }

    get TextureTemplates(){
      return this[props].TextureTemplates;
    }

    set TextureTemplates(val){
      if(!(val instanceof Array)){
        if(
          typeof(val) === 'object' &&
          Object.keys(val).length === 1 &&
          Object.keys(val)[0] === 'TerrainTextureTemplate' &&
          val.TerrainTextureTemplate instanceof Array
        ){
          val = val.TerrainTextureTemplate;
        }else{
        throw new Error('TextureTemplates must be an instanceof Array');
        }
      }
      this[props].TextureTemplates = val;
    }

    get PassThroughChunkData(){
      return !!this[props].PassThroughChunkData;
    }

    set PassThroughChunkData(val){
      this[props].PassThroughChunkData = !!val;
    }

    static FromJXON(jxon, obj){
      return XmlHelper.JXON2Type(
        jxon,
        null,
        ChunkTerrainData,
        [
          'HeightmapResolution',
          'HeightmapHeight',
          'SplatmapGroundTypes',
          'WindSpeed',
          'WindSize',
          'WindBending',
          'TextureTemplates',
          'PassThroughChunkData',
        ],
        {
          MaterialSettings: TerrainkMaterialSettings,
          GrassTint: SColor,
        },
        [
        ],
        {
          DetailTemplates: TerrainPrototypeTemplate,
          TreeTemplates: TerrainPrototypeTemplate,
          TextureTemplates: TerrainTextureTemplate,
        }
      ).then(function(typeInstance){
        return Mod.FromJXON(jxon, typeInstance);
      });
    }

    static FromXML(xml, obj){
      return new Promise(function(resolve, reject){
        Serializable.GetJXONFromXML(xml).then(function(jxon){
          resolve(ChunkTerrainData.FromJXON(jxon, obj));
        }, reject);
      });
    }

    static FromURL(url){
      return new Promise(function(resolve, reject){
        fetch(url).then(function(response){
          response.clone().text().then(function(text){
            ChunkTerrainData.FromXML(text).then(resolve, reject);
          }, reject);
        }, reject);
      });
    }
  }

  ChunkTerrainData.prototype[props] = {};


  return ChunkTerrainData;
})();
