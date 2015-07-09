import Path from '../../../../Stubs/System/IO/Path.js';
import Directory from '../../../../Stubs/System/IO/Directory.js';
import FetchTileFromRawHeightmap from '../../../../Utilities/FetchTileFromRawHeightmap.js';
import Application from '../../../../Stubs/Unity/Application.js';
import RuntimePlatform from '../../../../Stubs/Unity/RuntimePlatform.js';
import Debug from '../../../../Stubs/Unity/Debug.js';
import DataType from '../../Global/Enums/DataType.js';

export default (function(){
  'use strict';

  var
    staticProps = Symbol('props'),
    GetHeightMapTiler = Symbol('GetHeightMapTiler')
  ;

  class IO{

    static LogPaths(){
      Debug.Log(IO.gGlobalWorldsPath);
      Debug.Log(IO.gGlobalProfilesPath);
      Debug.Log(IO.gBaseWorldPath);
      Debug.Log(IO.gBaseWorldModsPath);
      Debug.Log(IO.gCurrentWorldModsPath);
    }

    static InitializeSystemPaths(globalDataPath){
      return new Promise(function(resolve, reject){
        var
          result = true,
          errorMessage = ''
        ;

        switch(Application.platform){
          case RuntimePlatform.ES2015:
            IO.gGlobalDataPath = globalDataPath;
          break;
        }

        IO.gGlobalWorldsPath = Path.Combine(
          IO.gGlobalDataPath,
          IO.gGlobalWorldFolderName
        );
        IO.gGlobalProfilesPath = Path.Combine(
          IO.gGlobalDataPath,
          IO.gProfilesFolderName
        );
        IO.gBaseWorldPath = Path.Combine(
          IO.gGlobalWorldsPath,
          IO.gBaseWorldFolderName
        );
        IO.gBaseWorldModsPath = Path.Combine(
          IO.gBaseWorldPath,
          IO.gModsFolderName
        );
        //mod world is the world data sandwiched between current and base world
        IO.gModWorldPath = Path.Combine(
          IO.gGlobalWorldsPath,
          IO.gModWorldFolderName
        );
        IO.gModWorldModsPath = Path.Combine(
          IO.gModWorldPath,
          IO.gModsFolderName
        );
        //current world is the current game's world
        IO.gCurrentWorldPath = Path.Combine(
          IO.gGlobalWorldsPath,
          IO.gModWorldFolderName
        );
        IO.gCurrentWorldModsPath = Path.Combine(
          IO.gCurrentWorldPath,
          IO.gModsFolderName
        );

        var
          pathHandlers = [
            [
              IO.gGlobalDataPath,
              function(){
                errorMessage += (
                  "Global data path not found at " + IO.gGlobalDataPath + "\n"
                );
                result = false;
              },
            ],
            [
              IO.gGlobalProfilesPath,
              function(){
                /*
                Directory.CreateDirectory(
                */
                errorMessage += (
                  'Global Profiles Path not found at ' +
                  IO.gGlobalProfilesPath + "\n"
                );
                /*
                );
                */
              },
            ],
            [
              IO.gGlobalWorldsPath,
              function(){
                errorMessage += (
                  "Global worlds path not found at " +
                  IO.gGlobalWorldsPath +
                  "\n"
                );
                result = false;
              },
            ],
            [
              IO.gBaseWorldPath,
              function(){
                errorMessage += (
                  "Base world path not found at " +
                  IO.gBaseWorldPath +
                  "\n"
                );
                result = false;
              },
            ],
            [
              IO.gBaseWorldModsPath,
              function(){
                errorMessage += (
                  "Base world mods path not found at " +
                  IO.gBaseWorldModsPath +
                  "\n"
                );
                result = false;
              },
            ],
            [
              IO.gModWorldPath,
              function(){
                errorMessage += (
                  "Mod world path not found at " +
                  IO.gModWorldPath +
                  "\n"
                );
                result = false;
              },
            ],
            [
              IO.gModWorldModsPath,
              function(){
                errorMessage += (
                  "Mod world mods path not found at " +
                  IO.gModWorldModsPath +
                  "\n"
                );
                result = false;
              }
            ]
          ].map(function(pathHandler){
            return new Promise(function(res, rej){
              Directory.Exists(pathHandler[0]).then(function(dirExists){
                if(!dirExists){
                  pathHandler[1]();
                }
                res(dirExists);
              }).catch(rej);
            });
          })
        ;

        Promise.all(pathHandlers).catch(reject).then(function(){

          if(!IO.gLoadedMaps){
            IO.gLoadedMaps = {};
          }

          IO.LogPaths();

          if(!result){
            reject(errorMessage);
          }else{
            resolve(result);
          }
          return result;
        });
      });
    }

    static LoadTerrainHeights(resolution, chunkName, rawFileName, type){
      return new Promise(function(resolve, reject){
        if(typeof(resolution) !== 'number'){
          reject(new Error('resolution must be a number!'));
          return;
        }else if(resolution % 1 !== 0){
          reject(new Error('resolution must be an integer!'));
          return;
        }
        resolution = resolution|0;
        IO[GetHeightMapTiler](
          chunkName,
          rawFileName,
          type
        ).Heights(resolution).then(function(heights){
          resolve(heights);
        }, function(failure){
          console.error(failure);
          resolve(false);
        });
      });
    }

    static LoadTerrainCanvas(resolution, chunkName, rawFileName, type){
      return new Promise(function(resolve, reject){
        console.info('resolution not used', resolution);
        IO[GetHeightMapTiler](
          chunkName,
          rawFileName,
          type
        ).Canvas().then(resolve).catch(reject);
      });
    }

    static GetDataPath(type){
      type = type|0;
      switch(type){
        case DataType.Profile:
          return IO.gCurrentProfileLiveGamePath;

        case DataType.World:
          return IO.gModWorldModsPath;

        case DataType.Base:
          return IO.gBaseWorldModsPath;
        default:
          return IO.gBaseWorldModsPath;
      }
    }

    static get gGlobalProfilesPath(){
      return IO[staticProps].gGlobalProfilesPath;
    }

    static set gGlobalProfilesPath(val){
      IO[staticProps].gGlobalProfilesPath = (val + '');
    }

    static get gGlobalDataPath(){
      return IO[staticProps].gGlobalDataPath;
    }

    static set gGlobalDataPath(val){
      IO[staticProps].gGlobalDataPath = (val + '');
    }

    static get gGlobalChangeLogPath(){
      return IO[staticProps].gGlobalChangeLogPath;
    }

    static set gGlobalChangeLogPath(val){
      IO[staticProps].gGlobalChangeLogPath = (val + '');
    }

    static get gGlobalWorldsPath(){
      return IO[staticProps].gGlobalWorldsPath;
    }

    static set gGlobalWorldsPath(val){
      IO[staticProps].gGlobalWorldsPath = (val + '');
    }

    static get gBaseWorldPath(){
      return IO[staticProps].gBaseWorldPath;
    }

    static set gBaseWorldPath(val){
      IO[staticProps].gBaseWorldPath = (val + '');
    }

    static get gBaseWorldModsPath(){
      return IO[staticProps].gBaseWorldModsPath;
    }

    static set gBaseWorldModsPath(val){
      IO[staticProps].gBaseWorldModsPath = (val + '');
    }

    static get gModWorldPath(){
      return IO[staticProps].gModWorldPath;
    }

    static set gModWorldPath(val){
      IO[staticProps].gModWorldPath = (val + '');
    }

    static get gModWorldModsPath(){
      return IO[staticProps].gModWorldModsPath;
    }

    static set gModWorldModsPath(val){
      IO[staticProps].gModWorldModsPath = (val + '');
    }

    static get gCurrentGamePath(){
      return IO[staticProps].gCurrentGamePath;
    }

    static set gCurrentGamePath(val){
      IO[staticProps].gCurrentGamePath = (val + '');
    }

    static get gCurrentWorldPath(){
      return IO[staticProps].gCurrentWorldPath;
    }

    static set gCurrentWorldPath(val){
      IO[staticProps].gCurrentWorldPath = (val + '');
    }

    static get gCurrentWorldModsPath(){
      return IO[staticProps].gCurrentWorldModsPath;
    }

    static set gCurrentWorldModsPath(val){
      IO[staticProps].gCurrentWorldModsPath = (val + '');
    }

    static get gCurrentProfilePath(){
      return IO[staticProps].gCurrentProfilePath;
    }

    static set gCurrentProfilePath(val){
      IO[staticProps].gCurrentProfilePath = (val + '');
    }

    static get gCurrentProfileModsPath(){
      return IO[staticProps].gCurrentProfileModsPath;
    }

    static set gCurrentProfileModsPath(val){
      IO[staticProps].gCurrentProfileModsPath = (val + '');
    }

    static get gCurrentProfileLiveGamePath(){
      return IO[staticProps].gCurrentProfileLiveGamePath;
    }

    static set gCurrentProfileLiveGamePath(val){
      IO[staticProps].gCurrentProfileLiveGamePath = (val + '');
    }

    static get gBaseWorldFolderName(){
      return IO[staticProps].gBaseWorldFolderName;
    }

    static set gBaseWorldFolderName(val){
      IO[staticProps].gBaseWorldFolderName = (val + '');
    }

    static get gModWorldFolderName(){
      return IO[staticProps].gModWorldFolderName;
    }

    static set gModWorldFolderName(val){
      IO[staticProps].gModWorldFolderName = (val + '');
    }

    static get gFrontiersPrefix(){
      return IO[staticProps].gFrontiersPrefix;
    }

    static set gFrontiersPrefix(val){
      IO[staticProps].gFrontiersPrefix = (val + '');
    }

    static get gGlobalWorldFolderName(){
      return IO[staticProps].gGlobalWorldFolderName;
    }

    static set gGlobalWorldFolderName(val){
      IO[staticProps].gGlobalWorldFolderName = (val + '');
    }

    static get gProfilesFolderName(){
      return IO[staticProps].gProfilesFolderName;
    }

    static set gProfilesFolderName(val){
      IO[staticProps].gProfilesFolderName = (val + '');
    }

    static get gModsFolderName(){
      return IO[staticProps].gModsFolderName;
    }

    static set gModsFolderName(val){
      IO[staticProps].gModsFolderName = (val + '');
    }

    static get gLiveGameFolderName(){
      return IO[staticProps].gLiveGameFolderName;
    }

    static set gLiveGameFolderName(val){
      IO[staticProps].gLiveGameFolderName = (val + '');
    }

    static get gReferenceExtension(){
      return IO[staticProps].gReferenceExtension;
    }

    static set gReferenceExtension(val){
      IO[staticProps].gReferenceExtension = (val + '');
    }

    static get gHeightMapExtension(){
      return IO[staticProps].gHeightMapExtension;
    }

    static set gHeightMapExtension(val){
      IO[staticProps].gHeightMapExtension = (val + '');
    }

    static get gImageExtension(){
      return IO[staticProps].gImageExtension;
    }

    static set gImageExtension(val){
      IO[staticProps].gImageExtension = (val + '');
    }

    static get gAudioExtension(){
      return IO[staticProps].gAudioExtension;
    }

    static set gAudioExtension(val){
      IO[staticProps].gAudioExtension = (val + '');
    }

    static get gDataExtension(){
      return IO[staticProps].gDataExtension;
    }

    static set gDataExtension(val){
      IO[staticProps].gDataExtension = (val + '');
    }

    static get gProfileExtension(){
      return IO[staticProps].gProfileExtension;
    }

    static set gProfileExtension(val){
      IO[staticProps].gProfileExtension = (val + '');
    }

    static get gPreferencesExtension(){
      return IO[staticProps].gPreferencesExtension;
    }

    static set gPreferencesExtension(val){
      IO[staticProps].gPreferencesExtension = (val + '');
    }

    static get gGameExtension(){
      return IO[staticProps].gGameExtension;
    }

    static set gGameExtension(val){
      IO[staticProps].gGameExtension = (val + '');
    }

    static get gAssetBundleExtension(){
      return IO[staticProps].gAssetBundleExtension;
    }

    static set gAssetBundleExtension(val){
      IO[staticProps].gAssetBundleExtension = (val + '');
    }

  }

  IO[staticProps] = {

    //these are set once on startup then never again
    gGlobalProfilesPath : '',
    gGlobalDataPath : '',
    gGlobalChangeLogPath : '',
    gGlobalWorldsPath : '',
    gBaseWorldPath : '',
    gBaseWorldModsPath : '',
    gModWorldPath : '',
    gModWorldModsPath : '',

    //these change based on the loaded profile / world / game
    gCurrentGamePath : '',
    gCurrentWorldPath : '',
    gCurrentWorldModsPath : '',
    gCurrentProfilePath : '',
    gCurrentProfileModsPath : '',
    gCurrentProfileLiveGamePath : '',

    //these just help us create paths
    gBaseWorldFolderName : 'FRONTIERS',
    gModWorldFolderName : 'FRONTIERS',
    gFrontiersPrefix : 'Frontiers',
    gGlobalWorldFolderName : 'Worlds',
    gProfilesFolderName : 'Profiles',
    gModsFolderName : 'Mods',
    gLiveGameFolderName : '_LiveGame',
    gReferenceExtension : '.mobile',
    gHeightMapExtension : '.raw',
    gImageExtension : '.png',
    gAudioExtension : '.ogg',
    gDataExtension : '.frontiers',
    gProfileExtension : '.player',
    gPreferencesExtension : '.prefs',
    gGameExtension : '.game',
    gAssetBundleExtension : '.unity3d',
  };

  IO[GetHeightMapTiler] = function(chunkName, rawFileName, type){
    var
      dataPath = IO.GetDataPath(type),
      directory = Path.Combine(dataPath, Path.Combine('Chunk', chunkName)),
      fullPath = Path.Combine(
        directory,
        (rawFileName + IO.gHeightMapExtension)
      )
    ;

    return new FetchTileFromRawHeightmap(
      fullPath,
      Uint16Array,
      'BE'
    );
  };

  return IO;
})();
