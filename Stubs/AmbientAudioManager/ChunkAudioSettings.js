import ChunkAudioItem from './ChunkAudioItem.js';
import XmlHelper from '../../Assets/Scripts/Managers/GameData/XmlHelper.js';

export default (function(){
  'use strict';

  var
    props = Symbol('props'),
    expectingFromJxon = {
      AgDayCoastal: ChunkAudioItem,
      AgDayForest: ChunkAudioItem,
      AgDayCivilized: ChunkAudioItem,
      AgDayOpen: ChunkAudioItem,
      AgNightCoastal: ChunkAudioItem,
      AgNightForested: ChunkAudioItem,
      AgNightCivilized: ChunkAudioItem,
      AgNightOpen: ChunkAudioItem,
      UgShallow: ChunkAudioItem,
      UgDeep: ChunkAudioItem,
      UgEnclosed: ChunkAudioItem,
      UgOpen: ChunkAudioItem,
      Rain: ChunkAudioItem,
      Wind: ChunkAudioItem,
      Thunder: ChunkAudioItem,
    }
  ;

  class ChunkAudioSettings{
    constructor(){
      this[props] = {};
      Object.keys(expectingFromJxon).forEach(e => {
        this[props][e] = new expectingFromJxon[e]();
      });
    }

    get AgDayCoastal(){
      return this[props].AgDayCoastal;
    }

    set AgDayCoastal(val){
      this[props].AgDayCoastal.copyFrom(val);
    }

    get AgDayForest(){
      return this[props].AgDayForest;
    }

    set AgDayForest(val){
      this[props].AgDayForest.copyFrom(val);
    }

    get AgDayCivilized(){
      return this[props].AgDayCivilized;
    }

    set AgDayCivilized(val){
      this[props].AgDayCivilized.copyFrom(val);
    }

    get AgDayOpen(){
      return this[props].AgDayOpen;
    }

    set AgDayOpen(val){
      this[props].AgDayOpen.copyFrom(val);
    }

    get AgNightCoastal(){
      return this[props].AgNightCoastal;
    }

    set AgNightCoastal(val){
      this[props].AgNightCoastal.copyFrom(val);
    }

    get AgNightForested(){
      return this[props].AgNightForested;
    }

    set AgNightForested(val){
      this[props].AgNightForested.copyFrom(val);
    }

    get AgNightCivilized(){
      return this[props].AgNightCivilized;
    }

    set AgNightCivilized(val){
      this[props].AgNightCivilized.copyFrom(val);
    }

    get AgNightOpen(){
      return this[props].AgNightOpen;
    }

    set AgNightOpen(val){
      this[props].AgNightOpen.copyFrom(val);
    }

    get UgShallow(){
      return this[props].UgShallow;
    }

    set UgShallow(val){
      this[props].UgShallow.copyFrom(val);
    }

    get UgDeep(){
      return this[props].UgDeep;
    }

    set UgDeep(val){
      this[props].UgDeep.copyFrom(val);
    }

    get UgEnclosed(){
      return this[props].UgEnclosed;
    }

    set UgEnclosed(val){
      this[props].UgEnclosed.copyFrom(val);
    }

    get UgOpen(){
      return this[props].UgOpen;
    }

    set UgOpen(val){
      this[props].UgOpen.copyFrom(val);
    }

    get Rain(){
      return this[props].Rain;
    }

    set Rain(val){
      this[props].Rain.copyFrom(val);
    }

    get Wind(){
      return this[props].Wind;
    }

    set Wind(val){
      this[props].Wind.copyFrom(val);
    }

    get Thunder(){
      return this[props].Thunder;
    }

    set Thunder(val){
      this[props].Thunder.copyFrom(val);
    }

    copyFrom(other){
      if(!(other instanceof ChunkAudioSettings)){
        throw new Error(
          'Can only copy from other instances of ChunkAudioSettings'
        );
      }
      Object.keys(expectingFromJxon).forEach(prop => {
        this[prop] = other[prop];
      });
    }

    static FromJXON(jxon){
      return XmlHelper.JXON2Type(
        jxon,
        null,
        ChunkAudioSettings,
        [],
        expectingFromJxon
      );
    }
  }

  return ChunkAudioSettings;
})();
