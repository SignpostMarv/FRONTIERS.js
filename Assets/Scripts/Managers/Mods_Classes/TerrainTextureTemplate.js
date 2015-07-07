import SVector2 from '../../Utilities/SVector2.js';
export default (function(){
  'use strict';


  var
    props = {}
  ;

  class TerrainTextureTemplate{

    get DiffuseName(){
      return (this[props.DiffuseName] || '');
    }
    set DiffuseName(val){
      return (this[props.DiffuseName] = (val + ''));
    }

    get NormalName(){
      return (this[props.NormalName] || '');
    }
    set NormalName(val){
      return (this[props.NormalName] = (val + ''));
    }

    get Size(){
      if(typeof(this[props.Size]) === 'undefined'){
        this.Size = SVector2.zero;
      }
      return this[props.Size];
    }

    set Size(val){
      if(!(val instanceof SVector2)){
        throw new Error('Size must be an instance of SVector2');
      }
      this[props.Size] = val;
    }

    get Offset(){
      if(typeof(this[props.Offset]) === 'undefined'){
        this[props.Offset] = SVector2.zero;
      }
      return this[props.Offset];
    }

    set Offset(val){
      if(!(val instanceof SVector2)){
        throw new Error('Offset must be an instance of SVector2');
      }
      this[props.Offset] = val;
    }
  }

  for(var prop of [
    'DiffuseName',
    'NormalName',
    'Size',
    'Offset'
  ]){
    props[prop] = Symbol(prop);
  }

  TerrainTextureTemplate.prototype[props.DiffuseName] = '';
  TerrainTextureTemplate.prototype[props.NormalName] = '';

  return TerrainTextureTemplate;
})();
