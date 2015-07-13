import FetchTileFromUtils from './FetchTileFromUtils.js';
import GetTile from './GetTile.js';

export default (function(){
  'use strict';

  var
    props = Symbol('props')
  ;

  class FetchTileFromTypedArray extends FetchTileFromUtils{
    constructor(typedSource, width, height){
      super();
      if(
        !(typedSource instanceof Float32Array) &&
        !(typedSource instanceof Uint16Array)
      ){
        throw new Error(
          'Presently only Float32Array and Uint16Array are supported!'
        );
      }
      var
        sqrt = Math.sqrt(typedSource.length)
      ;
      if(
        width === undefined &&
        height === undefined &&
        (width = sqrt) % 1 !== 0
      ){
        throw new Error('Dimensions were not specified');
      }
      if(width !== undefined && height === undefined){
        height = width;
      }
      if(width % 1 !== 0 || height % 1 !== 0){
        throw new Error('Dimensions were not integers!');
      }
      width = width|0;
      height = height|0;

      if(typedSource.length !== (width * height)){
        throw new Error('Length of typed array does not match dimensions!');
      }
      this[props] = {};
      this[props].TypedArrayProp = typedSource;
      this[props].width = width;
      this[props].height = height;
    }

    get width(){
      return this[props].width;
    }

    get height(){
      return this[props].height;
    }

    ArrayBuffer(){
      var
        self = this
      ;
      return new Promise(function(resolve, reject){
        self.TypedArray().then(function(typedArray){
          resolve(typedArray.buffer);
        }, reject);
      });
    }

    TypedArray(){
      var
        self = this
      ;
      return new Promise(function(resolve){
        resolve(self[props].TypedArrayProp);
      });
    }

    GetTile(sx, sz, sw, sh){
      return GetTile.call(this, sx, sz, sw, sh);
    }
  }

  return FetchTileFromTypedArray;
})();
