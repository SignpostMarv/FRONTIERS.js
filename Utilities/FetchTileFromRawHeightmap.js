export default (function(){
  'use strict';
  var
    props = Symbol('props'),
    fetchMethod = Symbol('fetchMethod'),
    hasFetch = typeof(fetch) === 'function'
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

  class FetchTileFromRawHeightmap{
    constructor(source, type, sourceEndianness){
      sourceEndianness = sourceEndianness || endianness();
      this[props].sourceProp = source;
      this[props].typeProp = type;
      this[props].TypedArrayProp = null;
      this[props].maxValProp = null;
      this[props].minValProp = null;
      this[props].rangeValProp = null;
      this[props].endiannessProp = sourceEndianness;
    }

    ArrayBuffer(){
      var
        self = this
      ;
      return new Promise(function(resolve, reject){
        self[fetchMethod]().then(function(response){
          response.arrayBuffer().then(function(buffer){
            if(
              (Math.sqrt(
                buffer.byteLength / self[props].typeProp.BYTES_PER_ELEMENT
              ) % 1) !== 0
            ){
              throw new Error(
                'array buffer does not match expected resolution!'
              );
            }
            resolve(buffer);
          }, reject);
        }, reject);
      });
    }

    TypedArray(){
      var
        self = this
      ;
      return new Promise(function(resolve, reject){
        if(self[props].TypedArrayProp){
          resolve(self[props].TypedArrayProp);
        }else{
          self.ArrayBuffer().then(function(buffer){
            if(self[props].endiannessProp !== endianness()){
              console.warn('endianness does not match', self[props].endiannessProp);
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
              resolve(new self[props].typeProp(u8b.buffer));
            }else{
              console.log('endianness matches');
              resolve(new self[props].typeProp(buffer));
            }
          }, reject);
        }
      });
    }

    maxVal(){
      var
        self = this
      ;

      return new Promise(function(resolve, reject){
        if(self[props].maxValProp !== null){
          resolve(self[props].maxValProp);
        }else{
          self.TypedArray().then(function(typedArray){
            var
              max = -Infinity
            ;
            for(var val of typedArray){
              max = Math.max(max, val);
            }
            self[props].maxValProp = max;
            resolve(max);
          }, reject);
        }
      });
    }

    minVal(){
      var
        self = this
      ;

      return new Promise(function(resolve, reject){
        if(self[props].minValProp !== null){
          resolve(self[props].minValProp);
        }else{
          self.TypedArray().then(function(typedArray){
            var
              min = Infinity
            ;
            for(var val of typedArray){
              min = Math.min(min, val);
            }
            self[props].minValProp = min;
            resolve(min);
          }, reject);
        }
      });
    }

    rangeVal(){
      var
        self = this
      ;

      return new Promise(function(resolve, reject){
        if(self[props].rangeValProp !== null){
          resolve(self[props].rangeValProp);
        }else{
          self.minVal().then(function(minVal){
            self.maxVal().then(function(maxVal){
              self[props].rangeValProp = maxVal - minVal;
              resolve(self[props].rangeValProp);
            }, reject);
          }, reject);
        }
      });
    }

    Canvas(){
      var
        self = this
      ;
      return new Promise(function(resolve, reject){
        self.TypedArray().then(function(arr){
          self.rangeVal().then(function(range){
            self.minVal().then(function(minVal){
              var
                dim = Math.sqrt(arr.length),
                canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d'),
                i = 0|0,
                x = 0|0,
                y = 0|0,
                grey = 0|0,
                imageData
              ;
              canvas.width = dim;
              canvas.height = dim;
              imageData = ctx.getImageData(0, 0, dim, dim);
              for(i=0;i<imageData.data.length;i+=4){
                y = Math.floor(i / dim);
                x = i - (y * dim);
                grey = Math.round(((arr[i / 4] - minVal) / range) * 0xff);
                imageData.data[i + 0] = grey;
                imageData.data[i + 1] = grey;
                imageData.data[i + 2] = grey;
                imageData.data[i + 3] = 0xff;
              }
              ctx.putImageData(imageData, 0, 0);
              resolve(canvas);
            });
          }, reject);
        }, reject);
      });
    }

    Heights(resolution){
      var
        self = this
      ;
      return new Promise(function(resolve, reject){
        self.TypedArray().then(function(typedArray){
          if(typedArray.length !== (resolution * resolution)){
            reject(
              'Heightmap did not match expected length!'
            );
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
                (resolution * z) * Float32Array.BYTES_PER_ELEMENT
              );
            }
            heights[x][z] = typedArray[i] / divisor;
          }

          resolve(heights);
        }, reject);
      });
    }
  }

  FetchTileFromRawHeightmap.prototype[props] = {};

  FetchTileFromRawHeightmap.prototype[fetchMethod] = function(){
    var
      self = this
    ;
    return new Promise(function(resolve, reject){
      if(!hasFetch){
        reject('fetch api not available!');
      }else{
        fetch(self[props].sourceProp).then(function(response){
          resolve(response.clone());
        }, reject);
      }
    });
  };

  return FetchTileFromRawHeightmap;
})();
