export default (function(){
  'use strict';

  class Random{

    static Range(min, max){
      min = min|0;
      max = max|0;

      return Math.floor(Math.random() * (max - min)) + min;
    }

    static get value(){
      return +Math.random();
    }
  }

  return Random;
})();
