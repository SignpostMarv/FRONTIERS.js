export default (function(){
  var
    props = Symbol('props')
  ;

  class Mod{

    get FullDescription(){
      if(
        this.mFullDescription === '' ||
        this.mFullDescription === null
      ){
        this.mFullDescription = this.Description;
      }
      return this.Description;
    }

    get IgnoreProfileDataIfOutdated(){
      return false;
    }

    get Name(){
      return this[props].Name;
    }

    set Name(val){
      this[props].Name = (val + '');
    }

    get Description(){
      return this[props].Description;
    }

    set Description(val){
      this[props].Description = (val + '');
    }

    get Type(){
      return this[props].Type;
    }

    set Type(val){
      this[props].Type = (val + '');
    }

    get Dependencies(){
      return this[props].Dependencies;
    }

    set Dependencies(val){
      this[props].Dependencies = (val + '');
    }

    get Version(){
      return this[props].Version;
    }

    set Version(val){
      this[props].Version = (val + '');
    }

    get DisplayOrder(){
      return this[props].DisplayOrder;
    }

    set DisplayOrder(val){
      if(typeof(val) !== 'number'){
        throw new Error('Display order must be a number!');
      }
      this[props].DisplayOrder = (val|0);
    }

    get Enabled(){
      return this[props].Enabled;
    }

    set Enabled(val){
      this[props].Enabled = !!val;
    }

    get ListInAvailable(){
      return this[props].ListInAvailable;
    }

    set ListInAvailable(val){
      this[props].ListInAvailable = !!val;
    }

    get BaseData(){
      return this[props].BaseData;
    }

    set BaseData(val){
      this[props].BaseData = !!val;
    }

    CompareTo(other){
      if(!(other instanceof Mod)){
        throw new Error('Other must be instanceof Mod!');
      }
      return other.DisplayOrder - this.DisplayOrder;
    }

    static FromJXON(jxon, obj){
      return new Promise(function(resolve, reject){
        if(obj === undefined){
          obj = new Mod();
        }else if(!(obj instanceof Mod)){
          reject(new Error('Supplied object must be an instanceof Mod'));
          return;
        }
        for(var prop of [
          'Name',
          'Description',
          'Type',
          'Dependencies',
          'Version',
          'DisplayOrder',
          'Enabled',
          'ListInAvailable'
        ]){
          obj[prop] = jxon[prop];
        }
        resolve(obj);
      });
    }
  }

  Mod.prototype[props] = {};
  Mod.prototype[props].Name = '';
  Mod.prototype[props].Description = '';
  Mod.prototype[props].Type = '';
  Mod.prototype[props].Dependencies = '';
  Mod.prototype[props].Version = '';
  Mod.prototype[props].DisplayOrder = 0|0;
  Mod.prototype[props].Enabled = true;
  Mod.prototype[props].ListInAvailable = true;

  Mod.prototype[props].BaseData = false;

  Mod.prototype[props].mFullDescription = '';

  return Mod;
})();
