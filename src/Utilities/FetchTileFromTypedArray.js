import FetchTileFromUtils from './FetchTileFromUtils.js';
import GetTile from './GetTile.js';
import Interpolation from './Interpolation.js';

export default (function(){
  'use strict';

  var
    props = Symbol('props')
  ;

  class FetchTileFromTypedArray extends FetchTileFromUtils{
    constructor(typedSource, x, y, width, height){
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
      this[props].x = x;
      this[props].y = y;
    }

    get width(){
      return this[props].width;
    }

    get height(){
      return this[props].height;
    }

    get x(){
      return this[props].x;
    }

    get y(){
      return this[props].y;
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

    Downsample(){
      var
        self = this
      ;
      return new Promise(function(resolve, reject){
        self.TypedArray().then(
          function(matrix){
            if(Math.sqrt(matrix.length) % 1 !== 0){
              reject(new Error('Can only downsample square tiles'));
            }else{
              return matrix;
            }
          }
        ).then(
          Interpolation.downsampleSquareMatrix
        ).then(function(downsampled){
          resolve(new FetchTileFromTypedArray(
            downsampled,
            self.x,
            self.y,
            ((self.width - 1) / 2) + 1,
            ((self.height - 1) / 2) + 1
          ));
        }, reject);
      });
    }
  }

  return FetchTileFromTypedArray;
})();
