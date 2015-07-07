export default (function(){
  class DetailRenderMode{

    static get GrassBillboard(){
      return 0|0;
    }

    static get VertexLit(){
      return 1|0;
    }

    static get Grass(){
      return 2|0;
    }
  }

  return DetailRenderMode;
})();
