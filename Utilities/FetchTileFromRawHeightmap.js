import applyDefaultPropsSpecToObject from './applyDefaultPropsSpecToObject.js';
import FetchTileFromUtils from './FetchTileFromUtils.js';
import GetTile from './GetTile.js';

export default (function(){
  'use strict';
  var
    props = Symbol('props'),
    fetchMethod = Symbol('fetchMethod'),
    hasFetch = typeof(fetch) === 'function',
    cachedHeightmaps = {}
  ;

  function endianness(){
    var b = new ArrayBuffer(4);
    var a = new Uint32Array(b);
    var c = new Uint8Array(b);
    a[0] = 0xdeadbeef;
    if(c[0] === 0xef){
      return 'LE';
    }
    if(c[0] === 0xde){
      return 'BE';
    }
    throw new Error('unknown endianness');
  }

  class FetchTileFromRawHeightmap extends FetchTileFromUtils{
    constructor(expectedWidth, expectedHeight, source, type, sourceEndianness){
      if(
        typeof(expectedWidth) !== 'number' ||
        typeof(expectedHeight) !== 'number' ||
        isNaN(expectedWidth) ||
        isNaN(expectedHeight) ||
        !isFinite(expectedWidth) ||
        !isFinite(expectedHeight)
      ){
        throw new Error('Expected dimensions must passed as numbers!');
      }
      expectedHeight = expectedHeight|0;
      expectedWidth = expectedWidth|0;
      super();
      sourceEndianness = sourceEndianness || endianness();
      applyDefaultPropsSpecToObject(this, props, {
        width: expectedWidth,
        height: expectedHeight,
        sourceProp: source,
        typeProp: function(){
          return type;
        },
        TypedArrayProp: null,
        endiannessProp: sourceEndianness,
        pendingArrayBuffer: null,
        pendingTypedArray: null,
        pendingFetch: null,
      });
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
      if(!self[props].pendingArrayBuffer){
        self[props].pendingArrayBuffer = new Promise(function(resolve, reject){
        self[fetchMethod]().then(function(response){
          response.clone().arrayBuffer().then(function(buffer){
            if(
              buffer.byteLength !== (
                (self.width * self.height) *
                self[props].typeProp.BYTES_PER_ELEMENT
              )
            ){
              reject(new Error(
                'array buffer does not match expected resolution!' +
                ' expecting: ' + buffer.byteLength + ', received ' +
                (
                  (self.width * self.height) *
                  self[props].typeProp.BYTES_PER_ELEMENT
                )
              ));
              return;
            }
            resolve(buffer);
          }, reject);
        }, reject);
      });
      }
      return self[props].pendingArrayBuffer;
    }

    TypedArray(){
      var
        self = this
      ;
      if(!self[props].pendingTypedArray){
        self[props].pendingTypedArray = new Promise(function(resolve, reject){
        if(self[props].TypedArrayProp){
          resolve(self[props].TypedArrayProp);
        }else{
          self.ArrayBuffer().then(function(buffer){
            if(self[props].endiannessProp !== endianness()){
              console.warn(
                'endianness does not match',
                self[props].endiannessProp
              );
              var
                u8a = new Uint8Array(buffer),
                u8b = new Uint8Array(u8a.length),
                bpel = self[props].typeProp.BYTES_PER_ELEMENT,
                i = 0|0,
                j = 0|0
              ;
              for(i=0;i<u8a.length;i+=bpel){
                for(j=(bpel - 1);j>=0;--j){
                  u8b[i + (bpel - 1 - j)] = u8a[i + j];
                }
              }
              self[props].TypedArrayProp =
                new self[props].typeProp(u8b.buffer)
              ;
            }else{
              self[props].TypedArrayProp = new self[props].typeProp(buffer);
            }
            resolve(self[props].TypedArrayProp);
          }, reject);
        }
      });
      }
      return self[props].pendingTypedArray;
    }

    Heights(resolution){
      var
        self = this
      ;
      return new Promise(function(resolve, reject){
        self.TypedArray().then(function(typedArray){
          if(typedArray.length !== (resolution * resolution)){
            reject(new Error(
              'Heightmap did not match expected length!'
            ));
            return;
          }
          var
            heights = new Array(resolution),
            heightsBuffer = new ArrayBuffer(
              resolution * resolution * Float32Array.BYTES_PER_ELEMENT
            ),
            divisor = Math.pow(2, (8 * typedArray.BYTES_PER_ELEMENT)) - 1,
            i = 0|0,
            x = 0|0,
            z = 0|0
          ;
          for(i=0;i<typedArray.length;++i){
            z = Math.floor(i / resolution);
            x = i - (z * resolution);
            if(heights[x] === undefined){
              heights[x] = new Float32Array(
                heightsBuffer,
                (resolution * z) * Float32Array.BYTES_PER_ELEMENT,
                resolution
              );
            }
            heights[x][z] = typedArray[i] / divisor;
          }

          resolve(heights);
        }, reject);
      });
    }

    GetTile(sx, sz, sw, sh){
      return GetTile.call(this, sx, sz, sw, sh);
    }

    static Get(expectedWidth, expectedHeight, source, type, sourceEndianness){
      var
        cacheKey = JSON.stringify([
          expectedWidth,
          expectedHeight,
          source,
          type,
          sourceEndianness
        ])
      ;
      if(!(cacheKey in cachedHeightmaps)){
        cachedHeightmaps[cacheKey] = new FetchTileFromRawHeightmap(
          expectedWidth,
          expectedHeight,
          source,
          type,
          sourceEndianness
        );
      }else{
        console.info('reusing heightmap obj');
      }
      return cachedHeightmaps[cacheKey];
    }
  }

  FetchTileFromRawHeightmap.prototype[fetchMethod] = function(){
    var
      self = this,
      url = self[props].sourceProp
    ;
    if(!self[props].pendingFetch){
      self[props].pendingFetch = new Promise(function(resolve, reject){
        if(!hasFetch){
          reject('fetch api not available!');
          return;
        }
        fetch(url).then(function(response){
          console.info('fresh fetch', url);
          resolve(response);
        }, function(failure){
          self[props].pendingFetch = null;
          reject(failure);
        });
      });
    }
    return self[props].pendingFetch;
  };

  return FetchTileFromRawHeightmap;
})();
