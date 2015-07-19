import applyDefaultPropsSpecToObject from '../../../../Utilities/applyDefaultPropsSpecToObject.js';
import XmlHelper from '../GameData/XmlHelper.js';

export default (function(){
  'use strict';

  var
    props = Symbol('props'),
    defaultProps = {
      UseDefault: function(){
        return true;
      },
      Precipitation: function(){
        return +0.25;
      },
      Wind: function(){
        return +0.5;
      },
      SkyClear: function(){
        return +1;
      },
      SkyFog: function(){
        return +0;
      },
      SkyStorm: function(){
        return +0;
      },
      SkyDust: function(){
        return +0;
      },
      CloudsClear: function(){
        return +0.5;
      },
      CloudsFew: function(){
        return +0.25;
      },
      CloudsScattered: function(){
        return +0.125;
      },
      CloudsBroken: function(){
        return +0.125;
      },
      CloudsOvercast: function(){
        return +0.125;
      },
      LightningFrequency: function(){
        return +0.1;
      },
      mCloudTypeLookup: function(){
        return [];
      },
      mWeatherTypeLookup: function(){
        return [];
      },
    }
  ;

  class BiomeWeatherSetting{
    constructor(){
      applyDefaultPropsSpecToObject(this, props, defaultProps);
    }

    get UseDefault(){
      return this[props].UseDefault;
    }

    set UseDefault(val){
      this[props].UseDefault = !!val;
    }

    get Precipitation(){
      return this[props].Precipitation;
    }

    set Precipitation(val){
      if(typeof(val) !== 'number'){
        throw new Error('Precipitation must be a number!');
      }
      this[props].Precipitation = +val;
    }

    get Wind(){
      return this[props].Wind;
    }

    set Wind(val){
      if(typeof(val) !== 'number'){
        throw new Error('Wind must be a number!');
      }
      this[props].Wind = +val;
    }

    get SkyClear(){
      return this[props].SkyClear;
    }

    set SkyClear(val){
      if(typeof(val) !== 'number'){
        throw new Error('SkyClear must be a number!');
      }
      this[props].SkyClear = +val;
    }

    get SkyFog(){
      return this[props].SkyFog;
    }

    set SkyFog(val){
      if(typeof(val) !== 'number'){
        throw new Error('SkyFog must be a number!');
      }
      this[props].SkyFog = +val;
    }

    get SkyStorm(){
      return this[props].SkyStorm;
    }

    set SkyStorm(val){
      if(typeof(val) !== 'number'){
        throw new Error('SkyStorm must be a number!');
      }
      this[props].SkyStorm = +val;
    }

    get SkyDust(){
      return this[props].SkyDust;
    }

    set SkyDust(val){
      if(typeof(val) !== 'number'){
        throw new Error('SkyDust must be a number!');
      }
      this[props].SkyDust = +val;
    }

    get CloudsClear(){
      return this[props].CloudsClear;
    }

    set CloudsClear(val){
      if(typeof(val) !== 'number'){
        throw new Error('CloudsClear must be a number!');
      }
      this[props].CloudsClear = +val;
    }

    get CloudsFew(){
      return this[props].CloudsFew;
    }

    set CloudsFew(val){
      if(typeof(val) !== 'number'){
        throw new Error('CloudsFew must be a number!');
      }
      this[props].CloudsFew = +val;
    }

    get CloudsScattered(){
      return this[props].CloudsScattered;
    }

    set CloudsScattered(val){
      if(typeof(val) !== 'number'){
        throw new Error('CloudsScattered must be a number!');
      }
      this[props].CloudsScattered = +val;
    }

    get CloudsBroken(){
      return this[props].CloudsBroken;
    }

    set CloudsBroken(val){
      if(typeof(val) !== 'number'){
        throw new Error('CloudsBroken must be a number!');
      }
      this[props].CloudsBroken = +val;
    }

    get CloudsOvercast(){
      return this[props].CloudsOvercast;
    }

    set CloudsOvercast(val){
      if(typeof(val) !== 'number'){
        throw new Error('CloudsOvercast must be a number!');
      }
      this[props].CloudsOvercast = +val;
    }

    get LightningFrequency(){
      return this[props].LightningFrequency;
    }

    set LightningFrequency(val){
      if(typeof(val) !== 'number'){
        throw new Error('LightningFrequency must be a number!');
      }
      this[props].LightningFrequency = +val;
    }

    get WeatherTypeLookup(){
      return this[props].mWeatherTypeLookup;
    }

    get CloudTypeLookup(){
      return this[props].mCloudTypeLookup;
    }

    static FromJXON(jxon){
      return XmlHelper.JXON2Type(
        jxon,
        null,
        BiomeWeatherSetting,
        Object.keys(defaultProps).filter(function(checkIfNonSerialized){
          return [
            'mCloudTypeLookup',
            'mWeatherTypeLookup',
          ].indexOf(checkIfNonSerialized) < 0;
        })
      );
    }
  }

  return BiomeWeatherSetting;
})();
