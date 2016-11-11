import applyDefaultPropsSpecToObject from '../../../../Utilities/applyDefaultPropsSpecToObject.js';
import WISize from '../../Global/Enums/WISize.js';
import WIRarity from '../../Global/Enums/WIRarity.js';
import XmlHelper from '../GameData/XmlHelper.js';

export default (function(){
  'use strict';

  var
    props = Symbol('props'),
    defaultProps = {
      Size: function(){
        return new WISize(WISize.NoLimit);
      },
      BaseRarity: function(){
        return new WIRarity(WIRarity.Common);
      },
      Wealth: 0|0,
      Alignment: 0|0,
      Occupation: 0|0,
      Region: 0|0,
      Subject: 0|0,
      Faction: 0|0,
    }
  ;

  class WIFlags{
    constructor(){
      applyDefaultPropsSpecToObject(this, props, defaultProps);
    }

    static get All(){
      var
        newFlags = new WIFlags()
      ;
      newFlags.Alignment = 0;
      newFlags.Faction = 0;
      newFlags.Occupation = 0;
      newFlags.Region = 0;
      newFlags.Subject = 0;
      newFlags.Wealth = 0;
      return newFlags;
    }

    static Union(flags1, flags2){
      if(
        !(flags1 instanceof WIFlags) ||
        !(flags2 instanceof WIFlags)
      ){
        throw new Error('Union must be performed on WIFlags instances!');
      }

      var
        newFlags = new WIFlags()
      ;
      newFlags.Alignment = flags1.Alignment | flags2.Alignment;
      newFlags.Faction = flags1.Faction | flags2.Faction;
      newFlags.Occupation = flags1.Occupation | flags2.Occupation;
      newFlags.Region = flags1.Region | flags2.Region;
      newFlags.Subject = flags1.Subject | flags2.Subject;
      newFlags.Wealth = flags1.Wealth | flags2.Wealth;
      return newFlags;
    }

    static Intersection(flags1, flags2){
      if(
        !(flags1 instanceof WIFlags) ||
        !(flags2 instanceof WIFlags)
      ){
        throw new Error('Intersection must be performed on WIFlags instances!');
      }

      var
        newFlags = new WIFlags()
      ;
      newFlags.Alignment = flags1.Alignment & flags2.Alignment;
      newFlags.Faction = flags1.Faction & flags2.Faction;
      newFlags.Occupation = flags1.Occupation & flags2.Occupation;
      newFlags.Region = flags1.Region & flags2.Region;
      newFlags.Subject = flags1.Subject & flags2.Subject;
      newFlags.Wealth = flags1.Wealth & flags2.Wealth;
      return newFlags;
    }

    CopyFrom(other, includeSize=true){
      if(!(other instanceof WIFlags)){
        throw new Error('other object must be an instanceof WIFlags');
      }
      if(!!includeSize){
        this.Size = other.Size;
      }
      this.BaseRarity = other.BaseRarity;
      this.Wealth = other.Wealth;
      this.Alignment = other.Alignment;
      this.Occupation = other.Occupation;
      this.Region = other.Region;
      this.Subject = other.Subject;
      this.Faction = other.Faction;
    }

    Union(other){
      this.CopyFrom(WIFlags.Union(this, other), false);
    }

    Intersection(other){
      this.CopyFrom(WIFlags.Intersection(this, other), false);
    }

    get Size(){
      return this[props].Size.toInt();
    }

    set Size(val){
      this[props].Size.fromVal(val);
    }

    get Wealth(){
      return this[props].Wealth;
    }

    set Wealth(val){
      if(typeof(val) !== 'number'){
        throw new Error('Wealth must be a number!');
      }

      this[props].Wealth = val|0;
    }

    get Alignment(){
      return this[props].Alignment;
    }

    set Alignment(val){
      if(typeof(val) !== 'number'){
        throw new Error('Alignment must be a number!');
      }

      this[props].Alignment = val|0;
    }

    get Occupation(){
      return this[props].Occupation;
    }

    set Occupation(val){
      if(typeof(val) !== 'number'){
        throw new Error('Occupation must be a number!');
      }

      this[props].Occupation = val|0;
    }

    get Region(){
      return this[props].Region;
    }

    set Region(val){
      if(typeof(val) !== 'number'){
        throw new Error('Region must be a number!');
      }

      this[props].Region = val|0;
    }

    get Subject(){
      return this[props].Subject;
    }

    set Subject(val){
      if(typeof(val) !== 'number'){
        throw new Error('Subject must be a number!');
      }

      this[props].Subject = val|0;
    }

    get Faction(){
      return this[props].Faction;
    }

    set Faction(val){
      if(typeof(val) !== 'number'){
        throw new Error('Faction must be a number!');
      }

      this[props].Faction = val|0;
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
        WIFlags,
        [
          'Alignment',
          'BaseRarity',
          'Faction',
          'Occupation',
          'Region',
          'Size',
          'Subject',
          'Wealth',
        ]
      );
    }
  }

  return WIFlags;
})();
