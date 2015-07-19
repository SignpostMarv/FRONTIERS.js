export default (function(){
  return function applyDefaultPropsSpecToObject(obj, props, defaultPropsSpec){
    obj[props] = {};
    for(var prop of Object.keys(defaultPropsSpec)){
      if(typeof(defaultPropsSpec[prop]) === 'function'){
        obj[props][prop] = defaultPropsSpec[prop]();
      }else{
        obj[props][prop] = defaultPropsSpec[prop];
      }
    }
  };
})();
