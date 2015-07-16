import applyDefaultPropsSpecToObject from '../../../../Utilities/applyDefaultPropsSpecToObject.js';
import Mod from '../Mods/Mod.js';
import ClimateType from '../../Global/Enums/ClimateType.js';
import WeatherSetting from './WeatherSetting.js';
import Random from '../../../../Stubs/Unity/Random.js';
import Mathf from '../../../../Stubs/Unity/Mathf.js';
import TOD_Weather from '../../../../Stubs/TOD_Weather.js';
import BiomeStatusTemps from '../../GameWorld/Biome/BiomeStatusTemps.js';
import BiomeWeatherSetting from './BiomeWeatherSetting.js';
import XmlHelper from '../GameData/XmlHelper.js';

export default (function(){
  'use strict';

  var
    props = Symbol('props'),
    defaultProps = {
      Climate: function(){
        return ClimateType.Temperate;
      },
      ColorSetting: function(){
        return 'TemperateRegion';
      },
      FreezingPointOffset: function(){
        return +0.15;
      },
      AltitutdeOffset: function(){
        return +250;
      },
      SnowHighpass: function(){
        return +0.9;
      },
      SnowLowpass: function(){
        return +0.5;
      },
      PrecipitationLevel: function(){
        return +0.5;
      },
      BaseTemperature: function(){
        return +0;
      },
      SpringTempOffset: function(){
        return +0;
      },
      SummerTempOffset: function(){
        return +0;
      },
      AutumnTempOffset: function(){
        return +0;
      },
      WinterTempOffset: function(){
        return +0;
      },
      ShorelineTempOffset: function(){
        return +0;
      },
      ForestTempOffset: function(){
        return +0;
      },
      CivilizationTempOffset: function(){
        return +0;
      },
      OpenFieldTempOffset: function(){
        return +0;
      },
      TideBaseElevation: function(){
        return +25;
      },
      TideMaxDifference: function(){
        return +5;
      },
      AmbientLightMultiplier: function(){
        return +1.0;
      },
      SunlightIntensityMultiplier: function(){
        return +1.0;
      },
      ExposureMultiplier: function(){
        return +1.0;
      },
  		StatusTempsSummer: function(){
        return new BiomeStatusTemps();
      },
  		StatusTempsSpring: function(){
        return new BiomeStatusTemps();
      },
  		StatusTempsAutumn: function(){
        return new BiomeStatusTemps();
      },
  		StatusTempsWinter: function(){
        return new BiomeStatusTemps();
      },
      WeatherSummer: function(){
        return new BiomeWeatherSetting();
      },
      WeatherSpring: function(){
        return new BiomeWeatherSetting();
      },
      WeatherAutumn: function(){
        return new BiomeWeatherSetting();
      },
      WeatherWinter: function(){
        return new BiomeWeatherSetting();
      },
      Almanac: function(){
        return [];
      },
    }
  ;

  class ChunkBiomeData extends Mod{
    constructor(){
      super();
      applyDefaultPropsSpecToObject(this, props, defaultProps);
    }

    CopyFrom(other){
      if(!(other instanceof ChunkBiomeData)){
        throw new Error(
          'Can only copy from other instances of ChunkBiomeData'
        );
      }
      super.CopyFrom(other);
      Object.keys(defaultProps).forEach(prop => {
        this[prop] = other[prop];
      });
    }

    get IgnoreProfileDataIfOutdated(){
      return true;
    }

    get Climate(){
      return this[props].Climate;
    }

    set Climate(val){
      if(!(val instanceof ClimateType)){
        val = new ClimateType(val);
      }
      this[props].Climate = val;
    }

    get ColorSetting(){
      return this[props].ColorSetting;
    }

    set ColorSetting(val){
      this[props].ColorSetting = (val + '');
    }


    get FreezingPointOffset(){
      return this[props].FreezingPointOffset;
    }

    set FreezingPointOffset(val){
      if(typeof(val) !== 'number'){
        throw new Error('FreezingPointOffset must be a number!');
      }

      this[props].FreezingPointOffset = +val;
    }

    get AltitutdeOffset(){
      return this[props].AltitutdeOffset;
    }

    set AltitutdeOffset(val){
      if(typeof(val) !== 'number'){
        throw new Error('AltitutdeOffset must be a number!');
      }

      this[props].AltitutdeOffset = +val;
    }

    get SnowHighpass(){
      return this[props].SnowHighpass;
    }

    set SnowHighpass(val){
      if(typeof(val) !== 'number'){
        throw new Error('SnowHighpass must be a number!');
      }

      this[props].SnowHighpass = +val;
    }

    get SnowLowpass(){
      return this[props].SnowLowpass;
    }

    set SnowLowpass(val){
      if(typeof(val) !== 'number'){
        throw new Error('SnowLowpass must be a number!');
      }

      this[props].SnowLowpass = +val;
    }

    get PrecipitationLevel(){
      return this[props].PrecipitationLevel;
    }

    set PrecipitationLevel(val){
      if(typeof(val) !== 'number'){
        throw new Error('PrecipitationLevel must be a number!');
      }

      this[props].PrecipitationLevel = +val;
    }

    get BaseTemperature(){
      return this[props].BaseTemperature;
    }

    set BaseTemperature(val){
      if(typeof(val) !== 'number'){
        throw new Error('BaseTemperature must be a number!');
      }

      this[props].BaseTemperature = +val;
    }

    get SpringTempOffset(){
      return this[props].SpringTempOffset;
    }

    set SpringTempOffset(val){
      if(typeof(val) !== 'number'){
        throw new Error('SpringTempOffset must be a number!');
      }

      this[props].SpringTempOffset = +val;
    }

    get SummerTempOffset(){
      return this[props].SummerTempOffset;
    }

    set SummerTempOffset(val){
      if(typeof(val) !== 'number'){
        throw new Error('SummerTempOffset must be a number!');
      }

      this[props].SummerTempOffset = +val;
    }

    get AutumnTempOffset(){
      return this[props].AutumnTempOffset;
    }

    set AutumnTempOffset(val){
      if(typeof(val) !== 'number'){
        throw new Error('AutumnTempOffset must be a number!');
      }

      this[props].AutumnTempOffset = +val;
    }

    get WinterTempOffset(){
      return this[props].WinterTempOffset;
    }

    set WinterTempOffset(val){
      if(typeof(val) !== 'number'){
        throw new Error('WinterTempOffset must be a number!');
      }

      this[props].WinterTempOffset = +val;
    }

    get ShorelineTempOffset(){
      return this[props].ShorelineTempOffset;
    }

    set ShorelineTempOffset(val){
      if(typeof(val) !== 'number'){
        throw new Error('ShorelineTempOffset must be a number!');
      }

      this[props].ShorelineTempOffset = +val;
    }

    get ForestTempOffset(){
      return this[props].ForestTempOffset;
    }

    set ForestTempOffset(val){
      if(typeof(val) !== 'number'){
        throw new Error('ForestTempOffset must be a number!');
      }

      this[props].ForestTempOffset = +val;
    }

    get CivilizationTempOffset(){
      return this[props].CivilizationTempOffset;
    }

    set CivilizationTempOffset(val){
      if(typeof(val) !== 'number'){
        throw new Error('CivilizationTempOffset must be a number!');
      }

      this[props].CivilizationTempOffset = +val;
    }

    get OpenFieldTempOffset(){
      return this[props].OpenFieldTempOffset;
    }

    set OpenFieldTempOffset(val){
      if(typeof(val) !== 'number'){
        throw new Error('OpenFieldTempOffset must be a number!');
      }

      this[props].OpenFieldTempOffset = +val;
    }

    get TideBaseElevation(){
      return this[props].TideBaseElevation;
    }

    set TideBaseElevation(val){
      if(typeof(val) !== 'number'){
        throw new Error('TideBaseElevation must be a number!');
      }

      this[props].TideBaseElevation = +val;
    }

    get TideMaxDifference(){
      return this[props].TideMaxDifference;
    }

    set TideMaxDifference(val){
      if(typeof(val) !== 'number'){
        throw new Error('TideMaxDifference must be a number!');
      }

      this[props].TideMaxDifference = +val;
    }

    get AmbientLightMultiplier(){
      return this[props].AmbientLightMultiplier;
    }

    set AmbientLightMultiplier(val){
      if(typeof(val) !== 'number'){
        throw new Error('AmbientLightMultiplier must be a number!');
      }

      this[props].AmbientLightMultiplier = +val;
    }

    get SunlightIntensityMultiplier(){
      return this[props].SunlightIntensityMultiplier;
    }

    set SunlightIntensityMultiplier(val){
      if(typeof(val) !== 'number'){
        throw new Error('SunlightIntensityMultiplier must be a number!');
      }

      this[props].SunlightIntensityMultiplier = +val;
    }

    get ExposureMultiplier(){
      return this[props].ExposureMultiplier;
    }

    set ExposureMultiplier(val){
      if(typeof(val) !== 'number'){
        throw new Error('ExposureMultiplier must be a number!');
      }

      this[props].ExposureMultiplier = +val;
    }

		get StatusTempsSummer(){
      return this[props].StatusTempsSummer;
    }

    set StatusTempsSummer(val){
      if(!(val instanceof BiomeStatusTemps)){
        throw new Error('StatusTempsSummer must be an instanceof BiomeStatusTemps!');
      }
      this[props].StatusTempsSummer = val;
    }

		get StatusTempsSpring(){
      return this[props].StatusTempsSpring;
    }

    set StatusTempsSpring(val){
      if(!(val instanceof BiomeStatusTemps)){
        throw new Error('StatusTempsSpring must be an instanceof BiomeStatusTemps!');
      }
      this[props].StatusTempsSpring = val;
    }

		get StatusTempsAutumn(){
      return this[props].StatusTempsAutumn;
    }

    set StatusTempsAutumn(val){
      if(!(val instanceof BiomeStatusTemps)){
        throw new Error('StatusTempsAutumn must be an instanceof BiomeStatusTemps!');
      }
      this[props].StatusTempsAutumn = val;
    }

		get StatusTempsWinter(){
      return this[props].StatusTempsWinter;
    }

    set StatusTempsWinter(val){
      if(!(val instanceof BiomeStatusTemps)){
        throw new Error('StatusTempsWinter must be an instanceof BiomeStatusTemps!');
      }
      this[props].StatusTempsWinter = val;
    }

    get WeatherSummer(){
      return this[props].WeatherSummer;
    }

    set WeatherSummer(val){
      if(!(val instanceof BiomeWeatherSetting)){
        throw new Error('WeatherSummer must be an instanceof BiomeWeatherSetting!');
      }
      this[props].WeatherSummer = val;
    }

    get WeatherSpring(){
      return this[props].WeatherSpring;
    }

    set WeatherSpring(val){
      if(!(val instanceof BiomeWeatherSetting)){
        throw new Error('WeatherSpring must be an instanceof BiomeWeatherSetting!');
      }
      this[props].WeatherSpring = val;
    }

    get WeatherAutumn(){
      return this[props].WeatherAutumn;
    }

    set WeatherAutumn(val){
      if(!(val instanceof BiomeWeatherSetting)){
        throw new Error('WeatherAutumn must be an instanceof BiomeWeatherSetting!');
      }
      this[props].WeatherAutumn = val;
    }

    get WeatherWinter(){
      return this[props].WeatherWinter;
    }

    set WeatherWinter(val){
      if(!(val instanceof BiomeWeatherSetting)){
        throw new Error('WeatherWinter must be an instanceof BiomeWeatherSetting!');
      }
      this[props].WeatherWinter = val;
    }

    get Almanac(){
      return this[props].Almanac;
    }

    set Almanac(val){
      if(!(val instanceof Array)){
        throw new Error('Almanac must be an instanceof Array!');
      }
      this[props].Almanac = val;
    }

    GetWeather(dayOfYear, hourOfDay){
      if(
        typeof(dayOfYear) !== 'number' ||
        typeof(hourOfDay) !== 'number'
      ){
        throw new Error('Arguments must be numbers!');
      }
      dayOfYear = dayOfYear|0;
      hourOfDay = hourOfDay|0;

      if(this.Almanac === null){
        this.GenerateAlmanac();
      }

      var
        weather = null
      ;

      if(dayOfYear < this.Almanac.length){
        if(hourOfDay < 6){
          weather = this.Almanac[dayOfYear].QuarterMorning;
        }else if(hourOfDay < 12){
          weather = this.Almanac[dayOfYear].QuarterAfternoon;
        }else if(hourOfDay < 18){
          weather = this.Almanac[dayOfYear].QuarterEvening;
        }else{
          weather = this.Almanac[dayOfYear].QuarterNight;
        }
      }

      return weather;
    }

    GenerateAlmanac(){
      var
        Almanac = new Array(365)
      ;

      this.WeatherSummer.Normalize();
      this.WeatherSpring.Normalize();
      this.WeatherAutumn.Normalize();
      this.WeatherWinter.Normalize();


      this.WeatherSummer.GenerateLookup();
      this.WeatherSpring.GenerateLookup();
      this.WeatherAutumn.GenerateLookup();
      this.WeatherWinter.GenerateLookup();

      var
        weather = null,
        setting = new WeatherSetting(),
        i=0|0
      ;
      for(i=0;i<365;i++){
				//spring starts on day 45, ends on day 139 (95)
				//summer starts on day 140, ends on day 229 (90)
				//autumn starts on day 230, ends on day 319 (90)
				//winter starts on day 320, ends on day 49 (90)

        if(i >= 320 || i < 45){
          //winter
          weather = this.WeatherWinter;
        }else if(i >= 230){
          //autumn
          weather = this.WeatherAutumn;
        }else if(i >= 140){
          //summer
          weather = this.WeatherSummer;
        }else{
          //spring
          weather = this.WeatherSpring;
        }

        setting.QuarterMorning.CloudType =
          weather.CloudTypeLookup[
            Random.range(0, weather.CloudTypeLookup.length)
          ]
        ;
        setting.QuarterAfternoon.CloudType =
          weather.CloudTypeLookup[
            Random.range(0, weather.CloudTypeLookup.length)
          ]
        ;
        setting.QuarterEvening.CloudType =
          weather.CloudTypeLookup[
            Random.range(0, weather.CloudTypeLookup.length)
          ]
        ;
        setting.QuarterNight.CloudType =
          weather.CloudTypeLookup[
            Random.range(0, weather.CloudTypeLookup.length)
          ]
        ;

        setting.QuarterMorning.WeatherType =
          weather.WeatherTypeLookup[
            Random.range(0, weather.WeatherTypeLookup.length)
          ]
        ;
        setting.QuarterAfternoon.WeatherType =
          weather.WeatherTypeLookup[
            Random.range(0, weather.WeatherTypeLookup.length)
          ]
        ;
        setting.QuarterEvening.WeatherType =
          weather.WeatherTypeLookup[
            Random.range(0, weather.WeatherTypeLookup.length)
          ]
        ;
        setting.QuarterNight.WeatherType =
          weather.WeatherTypeLookup[
            Random.range(0, weather.WeatherTypeLookup.length)
          ]
        ;

        var
          precipitationValue = Random.value
        ;
        if(precipitationValue <= weather.Precipitation){
          precipitationValue =
            Mathf.Clamp(precipitationValue, +0.05, this.PrecipitationLevel)
          ;
					setting.QuarterMorning.Precipitation =
            this.WeightedPrecipitationValue(
              precipitationValue,
              setting.QuarterMorning.Weather,
              setting.QuarterMorning.CloudType
          );
					setting.QuarterAfternoon.Precipitation =
            this.WeightedPrecipitationValue(
              precipitationValue,
              setting.QuarterAfternoon.Weather,
              setting.QuarterAfternoon.CloudType
          );
					setting.QuarterEvening.Precipitation =
            this.WeightedPrecipitationValue(
              precipitationValue,
              setting.QuarterEvening.Weather,
              setting.QuarterEvening.CloudType
          );
					setting.QuarterNight.Precipitation =
            this.WeightedPrecipitationValue(
              precipitationValue,
              setting.QuarterNight.Weather,
              setting.QuarterNight.CloudType
          );
        }

        Almanac[i] = new WeatherSetting();
        Almanac[i].CopyFrom(setting);
      }

      this.Almanac = Almanac;
    }

    static WeightedPrecipitationValue(precipitationValue, weather, clouds){
      if(typeof(precipitationValue) !== 'number'){
        throw new Error('precipitationValue must be a number!');
      }else if(
        !(weather instanceof TOD_Weather.WeatherType)
      ){
        throw new Error(
          'weather must be an instanceof TOD_Weather.WeatherType'
        );
      }else if(
        !(clouds instanceof TOD_Weather.CloudType)
      ){
        throw new Error(
          'clouds must be an instanceof TOD_Weather.CloudType'
        );
      }
      switch(weather.toInt()){
        default:
        case TOD_Weather.WeatherType.Clear:
        case TOD_Weather.WeatherType.Dust:
          switch(clouds.toInt()){
            case TOD_Weather.CloudType.None:
              precipitationValue = +0;
            break;
            case TOD_Weather.CloudType.Few:
              precipitationValue *= +0.15;
            break;
            case TOD_Weather.CloudType.Scattered:
              precipitationValue *= +0.25;
            break;
            case TOD_Weather.CloudType.Broken:
              precipitationValue *= +0.5;
            break;
            default:
            case TOD_Weather.CloudType.Overcast:
            break;
          }
        break;
        case TOD_Weather.WeatherType.Fog:
          switch(clouds.toInt()){
            case TOD_Weather.CloudType.None:
              precipitationValue = +0.5;
            break;
            case TOD_Weather.CloudType.Few:
              precipitationValue *= +0.75;
            break;
            case TOD_Weather.CloudType.Scattered:
            break;
            case TOD_Weather.CloudType.Broken:
              precipitationValue *= +1.125;
            break;
            default:
            case TOD_Weather.CloudType.Overcast:
              precipitationValue *= +1.25;
            break;
          }
        break;
        case TOD_Weather.WeatherType.Storm:
          switch(clouds.toInt()){
            case TOD_Weather.CloudType.None:
              precipitationValue = +0.75;
            break;
            case TOD_Weather.CloudType.Few:
              precipitationValue *= +0.85;
            break;
            case TOD_Weather.CloudType.Scattered:
            break;
            case TOD_Weather.CloudType.Broken:
              precipitationValue *= +1.5;
            break;
            default:
            case TOD_Weather.CloudType.Overcast:
              precipitationValue *= +2;
            break;
          }
        break;
      }

      return precipitationValue;
    }

    static RandomWeightedWindSpeed(
      windChances,
      maxWindSpeed,
      minWindSpeed,
      weather
    ){
      if(
        typeof(windChances) !== 'number'
      ){
        throw new Error('windChances must be a number!');
      }else if(
        typeof(maxWindSpeed) !== 'number'
      ){
        throw new Error('maxWindSpeed must be a number!');
      }else if(
        typeof(minWindSpeed) !== 'number'
      ){
        throw new Error('minWindSpeed must be a number!');
      }else if(
        !(weather instanceof TOD_Weather.WeatherType)
      ){
        throw new Error(
          'weather must be an instanceof TOD_Weather.WeatherType'
        );
      }

      return +0;
    }

    static FromJXON(jxon){
      return XmlHelper.JXON2Type(
        jxon,
        null,
        ChunkBiomeData,
        [
          'AltitutdeOffset',
          'AmbientLightMultiplier',
          'AutumnTempOffset',
          'BaseTemperature',
          'CivilizationTempOffset',
          'Climate',
          'ColorSetting',
          'Description',
          'Dependencies',
          'DisplayOrder',
          'Enabled',
          'ExposureMultiplier',
          'ForestTempOffset',
          'FreezingPointOffset',
          'ListInAvailable',
          'Name',
          'OpenFieldTempOffset',
          'PrecipitationLevel',
          'ShorelineTempOffset',
          'SnowHighpass',
          'SnowLowpass',
          'SpringTempOffset',
          'SummerTempOffset',
          'SunlightIntensityMultiplier',
          'TideBaseElevation',
          'TideMaxDifference',
          'Type',
          'Version',
          'WinterTempOffset',
        ],
        {
          StatusTempsAutumn: BiomeStatusTemps,
          StatusTempsSpring: BiomeStatusTemps,
          StatusTempsSummer: BiomeStatusTemps,
          StatusTempsWinter: BiomeStatusTemps,
          WeatherAutumn: BiomeWeatherSetting,
          WeatherSpring: BiomeWeatherSetting,
          WeatherSummer: BiomeWeatherSetting,
          WeatherWinter: BiomeWeatherSetting,
        }
      ).then(function(typeInstance){
        if(
          'Almanac' in jxon &&
          'WeatherSetting' in jxon.Almanac
        ){
          return new Promise(function(resolve){
            Promise.all(jxon.Almanac.WeatherSetting.map(function(wsobj){
              return WeatherSetting.FromJXON(wsobj);
            })).then(function(values){
              typeInstance.Almanac = values;
              resolve(typeInstance);
            });
          });
        }
        return typeInstance;
      });
    }
  }

  return ChunkBiomeData;
})();
