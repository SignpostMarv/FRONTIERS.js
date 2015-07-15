import WeatherQuarter from './WeatherQuarter.js';
import XmlHelper from '../GameData/XmlHelper.js';

export default (function(){
  'use strict';

  var
    propMorning = Symbol('morning'),
    propAfternoon = Symbol('afternoon'),
    propEvening = Symbol('evening'),
    propNight = Symbol('night')
  ;

  class WeatherSetting{
    constructor(){
      this[propMorning] = new WeatherQuarter();
      this[propAfternoon] = new WeatherQuarter();
      this[propEvening] = new WeatherQuarter();
      this[propNight] = new WeatherQuarter();
    }

    get QuarterMorning(){
      return this[propMorning];
    }

    set QuarterMorning(val){
      if(!(val instanceof WeatherQuarter)){
        throw new Error('QuarterMorning must be instanceof WeatherQuarter');
      }

      this[propMorning].copyFrom(val);
    }

    get QuarterAfternoon(){
      return this[propAfternoon];
    }

    set QuarterAfternoon(val){
      if(!(val instanceof WeatherQuarter)){
        throw new Error('QuarterAfternoon must be instanceof WeatherQuarter');
      }

      this[propAfternoon].copyFrom(val);
    }

    get QuarterEvening(){
      return this[propEvening];
    }

    set QuarterEvening(val){
      if(!(val instanceof WeatherQuarter)){
        throw new Error('QuarterEvening must be instanceof WeatherQuarter');
      }

      this[propEvening].copyFrom(val);
    }

    get QuarterNight(){
      return this[propNight];
    }

    set QuarterNight(val){
      if(!(val instanceof WeatherQuarter)){
        throw new Error('QuarterNight must be instanceof WeatherQuarter');
      }

      this[propNight].copyFrom(val);
    }

    static FromJXON(jxon){
      return XmlHelper.JXON2Type(
        jxon,
        null,
        WeatherSetting,
        [],
        {
          QuarterMorning: WeatherQuarter,
          QuarterAfternoon: WeatherQuarter,
          QuarterEvening: WeatherQuarter,
          QuarterNight: WeatherQuarter,
        }
      );
    }
  }

  return WeatherSetting;
})();
