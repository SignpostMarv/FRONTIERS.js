export default (function(){
  'use strict';

  class FetchTileFromUtils{

    ArrayBuffer(){
      return new Promise(function(resolve, reject){
        reject(new Error(
          'FetchTileFromUtils.ArrayBuffer() not implemented!'
        ));
      });
    }

    TypedArray(){
      return new Promise(function(resolve, reject){
        reject(new Error(
          'FetchTileFromUtils.TypedArray() not implemented!'
        ));
      });
    }

    get width(){
      throw new Error(
        'FetchTileFromUtils.width not implemented!'
      );
    }

    get height(){
      throw new Error(
        'FetchTileFromUtils.height not implemented!'
      );
    }

    maxVal(){
      var
        self = this
      ;

      return new Promise(function(resolve, reject){
        self.TypedArray().then(function(typedArray){
          var
            max = -Infinity
          ;
          for(var val of typedArray){
            max = Math.max(max, val);
          }
          resolve(max);
        }, reject);
      });
    }

    minVal(){
      var
        self = this
      ;

      return new Promise(function(resolve, reject){
        self.TypedArray().then(function(typedArray){
          var
            min = Infinity
          ;
          for(var val of typedArray){
            min = Math.min(min, val);
          }
          resolve(min);
        }, reject);
      });
    }

    rangeVal(){
      var
        self = this
      ;
      return new Promise(function(resolve, reject){
        Promise.all([
          self.minVal(),
          self.maxVal()
        ]).then(function(values){
          resolve(values[1] - values[0]);
        }, reject);
      });
    }

    Canvas(){
      var
        self = this
      ;

      return new Promise(function(resolve, reject){
        Promise.all([
          self.TypedArray(),
          self.rangeVal(),
          self.minVal()
        ]).then(function(values){
          var
            arr = values[0],
            range = values[1],
            minVal = values[2],
            width = self.width,
            height = self.height,
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            i = 0|0,
            x = 0|0,
            y = 0|0,
            grey = 0|0,
            imageData
          ;
          canvas.width = width;
          canvas.height = height;
          imageData = ctx.getImageData(0, 0, width, height);
          for(i=0;i<imageData.data.length;i+=4){
            y = Math.floor(i / width);
            x = i - (y * width);
            grey = Math.round(((arr[i / 4] - minVal) / range) * 0xff);
            imageData.data[i + 0] = grey;
            imageData.data[i + 1] = grey;
            imageData.data[i + 2] = grey;
            imageData.data[i + 3] = 0xff;
          }
          ctx.putImageData(imageData, 0, 0);
          resolve(canvas);
        }, reject);
      });
    }
  }

  return FetchTileFromUtils;
})();
