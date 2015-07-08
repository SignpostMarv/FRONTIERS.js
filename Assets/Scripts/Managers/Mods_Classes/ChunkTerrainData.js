import Mod from '../Mods/Mod.js';
import TerrainkMaterialSettings from './TerrainkMaterialSettings.js';
import SColor from '../../Utilities/SColor.js';
import Serializable from '../../../../Stubs/Serializable.js';
import TerrainPrototypeTemplate from './TerrainPrototypeTemplate.js';
import FetchTileFromRawHeightmap from '../../../../Utilities/FetchTileFromRawHeightmap.js';

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
      HeightMapTiler: function(){
        return undefined;
      }
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
        throw new Error('SplatmapGroundTypes must be instanceof Array');
      }
      this[props].SplatmapGroundTypes = val;
    }

    get MaterialSettings(){
      return this[props].MaterialSettings;
    }

    get GrassTint(){
      return this[props].GrassTint;
    }

    set GrassTint(val){
      this[props].GrassTint.copyFrom(val);
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
        throw new Error('DetailTemplates must be instanceof Array');
      }
      this[props].DetailTemplates = val;
    }

    get TreeTemplates(){
      return this[props].TreeTemplates;
    }

    set TreeTemplates(val){
      if(!(val instanceof Array)){
        console.error(val);
        throw new Error('TreeTemplates must be an instanceof Array');
      }
      this[props].TreeTemplates = val;
    }

    get TextureTemplates(){
      return this[props].TextureTemplates;
    }

    set TextureTemplates(val){
      if(!(val instanceof Array)){
        console.error(val);
        throw new Error('TextureTemplates must be an instanceof Array');
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
      return new Promise(function(resolve, reject){
        if(obj === undefined){
          obj = new ChunkTerrainData();
        }else if(!(obj instanceof ChunkTerrainData)){
          reject(new Error(
            'Supplied object must be an instanceof ChunkTerrainData'
          ));
          return;
        }
        if(!('ChunkTerrainData' in jxon)){
          reject('ChunkTerrainData not present in JXON object!');
          return;
        }
        for(var prop of [
          'HeightmapResolution',
          'HeightmapHeight',
          'WindSpeed',
          'WindSize',
          'WindBending',
          'PassThroughChunkData'
        ]){
          obj[prop] = jxon.ChunkTerrainData[prop];
        }
        for(prop of [
          'SplatmapGroundTypes'
        ]){
          if(jxon.ChunkTerrainData[prop] !== ''){
            obj[prop] = jxon.ChunkTerrainData[prop];
          }else{
            obj[prop] = [];
          }
        }
        var
          promiseStack = [
            TerrainkMaterialSettings.FromJXON(
              jxon.ChunkTerrainData.MaterialSettings,
              obj.MaterialSettings
            ),
            Mod.FromJXON(jxon.ChunkTerrainData, obj)
          ],
          map_TerrainPrototypeTemplate = function(e){
            return TerrainPrototypeTemplate.fromJXON(e);
          },
          handle_templates = function(templateObj){
            var
              promiseRejectShim = false
            ;

            for(var detailTemplate of Object.keys(templateObj)){
              if(promiseRejectShim){
                return;
              }
              switch(detailTemplate){
                case 'TerrainPrototypeTemplate':
                  if(templateObj.TerrainPrototypeTemplate instanceof Array){
                    promiseStack.push(
                      Promise.all(
                        templateObj.TerrainPrototypeTemplate.map(
                          map_TerrainPrototypeTemplate
                        )
                      )
                    );
                  }else{
                    promiseStack.push(
                      TerrainPrototypeTemplate.fromJXON(
                        templateObj.TerrainPrototypeTemplate
                      )
                    );
                  }
                break;
                default:
                  reject(Error('Unsupported DetailTemplate type!'));
                  promiseRejectShim = true;
                break;
              }
            }
          }
        ;
        if(
          typeof(jxon.DetailTemplates) === 'object'
        ){
          handle_templates(jxon.DetailTemplates);
        }
        if(
          typeof(jxon.TreeTemplates) === 'object'
        ){
          handle_templates(jxon.TreeTemplates);
        }
        Promise.all(promiseStack).then(function(){
          resolve(obj);
        }, reject);
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

    GetHeightMapTiler(source, clearCache=false){
      clearCache = !!clearCache;
      if(this[props].HeightMapTiler === undefined || clearCache){
        this[props].HeightMapTiler = new FetchTileFromRawHeightmap(
          this,
          source,
          Uint16Array,
          'BE'
        );
      }
      return this[props].HeightMapTiler;
    }
  }

  ChunkTerrainData.prototype[props] = {};


  return ChunkTerrainData;
})();
