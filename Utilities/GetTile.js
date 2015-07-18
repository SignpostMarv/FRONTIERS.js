import FetchTileFromTypedArray from './FetchTileFromTypedArray.js';

/**
* this is in here instead of FetchTileFromUtils due to some oddness with super
*/
export default function(sx, sz, sw, sh){
  var
    self = this
  ;

  return new Promise(function(resolve, reject){
    if(
      typeof(sx) !== 'number' ||
      typeof(sz) !== 'number' ||
      typeof(sw) !== 'number' ||
      typeof(sh) !== 'number' ||
      sw % 1 !== 0 ||
      sh % 1 !== 0
    ){
      console.error(
        sx,
        sz,
        sw,
        sh
      );
      reject(new Error(
        'Arguments must be integers!'
      ));
      return;
    }else if(
      sx % 1 !== 0 ||
      sz % 1 !== 0
    ){
      reject(new Error(
        'Lerping not presntly supported'
      ));
      return;
    }

    sx = sx|0;
    sz = sz|0;
    sw = sw|0;
    sh = sh|0;

    if(
      sx + sw < 0 ||
      sz + sh < 0 ||
      sx >= self.width ||
      sz >= self.height ||
      sw > self.width ||
      sz > self.height
    ){
      reject(new Error(
        'source arguments are outside the range of the typed array'
      ));
      return;
    }else if(
      sx === 0 &&
      sz === 0 &&
      sw === self.width &&
      sh === self.height
    ){
      console.warn(
        'Requesting a new tile that exactly matches the source tile.'
      );
      self.TypedArray().then(function(typedArray){
        resolve(new FetchTileFromTypedArray(typedArray, sx, sz, sw, sh));
      }, reject);
      return;
    }

    self.TypedArray().then(function(typedArray){
      var
        newTypedArray = new typedArray.constructor(sw * sh),
        dx = 0|0,
        dz = 0|0,
        di = 0|0,
        si = 0|0,
        x = Math.max(0, sx),
        z = 0|0,
        xlim = Math.min(self.width, sx + sw),
        zlim = Math.min(self.height, sz + sh)
      ;
      for(z=sz;z<zlim;++z){
        dz = z - sz;
        if(
          z < 0 ||
          z > self.height
        ){
          continue;
        }
        for(x=sx;x<xlim;++x){
          if(
            x < 0 ||
            x > self.width
          ){
            continue;
          }
          dx = x - sx;
          di = (dz * sw) + dx;
          si = (z * self.width) + x;
          newTypedArray[di] = typedArray[si];
        }
      }
      resolve(new FetchTileFromTypedArray(newTypedArray, sx, sz, sw, sh));
    }, reject);
  });
}
