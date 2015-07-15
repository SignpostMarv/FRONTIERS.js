import applyDefaultPropsSpecToObject from '../../Utilities/applyDefaultPropsSpecToObject.js';
import XmlHelper from '../../Assets/Scripts/Managers/GameData/XmlHelper.js';

export default (function(){
  'use strict';

  var
    props = Symbol('props'),
    defaultProps = {
      UseDefault: false,
      Key: '',
      TargetVolume: +1,
    }
  ;

  class ChunkAudioItem{
    constructor(){
      applyDefaultPropsSpecToObject(this, props, defaultProps);
    }

    get UseDefault(){
      return this[props].UseDefault;
    }

    set UseDefault(val){
      this[props].UseDefault = !!val;
    }

    get Key(){
      return this[props].Key;
    }

    set Key(val){
      this[props].Key = (val + '');
    }

    get TargetVolume(){
      return this[props].TargetVolume;
    }

    set TargetVolume(val){
      this[props].TargetVolume = +val;
    }

    copyFrom(other){
      if(other instanceof ChunkAudioItem){
        Object.keys(defaultProps).forEach(prop => {
          this[prop] = other[prop];
        });
      }else{
        throw new Error('Can only copy from other ChunkAudioItem instances');
      }
    }

    static FromJXON(jxon){
      return XmlHelper.JXON2Type(
        jxon,
        null,
        ChunkAudioItem,
        Object.keys(defaultProps)
      );
    }
  }

  return ChunkAudioItem;
})();
