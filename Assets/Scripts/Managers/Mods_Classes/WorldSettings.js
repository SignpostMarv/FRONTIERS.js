import applyDefaultPropsSpecToObject from '../../../../Utilities/applyDefaultPropsSpecToObject.js';
import Mod from '../Mods/Mod.js';
import SColor from '../../Utilities/SColor.js';
import MobileReference from '../GameData/MobileReference.js';
import AmbientAudioManager from '../../../../Stubs/AmbientAudioManager.js';
import WIFlags from '../WorldItems_Classes/WIFlags.js';
import CharacterFlags from '../Characters_Classes/CharacterFlags.js';
import ChunkBiomeData from './ChunkBiomeData.js';
import XmlHelper from '../GameData/XmlHelper.js';

export default (function(){
  'use strict';

  var
    props = Symbol(props),
    defaultProps = {
      DefaultTerrainType: function(){
        return SColor.Black;
      },
      DefaultBiome: function(){
        return '';
      },
      DefaultAmbientAudio: function(){
        return new AmbientAudioManager.ChunkAudioSettings();
      },
      DefaultAmbientAudioInterior: function(){
        return new AmbientAudioManager.ChunkAudioItem();
      },
      RequiredCompletedWorlds: function(){
        return [];
      },
      DefaultMusicCombat: function(){
        return '';
      },
      DefaultMusicCutscene: function(){
        return '';
      },
      DefaultMusicMainMenu: function(){
        return '';
      },
      DefaultMusicNight: function(){
        return '';
      },
      DefaultMusicRegional: function(){
        return '';
      },
      DefaultMusicSafeLocation: function(){
        return '';
      },
      DefaultMusicUnderground: function(){
        return '';
      },
      TimeHours: function(){
        return +0;
      },
      TimeDays: function(){
        return +0;
      },
      TimeMonths: function(){
        return +0;
      },
      TimeYears: function(){
        return +0;
      },
      WorldChunkTerrainHeightmapResolution: function(){
        return 0|0;
      },
      MaxSpawnedChunks: function(){
        return 0|0;
      },
      DefaultRevealedLocations: function(){
        return [];
      },
      DefaultResidentFlags: function(){
        return new CharacterFlags();
      },
      DefaultContainerFlags: function(){
        return new WIFlags();
      },
      DefaultBiomeData: function(){
        return new ChunkBiomeData();
      },
      BaseDifficultySettingNames: function(){
        return [];
      },
      DefaultHouseOfHealing: function(){
        return new MobileReference();
      },
      NumChunkTilesX: function(){
        return 0|0;
      },
      NumChunkTilesZ: function(){
        return 0|0;
      },
      NeverUnloadChunks: function(){
        return false;
      },
      GRTVisible: function(){
        return false;
      },
      BaseDifficultySettings: function(){
        return [];
      },
      FirstStartupPosition: function(){
        return 'PrologueSpawn';
      },
    }
  ;

  class WorldSettings extends Mod{
    constructor(){
      super();
      applyDefaultPropsSpecToObject(this, props, defaultProps);
      this.Type = 'World';
      this.Name = 'FRONTIERS';
      this.Description = 'A new world.';
    }

    get DefaultTerrainType(){
      return this[props].DefaultTerrainType;
    }

    set DefaultTerrainType(val){
      this[props].DefaultTerrainType.copyFrom(val);
    }

    get DefaultBiome(){
      return this[props].DefaultBiome;
    }

    set DefaultBiome(val){
      this[props].DefaultBiome = (val + '');
    }

    get DefaultAmbientAudio(){
      return this[props].DefaultAmbientAudio;
    }

    set DefaultAmbientAudio(val){
      this[props].DefaultAmbientAudio.copyFrom(val);
    }

    get DefaultAmbientAudioInterior(){
      return this[props].DefaultAmbientAudioInterior;
    }

    set DefaultAmbientAudioInterior(val){
      this[props].DefaultAmbientAudioInterior.copyFrom(val);
    }

    get IgnoreProfileDataIfOutdated(){
      return true;
    }

    get RequiresCompletedWorlds(){
      return this[props].RequiredCompletedWorlds.length > 0;
    }

    get RequiredCompletedWorlds(){
      return this[props].RequiredCompletedWorlds;
    }

    set RequiredCompletedWorlds(val){
      if(!(val instanceof Array)){
        if(val === ''){
          val = [];
        }else{
          throw new Error(
            'RequiredCompletedWorlds must be instanceof Array'
          );
        }
      }
      this[props].RequiredCompletedWorlds = val;
    }

    get DefaultMusicCombat(){
      return this[props].DefaultMusicCombat;
    }

    set DefaultMusicCombat(val){
      this[props].DefaultMusicCombat = (val + '');
    }

    get DefaultMusicCutscene(){
      return this[props].DefaultMusicCutscene;
    }

    set DefaultMusicCutscene(val){
      this[props].DefaultMusicCutscene = (val + '');
    }

    get DefaultMusicMainMenu(){
      return this[props].DefaultMusicMainMenu;
    }

    set DefaultMusicMainMenu(val){
      this[props].DefaultMusicMainMenu = (val + '');
    }

    get DefaultMusicNight(){
      return this[props].DefaultMusicNight;
    }

    set DefaultMusicNight(val){
      this[props].DefaultMusicNight = (val + '');
    }

    get DefaultMusicRegional(){
      return this[props].DefaultMusicRegional;
    }

    set DefaultMusicRegional(val){
      this[props].DefaultMusicRegional = (val + '');
    }

    get DefaultMusicSafeLocation(){
      return this[props].DefaultMusicSafeLocation;
    }

    set DefaultMusicSafeLocation(val){
      this[props].DefaultMusicSafeLocation = (val + '');
    }

    get DefaultMusicUnderground(){
      return this[props].DefaultMusicUnderground;
    }

    set DefaultMusicUnderground(val){
      this[props].DefaultMusicUnderground = (val + '');
    }

    get TimeHours(){
      return this[props].TimeHours;
    }

    set TimeHours(val){
      if(typeof(val) !== 'number'){
        throw new Error(
          'TimeHours must be a number!'
        );
      }
      this[props].TimeHours = +val;
    }

    get TimeDays(){
      return this[props].TimeDays;
    }

    set TimeDays(val){
      if(typeof(val) !== 'number'){
        throw new Error(
          'TimeDays must be a number!'
        );
      }
      this[props].TimeDays = +val;
    }

    get TimeMonths(){
      return this[props].TimeMonths;
    }

    set TimeMonths(val){
      if(typeof(val) !== 'number'){
        throw new Error(
          'TimeMonths must be a number!'
        );
      }
      this[props].TimeMonths = +val;
    }

    get TimeYears(){
      return this[props].TimeYears;
    }

    set TimeYears(val){
      if(typeof(val) !== 'number'){
        throw new Error(
          'TimeYears must be a number!'
        );
      }
      this[props].TimeYears = +val;
    }

    get WorldChunkTerrainHeightmapResolution(){
      return this[props].WorldChunkTerrainHeightmapResolution;
    }

    set WorldChunkTerrainHeightmapResolution(val){
      if(typeof(val) !== 'number'){
        throw new Error(
          'WorldChunkTerrainHeightmapResolution must be a number!'
        );
      }
      return this[props].WorldChunkTerrainHeightmapResolution;
    }

    get MaxSpawnedChunks(){
      return this[props].MaxSpawnedChunks;
    }

    set MaxSpawnedChunks(val){
      if(typeof(val) !== 'number'){
        throw new Error(
          'MaxSpawnedChunks must be a number!'
        );
      }
      return this[props].MaxSpawnedChunks;
    }

    get DefaultRevealedLocations(){
      return this[props].DefaultRevealedLocations;
    }

    set DefaultRevealedLocations(val){
      if(!(val instanceof Array)){
        throw new Error(
          'DefaultRevealedLocations must be an instanceof Array'
        );
      }
      this[props].DefaultRevealedLocations = val;
    }

    get DefaultResidentFlags(){
      return this[props].DefaultResidentFlags;
    }

    set DefaultResidentFlags(val){
      this[props].DefaultResidentFlags.copyFrom(val);
    }

    get DefaultContainerFlags(){
      return this[props].DefaultContainerFlags;
    }

    set DefaultContainerFlags(val){
      this[props].DefaultContainerFlags.copyFrom(val);
    }

    get DefaultBiomeData(){
      return this[props].DefaultBiomeData;
    }

    set DefaultBiomeData(val){
      this[props].DefaultBiomeData.copyFrom(val);
    }

    get BaseDifficultySettingNames(){
      return this[props].BaseDifficultySettingNames;
    }

    set BaseDifficultySettingNames(val){
      if(!(val instanceof Array)){
        throw new Error(
          'BaseDifficultySettingNames must be instanceof Array'
        );
      }
      return this[props].BaseDifficultySettingNames;
    }

    get DefaultHouseOfHealing(){
      return this[props].DefaultHouseOfHealing;
    }

    set DefaultHouseOfHealing(val){
      this[props].DefaultHouseOfHealing.copyFrom(val);
    }

    get NumChunkTilesX(){
      return this[props].NumChunkTilesX;
    }

    set NumChunkTilesX(val){
      if(typeof(val) !== 'number'){
        throw new Error(
          'NumChunkTilesX must be a number!'
        );
      }
      this[props].NumChunkTilesX = val|0;
    }

    get NumChunkTilesZ(){
      return this[props].NumChunkTilesZ;
    }

    set NumChunkTilesZ(val){
      if(typeof(val) !== 'number'){
        throw new Error(
          'NumChunkTilesZ must be a number!'
        );
      }
      this[props].NumChunkTilesZ = val|0;
    }

    get NeverUnloadChunks(){
      return this[props].NeverUnloadChunks;
    }

    set NeverUnloadChunks(val){
      this[props].NeverUnloadChunks = !!val;
    }

    get GRTVisible(){
      return this[props].GRTVisible;
    }

    set GRTVisible(val){
      this[props].GRTVisible = !!val;
    }

    get BaseDifficultySettings(){
      return this[props].BaseDifficultySettings;
    }

    set BaseDifficultySettings(val){
      if(!(val instanceof Array)){
        throw new Error(
          'BaseDifficultySettings must be an instanceof Array'
        );
      }
      this[props].BaseDifficultySettings = val;
    }

    get FirstStartupPosition(){
      return this[props].FirstStartupPosition;
    }

    set FirstStartupPosition(val){
      this[props].FirstStartupPosition = (val + '');
    }

    static FromJXON(jxon){
      return XmlHelper.JXON2Type(
        jxon,
        null,
        WorldSettings,
        [
          'DefaultBiome',
          'DefaultMusicCombat',
          'DefaultMusicCutscene',
          'DefaultMusicMainMenu',
          'DefaultMusicNight',
          'DefaultMusicRegional',
          'DefaultMusicSafeLocation',
          'DefaultMusicUnderground',
          'Dependencies',
          'Description',
          'DisplayOrder',
          'Enabled',
          'FirstStartupPosition',
          'GRTVisible',
          'ListInAvailable',
          'MaxSpawnedChunks',
          'Name',
          'NeverUnloadChunks',
          'NumChunkTilesX',
          'NumChunkTilesZ',
          'RequiredCompletedWorlds',
          'TimeDays',
          'TimeHours',
          'TimeMonths',
          'TimeYears',
          'Type',
          'Version',
          'WorldChunkTerrainHeightmapResolution',
        ],
        {
          DefaultAmbientAudioInterior: AmbientAudioManager.ChunkAudioItem,
          DefaultBiomeData: ChunkBiomeData,
          DefaultContainerFlags: WIFlags,
          DefaultHouseOfHealing: MobileReference,
          DefaultResidentFlags: CharacterFlags,
          DefaultTerrainType: SColor,
          DefaultAmbientAudio: AmbientAudioManager.ChunkAudioSettings,
        },
        [
          'BaseDifficultySettingNames',
          'BaseDifficultySettings',
        ],
        {
          DefaultRevealedLocations: MobileReference,
        }
      );
    }
  }

  return WorldSettings;
})();
