export default (function(){
  'use strict';

  var
    Interpolator = function(){
      'use asm';

      function linear(a, b, alpha){
        a = +a;
        b = +b;
        alpha = +alpha;
        return (
          ((+1 - alpha) * a) +
          (alpha * b)
        );
      }

      function bilinear(a, b, c, alpha){
        a = +a;
        b = +b;
        c = +c;
        alpha = +alpha;

        return +linear(+linear(a, b, alpha), +linear(b, c, alpha), alpha);
      }

      return {
        linear: linear,
        bilinear: bilinear,
      };
    },
    interpolation = new Interpolator()
  ;

  class Interpolation{

    static linear(a, b, alpha){
      return interpolation.linear(a, b, alpha);
    }

    static bilinear(a, b, c, alpha){
      return interpolation.bilinear(a, b, c, alpha);
    }

    static downsampleSquareMatrix(foo){
      var
        origWidth = Math.sqrt(foo.length),
        newWidth = ((origWidth - 1) / 2) + 1,
        baz = new Float32Array((foo.length + origWidth) / 2),
        bat = new Float32Array(newWidth * newWidth),
        i = 0|0,
        j0 = 0|0,
        j1 = 0|0,
        j2 = 0|0,
        x = 0|0,
        y = 0|0
      ;
      for(i=0;i<baz.length;++i){
        y = Math.floor(i / newWidth);
        x = i % newWidth;
        j1 = (y * origWidth) + (x + x);
        j0 = j1 - 1;
        j2 = j1 + 1;
        if(x === 0 || x === (newWidth - 1)){
          baz[i] = +foo[j1];
        }else{
          baz[i] = Interpolation.bilinear(foo[j0], foo[j1], foo[j2], 0.5);
        }
      }
      for(i=0;i<bat.length;++i){
        y = Math.floor(i / newWidth);
        x = i % newWidth;
        j1 = ((y + y) * newWidth) + x;
        if(
          x === 0 ||
          x === (newWidth - 1) ||
          y === 0 ||
          y === (newWidth - 1)
        ){
          bat[i] = baz[j1];
        }else{
          j0 = (((y + y) - 1) * newWidth) + x;
          j2 = (((y + y) + 1) * newWidth) + x;
          bat[i] = Interpolation.bilinear(baz[j0], baz[j1], baz[j2], 0.5);
        }
      }
      return bat;
    }
  }

  return Interpolation;
})();
