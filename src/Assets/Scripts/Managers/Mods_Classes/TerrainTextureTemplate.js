import SVector2 from '../../Utilities/SVector2.js';
import XmlHelper from '../GameData/XmlHelper.js';

export default (function(){
  'use strict';

  var
    props = Symbol('props')
  ;

  class TerrainTextureTemplate{
    constructor(){
      this[props] = {
        DiffuseName: '',
        NormalName: '',
        Size: SVector2.zero,
        Offset: SVector2.zero,
      };
    }

    get DiffuseName(){
      return (this[props].DiffuseName || '');
    }
    set DiffuseName(val){
      return (this[props].DiffuseName = (val + ''));
    }

    get NormalName(){
      return (this[props].NormalName || '');
    }
    set NormalName(val){
      return (this[props].NormalName = (val + ''));
    }

    get Size(){
      return this[props].Size;
    }

    set Size(val){
      this[props].Size.CopyFrom(val);
    }

    get Offset(){
      return this[props].Offset;
    }

    set Offset(val){
      this[props].Offset.CopyFrom(val);
    }

    static FromJXON(jxon){
      return XmlHelper.JXON2Type(
        jxon,
        null,
        TerrainTextureTemplate,
        [
          'DiffuseName',
          'NormalName',
        ],
        {
          Size: SVector2,
          Offset: SVector2,
        }
      );
    }
  }

  return TerrainTextureTemplate;
})();
