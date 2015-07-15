import applyDefaultPropsSpecToObject from '../../../../Utilities/applyDefaultPropsSpecToObject.js';
import TOD_Weather from '../../../../Stubs/TOD_Weather.js';
import XmlHelper from '../GameData/XmlHelper.js';

export default (function(){
  'use strict';

  var
    props = Symbol('props'),
    defaultProps = {
      Wind: function(){
        return +0;
      },
      Mist: function(){
        return +0;
      },
      Precipitation: function(){
        return +0;
      },
      LightningFrequency: function(){
        return +1;
      },
      Weather: function(){
        return new TOD_Weather.WeatherType(0);
      },
      CloudType: function(){
        return new TOD_Weather.CloudType(0);
      },
    }
  ;

  class WeatherQuarter{
    constructor(){
      applyDefaultPropsSpecToObject(this, props, defaultProps);
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

    get Mist(){
      return this[props].Mist;
    }

    set Mist(val){
      if(typeof(val) !== 'number'){
        throw new Error('Mist must be a number!');
      }
      this[props].Mist = +val;
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

    get LightningFrequency(){
      return this[props].LightningFrequency;
    }

    set LightningFrequency(val){
      if(typeof(val) !== 'number'){
        throw new Error('LightningFrequency must be a number!');
      }
      this[props].LightningFrequency = +val;
    }

    get Weather(){
      return this[props].Weather.toInt();
    }

    set Weather(val){
      this[props].Weather.fromVal(val);
    }

    get CloudType(){
      return this[props].CloudType.toInt();
    }

    set CloudType(val){
      this[props].CloudType.fromVal(val);
    }

    copyFrom(other){
      if(!(other instanceof WeatherQuarter)){
        throw new Error(
          'Can only copy from other instances of WeatherQuarter'
        );
      }

      this.Wind = other.Wind;
      this.Mist = other.Mist;
      this.Precipitation = other.Precipitation;
      this.LightningFrequency = other.LightningFrequency;

      this.Weather = other.Weather;
      this.CloudType = other.CloudType;
    }

    static FromJXON(jxon){
      return XmlHelper.JXON2Type(
        jxon,
        null,
        WeatherQuarter,
        [
          'Wind',
          'Mist',
          'Precipitation',
          'LightningFrequency',
          'Weather',
          'CloudType',
        ]
      );
    }
  }

  return WeatherQuarter;
})();
