import applyDefaultPropsSpecToObject from '../../../../Utilities/applyDefaultPropsSpecToObject.js';
import WIFlags from '../WorldItems_Classes/WIFlags.js';
import Flags from '../../Utilities/Flags.js';
import FlagSet from '../../GameWorld/FlagSet.js';
import XmlHelper from '../GameData/XmlHelper.js';

export default (function(){
  'use strict';

  var
    props = Symbol('props'),
    defaultProps = {
      CharacterBodyLayout: function(){
        return 0|0;
      },
      Gender: function(){
        return 0|0;
      },
      GeneralAge: function(){
        return 0|0;
      },
      Ethnicity: function(){
        return 0|0;
      },
      Credentials1: function(){
        return 0|0;
      },
      Credentials2: function(){
        return 0|0;
      },
      Credentials3: function(){
        return 0|0;
      },
      Credentials4: function(){
        return 0|0;
      },
      Credentials5: function(){
        return 0|0;
      },
    }
  ;

  class CharacterFlags extends WIFlags{
    constructor(){
      super();
      applyDefaultPropsSpecToObject(this, props, defaultProps);
    }

    Check(anyOfThese){
      if(!(anyOfThese instanceof CharacterFlags)){
        throw new Error('anyOfThese must be an instanceof CharacterFlags');
      }

      return (
        Flags.Check(
          this.CharacterBodyLayout,
          anyOfThese.CharacterBodyLayout,
          Flags.CheckType.MatchAny
        ) &&
        Flags.Check(
          this.Alignment,
          anyOfThese.Alignment,
          Flags.CheckType.MatchAny
        ) &&
        Flags.Check(
          this.Ethnicity,
          anyOfThese.Ethnicity,
          Flags.CheckType.MatchAny
        ) &&
        Flags.Check(
          this.Faction,
          anyOfThese.Faction,
          Flags.CheckType.MatchAny
        ) &&
        Flags.Check(
          this.Gender,
          anyOfThese.Gender,
          Flags.CheckType.MatchAny
        ) && Flags.Check(
          this.GeneralAge,
          anyOfThese.GeneralAge,
          Flags.CheckType.MatchAny
        ) &&
        Flags.Check(
          this.Occupation,
          anyOfThese.Occupation,
          Flags.CheckType.MatchAny
        ) &&
        Flags.Check(
          this.Region,
          anyOfThese.Region,
          Flags.CheckType.MatchAny
        )
      );
    }

    Intersection(other){
      if(!(other instanceof CharacterFlags)){
        if(other instanceof WIFlags){
          super.Intersection(other);
        }else{
          throw new Error('other must be an instanceof CharacterFlags');
        }
      }

			this.Gender = this.Gender & other.Gender;
			this.GeneralAge = this.GeneralAge & other.GeneralAge;
			this.Ethnicity = this.Ethnicity & other.Ethnicity;
			this.Occupation = this.Occupation & other.Occupation;
			this.Credentials1 = this.Credentials1 & other.Credentials1;
			this.Credentials2 = this.Credentials2 & other.Credentials2;
			this.Credentials3 = this.Credentials3 & other.Credentials3;
			this.Credentials4 = this.Credentials4 & other.Credentials4;
			this.Credentials5 = this.Credentials5 & other.Credentials5;
			this.Faction = this.Faction & other.Faction;
			this.Region = this.Region & other.Region;
			this.Alignment = this.Alignment & other.Alignment;
			this.Wealth = this.Wealth & other.Wealth;
    }

    SafeIntersection(other){
      this.Intersection(other);
    }

    Union(other){
      if(!(other instanceof CharacterFlags)){
        if(other instanceof WIFlags){
          super.Union(other);
        }else{
          throw new Error('other must be an instanceof CharacterFlags');
        }
      }

			this.Gender = this.Gender | other.Gender;
			this.GeneralAge = this.GeneralAge | other.GeneralAge;
			this.Ethnicity = this.Ethnicity | other.Ethnicity;
			this.Occupation = this.Occupation | other.Occupation;
			this.Credentials1 = this.Credentials1 | other.Credentials1;
			this.Credentials2 = this.Credentials2 | other.Credentials2;
			this.Credentials3 = this.Credentials3 | other.Credentials3;
			this.Credentials4 = this.Credentials4 | other.Credentials4;
			this.Credentials5 = this.Credentials5 | other.Credentials5;
			this.Faction = this.Faction | other.Faction;
			this.Region = this.Region | other.Region;
			this.Alignment = this.Alignment | other.Alignment;
			this.Wealth = this.Wealth | other.Wealth;
    }

    ChooseMajorValues(tieBreaker){
      tieBreaker = tieBreaker|0;

			this.GeneralAge = FlagSet.GetFlagBitValue(
        this.GeneralAge,
        tieBreaker,
        1
      );
			this.Ethnicity = FlagSet.GetFlagBitValue(
        this.Ethnicity,
        tieBreaker,
        1
      );
    }

    ChooseMinorValues(tieBreaker){
      tieBreaker = tieBreaker|0;

			this.Occupation = FlagSet.GetFlagBitValue(
        this.Occupation,
        tieBreaker,
        1
      );
			this.Credentials1 = FlagSet.GetFlagBitValue(
        this.Credentials1,
        tieBreaker,
        1
      );
			this.Credentials2 = FlagSet.GetFlagBitValue(
        this.Credentials2,
        tieBreaker,
        1
      );
			this.Credentials3 = FlagSet.GetFlagBitValue(
        this.Credentials3,
        tieBreaker,
        1
      );
			this.Credentials4 = FlagSet.GetFlagBitValue(
        this.Credentials4,
        tieBreaker,
        1
      );
			this.Credentials5 = FlagSet.GetFlagBitValue(
        this.Credentials5,
        tieBreaker,
        1
      );
			this.Faction = FlagSet.GetFlagBitValue(
        this.Faction,
        tieBreaker,
        1
      );
			this.Region = FlagSet.GetFlagBitValue(
        this.Region,
        tieBreaker,
        1
      );
			this.Alignment = FlagSet.GetFlagBitValue(
        this.Alignment,
        tieBreaker,
        1
      );
			this.Wealth = FlagSet.GetFlagBitValue(
        this.Wealth,
        tieBreaker,
        1
      );
    }

    get CharacterBodyLayout(){
      return this[props].CharacterBodyLayout;
    }

    set CharacterBodyLayout(val){
      if(typeof(val) !== 'number'){
        throw new Error('CharacterBodyLayout must be a number!');
      }
      this[props].CharacterBodyLayout = val|0;
    }

    get Gender(){
      return this[props].Gender;
    }

    set Gender(val){
      if(typeof(val) !== 'number'){
        throw new Error('Gender must be a number!');
      }
      this[props].Gender = val|0;
    }

    get GeneralAge(){
      return this[props].GeneralAge;
    }

    set GeneralAge(val){
      if(typeof(val) !== 'number'){
        throw new Error('GeneralAge must be a number!');
      }
      this[props].GeneralAge = val|0;
    }

    get Ethnicity(){
      return this[props].Ethnicity;
    }

    set Ethnicity(val){
      if(typeof(val) !== 'number'){
        throw new Error('Ethnicity must be a number!');
      }
      this[props].Ethnicity = val|0;
    }

    get Credentials1(){
      return this[props].Credentials1;
    }

    set Credentials1(val){
      if(typeof(val) !== 'number'){
        throw new Error('Credentials1 must be a number!');
      }
      this[props].Credentials1 = val|0;
    }

    get Credentials2(){
      return this[props].Credentials2;
    }

    set Credentials2(val){
      if(typeof(val) !== 'number'){
        throw new Error('Credentials2 must be a number!');
      }
      this[props].Credentials2 = val|0;
    }

    get Credentials3(){
      return this[props].Credentials3;
    }

    set Credentials3(val){
      if(typeof(val) !== 'number'){
        throw new Error('Credentials3 must be a number!');
      }
      this[props].Credentials3 = val|0;
    }

    get Credentials4(){
      return this[props].Credentials4;
    }

    set Credentials4(val){
      if(typeof(val) !== 'number'){
        throw new Error('Credentials4 must be a number!');
      }
      this[props].Credentials4 = val|0;
    }

    get Credentials5(){
      return this[props].Credentials5;
    }

    set Credentials5(val){
      if(typeof(val) !== 'number'){
        throw new Error('Credentials5 must be a number!');
      }
      this[props].Credentials5 = val|0;
    }

    CopyFrom(other){
      if(!(other instanceof CharacterFlags)){
        throw new Error('Can only copy from other CharacterFlags instances');
      }
      super.CopyFrom(other);
      Object.keys(defaultProps).forEach(prop => {
        this[prop] = other[prop];
      });
    }

    toJSON(){
      var
        obj = {}
      ;
      Object.keys(defaultProps).forEach(prop => {
        obj[prop] = this[prop];
      });
    }

    static FromJXON(jxon){
      return XmlHelper.JXON2Type(
        jxon,
        null,
        CharacterFlags,
        Object.keys(defaultProps)
      );
    }
  }

  return CharacterFlags;
})();
