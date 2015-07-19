export default (function(){
  class ChunkMode{
    static get Primary(){
      return 0|0;
    }

    static get Immediate(){
      return 1|0;
    }

    static get Adjascent(){
      return 2|0;
    }

    static get Distant(){
      return 3|0;
    }

    static get Unloaded(){
      return 4|0;
    }
  }

  return ChunkMode;
})();
