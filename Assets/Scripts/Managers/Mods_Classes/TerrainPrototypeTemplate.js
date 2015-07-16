import ChunkMode from '../../Global/Enums/ChunkMode.js';
import PrototypeTemplateType from '../../Global/Enums/PrototypeTemplateType.js';
import DetailRenderMode from '../../../../Stubs/Unity/DetailRenderMode.js';
import SColor from '../../Utilities/SColor.js';

export default (function(){

  var
    props = Symbol('props'),
    defaultProps = {
      Mode: function(){
        return ChunkMode.Immediate;
      },
      AssetName: function(){
        return '';
      },
      Type: function(){
        return PrototypeTemplateType.TreeMesh;
      },
      RenderMode: function(){
        return DetailRenderMode.Grass;
      },
      MinWidth: function(){
        return +0.5;
      },
      MinHeight: function(){
        return +0.5;
      },
      MaxWidth: function(){
        return +1.0;
      },
      MaxHeight: function(){
        return +1.0;
      },
      NoiseSpread: function(){
        return +2.5;
      },
      HealthyColor: function(){
        return SColor.white;
      },
      DryColor: function(){
        return SColor.white;
      },
      UsePrototypeMesh: function(){
        return false;
      },
      BendFactor: function(){
        return +3.0;
      }
    }
  ;

  class TerrainPrototypeTemplate{
    constructor(){
      for(var prop of Object.keys(defaultProps)){
        this[prop] = defaultProps[prop]();
      }
    }

    get Mode(){
      return this[props].Mode;
    }

    set Mode(val){
      this[props].Mode = val;
    }

    get AssetName(){
      return this[props].AssetName;
    }

    set AssetName(val){
      this[props].AssetName = (val + '');
    }

    get Type(){
      return this[props].Type;
    }

    set Type(val){
      this[props].Type = val;
    }

    get RenderMode(){
      return this[props].RenderMode;
    }

    set RenderMode(val){
      this[props].RenderMode = val;
    }

    get MinWidth(){
      return this[props].MinWidth;
    }

    set MinWidth(val){
      if(typeof(val) !== 'number'){
        throw new Error('MinWidth must be a number!');
      }
      this[props].MinWidth = +val;
    }

    get MinHeight(){
      return this[props].MinHeight;
    }

    set MinHeight(val){
      if(typeof(val) !== 'number'){
        throw new Error('MinHeight must be a number!');
      }
      this[props].MinHeight = +val;
    }

    get MaxWidth(){
      return this[props].MaxWidth;
    }

    set MaxWidth(val){
      if(typeof(val) !== 'number'){
        throw new Error('MaxWidth must be a number!');
      }
      this[props].MaxWidth = +val;
    }

    get MaxHeight(){
      return this[props].MaxHeight;
    }

    set MaxHeight(val){
      if(typeof(val) !== 'number'){
        throw new Error('MaxHeight must be a number!');
      }
      this[props].MaxHeight = +val;
    }

    get NoiseSpread(){
      return this[props].NoiseSpread;
    }

    set NoiseSpread(val){
      if(typeof(val) !== 'number'){
        throw new Error('NoiseSpread must be a number!');
      }
      this[props].NoiseSpread = +val;
    }

    get HealthColor(){
      return this[props].HealthColor;
    }

    set HealthColor(val){
      this[props].HealthColor.CopyFrom(val);
    }

    get DryColor(){
      return this[props].DryColor;
    }

    set DryColor(val){
      this[props].DryColor.CopyFrom(val);
    }

    get UserPrototypeMesh(){
      return this[props].UserPrototypeMesh;
    }

    set UserPrototypeMesh(val){
      this[props].UserPrototypeMesh = !!val;
    }

    get RandomWidth(){
      return this.MaxWidth;
    }

    get RandomHeight(){
      return this.MaxHeight;
    }

    get BendFactor(){
      return this[props].BendFactor;
    }

    set BendFactor(val){
      if(typeof(val) !== 'number'){
        throw new Error('BendFactor must be a number!');
      }
      this[props].BendFactor = +val;
    }

    static FromJXON(jxon, obj){
      return new Promise(function(resolve, reject){
        if(obj === undefined){
          obj = new TerrainPrototypeTemplate();
        }else if(!(obj instanceof TerrainPrototypeTemplate)){
          reject(new Error(
            'Supplied object must be an instanceof TerrainPrototypeTemplate'
          ));
          return;
        }
        console.log(jxon);
        var
          enumProps = {
            Mode: ChunkMode,
            Type: PrototypeTemplateType,
            RenderMode: DetailRenderMode
          },
          prop
        ;
        for(prop of [
          'AssetName',
          'BendFactor',
          'MaxHeight',
          'MaxWidth',
          'MinHeight',
          'MinWidth',
          'NoiseSpread',
          'UsePrototypeMesh'
        ]){
          obj[prop] = jxon[prop];
        }
        for(prop of Object.keys(enumProps)){
          obj[prop] = enumProps[prop][jxon[prop]];
        }
        Promise.all([
          SColor.FromJXON(jxon.DryColor).then(function(color){
            obj.DryColor = color;
          }),
          SColor.FromJXON(jxon.HealthyColor).then(function(color){
            obj.HealthyColor = color;
          })
        ]).then(function(){
          resolve(obj);
        }, reject);
      });
    }
  }

  TerrainPrototypeTemplate.prototype[props] = {};

  return TerrainPrototypeTemplate;
})();
