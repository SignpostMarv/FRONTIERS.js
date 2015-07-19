import applyDefaultPropsSpecToObject from '../../../../Utilities/applyDefaultPropsSpecToObject.js';
import TemperatureRange from '../../Global/Enums/TemperatureRange.js';
import XmlHelper from '../../Managers/GameData/XmlHelper.js';

export default (function(){
  'use strict';

  var
    props = Symbol('props'),
    defaultProps = {
      UseDefaults: function(){
        return true;
      },
      StatusTempQuarterMorning: function(){
        return new TemperatureRange(TemperatureRange.C_Warm);
      },
      StatusTempQuarterAfternoon: function(){
        return new TemperatureRange(TemperatureRange.D_Hot);
      },
      StatusTempQuarterEvening: function(){
        return new TemperatureRange(TemperatureRange.C_Warm);
      },
      StatusTempQuarterNight: function(){
        return new TemperatureRange(TemperatureRange.B_Cold);
      },
    }
  ;

  class BiomeStatusTemps{
    constructor(){
      applyDefaultPropsSpecToObject(this, props, defaultProps);
    }

    get UseDefaults(){
      return this[props].UseDefaults;
    }

    set UseDefaults(val){
      this[props].UseDefaults = !!val;
    }

    get StatusTempQuarterMorning(){
      return this[props].StatusTempQuarterMorning;
    }

    set StatusTempQuarterMorning(val){
      this[props].StatusTempQuarterMorning.fromVal(val);
    }

    get StatusTempQuarterAfternoon(){
      return this[props].StatusTempQuarterAfternoon;
    }

    set StatusTempQuarterAfternoon(val){
      this[props].StatusTempQuarterAfternoon.fromVal(val);
    }

    get StatusTempQuarterEvening(){
      return this[props].StatusTempQuarterEvening;
    }

    set StatusTempQuarterEvening(val){
      this[props].StatusTempQuarterEvening.fromVal(val);
    }

    get StatusTempQuarterNight(){
      return this[props].StatusTempQuarterNight;
    }

    set StatusTempQuarterNight(val){
      this[props].StatusTempQuarterNight.fromVal(val);
    }

    get StatusTempsAverage(){
      return (Math.round(
        (
          this.StatusTempQuarterMorning +
          this.StatusTempQuarterAfternoon +
          this.StatusTempQuarterEvening +
          this.StatusTempQuarterNight
        ) / 4
      )|0);
    }

    static FromJXON(jxon){
      return XmlHelper.JXON2Type(
        jxon,
        null,
        BiomeStatusTemps,
        [
          'UseDefaults',
          'StatusTempQuarterMorning',
          'StatusTempQuarterAfternoon',
          'StatusTempQuarterEvening',
          'StatusTempQuarterNight',
        ]
      );
    }
  }

  return BiomeStatusTemps;
})();
