import applyDefaultPropsSpecToObject from '../../../Utilities/applyDefaultPropsSpecToObject.js';
import Mod from '../Managers/Mods/Mod.js';
import FlagCombo from './FlagSet/FlagCombo.js';

export default (function(){
  'use strict';

  var
    props = Symbol('props'),
    staticProps = Symbol('props'),
    defaultProps = {
      Flags: function(){
        return [];
      },
      FlagCombos: function(){
        return [];
      },
      mReverseLookup: function(){
        return {};
      },
      mLookup: function(){
        return {};
      },
    },
    defaultStaticProps = {
      gflagValues: function(){
        return new Array(32);
      },
    }
  ;

  class FlagSet extends Mod{

    constructor(){
      super();
      applyDefaultPropsSpecToObject(this, props, defaultProps);
    }

    GetItemNames(){
      return this[props].Flags.slice;
    }

    GetItemValues(){
      return this.Values;
    }

    CompareTo(other){
      if(!(other instanceof FlagSet)){
        throw new Error('Can only compare to other instances of FlagSet');
      }
      return this.Name.localeCompare(other.Name);
    }

    Values(){
      var
        values = new Array(this.Flags.length),
        i = 0|0
      ;
      for(i=0;i<this.Flags.length;i++){
        values[i] = 1 << i;
      }
      return values;
    }

    Refresh(){
      this.mLookup.Clear();
      var
        flagValue = 1|0,
        i = 0|0
      ;
      this.mLookup.Add('None', 0);
      this.mReverseLookup.add(0, 'None');

      for(i=0;i<this.Flags.length;i++){
        if(!this.Flags[i]){
          if(this.mLookup.ContainsKey(this.Flags[i])){
            this.mLookup[this.Flags[i]] = flagValue;
          }else{
            this.mLookup.Add(this.Flags[i], flagValue);
          }
          this.mReverseLookup.add(flagValue, this.Flags[i]);
        }
        flagValue = flagValue * 2;
      }
    }

    GetFlagValue(flagNames){
      if(typeof(flagNames) === 'number'){
        return 1 << (flagNames|0);
      }
      if(typeof(flagNames) === 'string'){
        flagNames = [flagNames];
      }
      if(!(flagNames instanceof Array)){
        throw new Error('flagNames must be instanceof Array');
      }
      var
        flagValue = 0|0,
        tryGetFlagValueOut = function(out){
          flagValue |= (out|0);
        }
      ;
      for(var flagName of flagNames){
        this.mLookup.TryGetValue(flagName, tryGetFlagValueOut);
      }
      return flagValue;
    }

    GetFlagIndex(flagVN){
      var
        flagVNType = typeof(flagVN),
        i = 0|0
      ;
      if(flagVNType !== 'number' && flagVNType !== 'string'){
        throw new Error('GetFlagIndex can only accept number or string!');
      }
      if(flagVNType === 'string'){
        for(i=0;i<this.Flags.Count;i++){
          if(flagVN === this.Flags[i]){
            return i;
          }
        }
      }else{
        for(i=0;i<32;i++){
          if(1 << i === flagVN){
            return i;
          }
        }
      }
      return -1;
    }

    static GetMaxValue(flags){
      var
        val = 0|0
      ;
      for(var i=0;i<32;i++){
        if(((1 << i ) & flags) > 0){
          val = i;
        }
      }
      return val;
    }

    static GetAverageValue(flags){
      var
        val = 0|0,
        numValues = 0
      ;
      for(var i=0;i<32;i++){
        if(((1 << i ) & flags) > 0){
          val = i;
          numValues++;
        }
      }
      if(numValues > 1){
        val /= numValues;
      }
      return val;
    }

    GetFlagName(flagValue){
      if(typeof(flagValue) !== 'number'){
        throw new Error('flagValue must be a number');
      }
      flagValue = flagValue|0;
      var
        flagName = ''
      ;
      this.mReverseLookup.TryGetValue(flagValue, function(out){
        flagName = out;
      });
      return flagName;
    }

    static IsSame(check, againstThese){
      return (check|0 === againstThese|0);
    }

    static HasAll(checkHas, allOfThese){
      return (checkHas|0 & allOfThese|0) !== 0;
    }

    static HasAny(checkHas, anyOfThese){
      return (checkHas|0 & anyOfThese|0) === checkHas|0;
    }

    static HasNone(checkHas, noneOfThese){
      return !FlagSet.HasAll(checkHas, noneOfThese);
    }

    static GetFlagValues(flags){
      var
        numValues = 0|0,
        i=0|0,
        finalFlagValues
      ;
      for(i=0;i<32;i++){
        if(((1 << i) & flags) > 0){
          FlagSet[staticProps].gflagValues[numValues] = i;
          numValues++;
        }
      }

      finalFlagValues = new Array(numValues);
      for(i=0;i<numValues;i++){
        finalFlagValues[i] = FlagSet[staticProps].gflagValues[numValues];
      }

      return finalFlagValues;
    }

    static GetFlagBitValue(flags, tieBreaker, defaultValue){
      if(
        typeof(flags) !== 'number' ||
        typeof(tieBreaker) !== 'number' ||
        typeof(defaultValue) !== 'number'
      ){
        throw new Error('arguments must be numbers!');
      }
      flags = flags|0;
      tieBreaker = tieBreaker|0;
      defaultValue = defaultValue|0;

      if(flags > 0){
        return 1 << FlagSet.GetFlagValue(flags, tieBreaker, defaultValue);
      }

      return defaultValue;
    }

    static GetFlagValue(flags, tieBreaker, defaultValue){
      if(
        typeof(flags) !== 'number' ||
        typeof(tieBreaker) !== 'number' ||
        typeof(defaultValue) !== 'number'
      ){
        throw new Error('arguments must be numbers!');
      }
      flags = flags|0;
      tieBreaker = tieBreaker|0;
      defaultValue = defaultValue|0;

      var
        flagValue = defaultValue,
        numValues = 0|0,
        i = 0|0
      ;
      for(i=0;i<32;i++){
        if(((1 << i) & flags) > 0){
          FlagSet[staticProps].gflagValues[numValues] = i;
          numValues++;
        }
      }
      if(numValues > 0){
        if(numValues > 1){
          flagValue = FlagSet[staticProps].gflagValues[
            Math.abs(tieBreaker) % FlagSet[staticProps].gflagValues.length
          ];
        }else{
          flagValue = FlagSet[staticProps].gflagValues[0];
        }
      }

      return flagValue;
    }

    static get FlagCombo(){
      return FlagCombo;
    }
  }

  applyDefaultPropsSpecToObject(FlagSet, staticProps, defaultStaticProps);

  return FlagSet;
})();
