import MobileReference from '../Assets/Scripts/Managers/GameData/MobileReference.js';
import ChunkState from '../Assets/Scripts/Managers/Mods_Classes/ChunkState.js';
import IO from '../Assets/Scripts/Managers/GameData/IO.js';
import DataType from '../Assets/Scripts/Global/Enums/DataType.js';

export default (function(){
  'use strict';

  var
    props = Symbol('props'),
    init = Symbol('init'),
    AddMobileReference = Symbol('AddMobileReference'),
    RemoveMobileReference = Symbol('RemoveMobileReference'),
    GetMobileReferenceObjects = Symbol('GetMobileReferenceObjects'),
    LoadColorOverlay = Symbol('LoadColorOverlay'),
    colorOverlayLoaders = [],
    trackedObjects = new WeakMap()
  ;

  class RendererTHREE{
    constructor(renderer, width, height){
      if(typeof(renderer) !== 'function'){
        throw new Error(
          'Renderer not specified!'
        );
      }else if(
        typeof(width) !== 'number' ||
        typeof(height) !== 'number'
      ){
        throw new Error(
          'Resolution must be specified with numbers'
        );
      }else if(
        isNaN(width) ||
        isNaN(height) ||
        !isFinite(width) ||
        !isFinite(height)
      ){
        throw new Error(
          'Resolution must be specified with valid numbers'
        );
      }else if(
        width % 1 !== 0 ||
        height % 1 !== 0
      ){
        throw new Error(
          'Resolution must be specified with integers'
        );
      }else if(
        width < 1 ||
        height < 1
      ){
        throw new Error(
          'Resolution cannot be less than 1 in either dimension'
        );
      }

      this[props] = {
        Width: width|0,
        Height: height|0,
        RendererType: renderer,
        Renderer: null,
        Scene: null,
        Camera: null,
        AnimationRequest: null,
        LastAnimationRequest: null,
        Controls: null,
        Clock: new THREE.Clock(),
      };

      window.addEventListener('beforeunload', () => {
        console.log('page is about to unload');
        this.Pause();
      });

      document.addEventListener('visibilitychange', () => {
        if(document.hidden){
          console.log('pausing');
          this.Pause();
        }else if(this[props].LastAnimationRequest){
          console.log('resuming');
          this.Play();
        }
      });
    }

    get Width(){
      return this[props].Width;
    }

    get Height(){
      return this[props].Height;
    }

    get RenderSurface(){
      if(!this[props].Renderer){
        this[init]();
      }

      return this[props].Renderer.domElement;
    }

    get Controls(){
      return this[props].Controls;
    }

    set Controls(Controls){
      if(!this[props].Camera){
        this[init]();
      }

      this[props].Controls = new Controls(
        this[props].Camera
      );
    }

    get Camera(){
      return this[props].Camera;
    }

    get Scene(){
      return this[props].Scene;
    }

    Render(){
      if(!this[props].Renderer){
        this[init]();
      }
      var
        delta = this[props].Clock.getDelta()
      ;
      this.Controls.update(delta);

      this[props].Scene.updateMatrixWorld();
      this[props].Scene.traverse(object => {
        if(object instanceof THREE.LOD){
          object.update(this[props].Camera);
        }
      });

      this[props].Renderer.render(
        this[props].Scene,
        this[props].Camera
      );
    }

    Play(){
      this.Render();
      this[props].LastAnimationRequest = this[props].AnimationRequest;
      this[props].AnimationRequest =
        requestAnimationFrame(() => this.Play())
      ;
    }

    Pause(){
      this[props].LastAnimationRequest = this[props].AnimationRequest;
      this[props].AnimationRequest = cancelAnimationFrame(
        this[props].AnimationRequest
      );
    }

    AddObject(obj){
      var
        self = this
      ;
      return new Promise(function(resolve, reject){
        if(obj instanceof MobileReference){
          self[AddMobileReference](obj).then(resolve, reject);
        }else{
          self.Scene.add(obj);
          resolve(obj);
        }
      });
    }

    RemoveObject(obj){
      var
        self = this
      ;
      return new Promise(function(resolve, reject){
        if(obj instanceof MobileReference){
          self[RemoveMobileReference](obj).then(resolve, reject);
        }else{
          self.Scene.remove(obj);
          resolve(obj);
        }
      });
    }
  }

  RendererTHREE.prototype[init] = function(){
    var
      renderer = new this[props].RendererType({
        antialias: true,
      }),
      scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(
        45,
        this.Width / this.Height,
        1,
        20000
      )
    ;
    camera.position.z = 150;

    renderer.setClearColor(0x111111, 1);
    renderer.setSize(this.Width, this.Height);
    renderer.sortObjects = false;

    scene.fog = new THREE.Fog(0x111111, 150, 20000);
    scene.add(new THREE.AmbientLight(0xffffff));
    scene.autoUpdate = false;

    this[props].Renderer = renderer;
    this[props].Scene = scene;
    this[props].Camera = camera;
  };

  RendererTHREE.prototype[GetMobileReferenceObjects] = function(
    mobileReference
  ){
    var
      renderer = this,
      mobileReferenceHandler = function(mobileReference){
        return new Promise(function(resolve){
          Frontiers.Mods.Get.Runtime.LoadMod(
            'Chunk',
            mobileReference.ChunkName
          ).then(function(chunkState){
            resolve([
              mobileReference,
              chunkState
            ]);
          });
        });
      },
      chunkStateHandler = function(resp){
        return new Promise(function(resolve){
          Frontiers.Data.GameData.IO.LoadWorldData(
            'Chunk/' + resp[0].ChunkName,
            'Terrain'
          ).then(function(chunkTerrainData){
            resp.push(chunkTerrainData);
            resolve(resp);
          });
        });
      },
      makeTileHandler = function(resp){
        var
          resolution = resp[2].HeightmapResolution
        ;
        return function(tile){
          var
            lod = new THREE.LOD(),
            materialSettings = resp[2].MaterialSettings,
            material = new THREE.MeshPhongMaterial({
              color: parseInt(materialSettings.TerrainSpecColor, 16),
              shininess: materialSettings.TerrainSpecPower * 100,
              side: THREE.DoubleSide,
            }),
            geometry = [],
            i = 0|0,
            j = Math.pow(2, i),
            typed = tile.TypedArray()
          ;
          while(((tile.width - 1) / j) > 1){
            if(i === 1){
              typed = tile.Downsample();
            }else if(i > 1){
              typed = typed.then(function(ds){
                return ds.Downsample();
              });
            }
            var
              buffgeom = new THREE.PlaneBufferGeometry(
                1,
                1,
                (tile.width - 1) / j,
                (tile.width - 1) / j
              ),
              geomArr = [
                buffgeom,
                50 + Math.pow(2, j),
                new THREE.Mesh(buffgeom, material),
                typed,
              ]
            ;
            geometry.push(geomArr);
            if(i > 0){
              geomArr[3] = geomArr[3].then(function(ds){
                return ds.TypedArray();
              });
            }
            geomArr[2].scale.x = (
              ((tile.width - 1) / (resolution - 1)) * resp[1].SizeX
            );
            geomArr[2].scale.y = resp[2].HeightmapHeight;
            geomArr[2].scale.z = (
              ((tile.height - 1) / (resolution - 1)) * resp[1].SizeZ
            );
            ++i;
            j = Math.pow(2, i);
          }
          geometry.forEach(function(buffgeom){
            for(i=0;i<buffgeom[0].attributes.uv.array.length;i+=2){
              buffgeom[0].attributes.uv.array[i + 0] /= (
                (resolution - 1) / (tile.width - 1)
              );
              buffgeom[0].attributes.uv.array[i + 1] /= (
                (resolution - 1) / (tile.height - 1)
              );
              buffgeom[0].attributes.uv.array[i + 0] += (
                Math.max(0, tile.x - 1) / (resolution - 1)
              );
              buffgeom[0].attributes.uv.array[i + 1] = (
                1 - buffgeom[0].attributes.uv.array[i + 1]
              );
              buffgeom[0].attributes.uv.array[i + 1] += (
                ((tile.height - 1) / (resolution - 1)) *
                ((Math.max(0, tile.y - 1) / (tile.height - 1)) + 1)
              );
              buffgeom[0].attributes.uv.array[i + 1] %= 1;
            }
            buffgeom[0].attributes.uv.needsUpdate = true;
            buffgeom[2].updateMatrix();
            buffgeom[2].autoUpdate = false;
            lod.addLevel(buffgeom[2], buffgeom[1]);
            buffgeom[3].then(function(typed){
              var
                sqrt = Math.sqrt(typed.length)
              ;
              for(i=0;i<typed.length;++i){
                buffgeom[0].attributes.position.array[(i * 3) + 0] = (
                  ((i % sqrt) - 1) / (sqrt - 1)
                );
                buffgeom[0].attributes.position.array[(i * 3) + 1] = (
                  (typed[i] / 0xffff)
                );
                buffgeom[0].attributes.position.array[(i * 3) + 2] = (
                  (Math.floor((i / sqrt) - 1) / (sqrt - 1))
                );
              }
              buffgeom[2].updateMatrix();
            });
          });

          lod.position.x = (
            (resp[1].XTilePosition * resp[1].SizeX) +
            resp[1].TileOffset.x +
            (
              resp[1].SizeX * (tile.x / resolution)
            )
          );
          lod.position.y = (
            resp[1].YOffset +
            resp[1].TileOffset.y
          );
          lod.position.z = (
            (resp[1].ZTilePosition * resp[1].SizeZ) +
            resp[1].TileOffset.z +
            (
              resp[1].SizeZ * (tile.y / resolution)
            )
          );
          lod.updateMatrix();
          lod.matrixAutoUpdate = false;


          renderer[LoadColorOverlay](resp[1], 512).then(function(texture){
            material.map = texture;
            material.transparent = true;
            material.needsUpdate = true;
            for(var buffgeom of geometry){
              buffgeom[2].needsUpdate = true;
            }
          }, function(failure){
            console.warn('failed to get texture', resp[1], failure);
          });

          return lod;
        };
      },
      chunkTerrainDataHandler = function(resp){
        return new Promise(function(resolve){
          var
            resolution = resp[2].HeightmapResolution,
            chunkName = resp[0].ChunkName,
            fileName = 'Raw16Mac',
            dataType = Frontiers.DataType.World,
            x = 0|0,
            z = 0|0,
            numTiles = 0|0,
            tileSize = 0|0,
            tilePromises = [],
            tileHandler = makeTileHandler(resp)
          ;
          numTiles = (resolution - 1) / 32;
          tileSize = ((resolution - 1) / numTiles) + 1;
          for(z=0;z<numTiles;++z){
            for(x=0;x<numTiles;++x){
              tilePromises.push(Frontiers.Data.GameData.IO.LoadTerrainTile(
                (x * (resolution - 1) / numTiles),
                (z * (resolution - 1) / numTiles),
                tileSize,
                tileSize,
                resolution,
                chunkName,
                fileName,
                dataType
              ).then(tileHandler));
            }
          }

          resp.push(tilePromises);
          resolve(resp);
        });
      },
      patchesHandler = function(resp){
        return Promise.all(resp[3]);
      }
    ;
    if(!trackedObjects.has(mobileReference)){
      trackedObjects.set(mobileReference, [false]);
    }
    if(!trackedObjects.get(mobileReference)[0]){
      trackedObjects.get(mobileReference)[0] = new Promise(
        function(resolve, reject){
          if(trackedObjects.get(mobileReference).length > 1){
            resolve(trackedObjects.get(mobileReference).slice(1));
          }else{
            mobileReferenceHandler(mobileReference).then(
              chunkStateHandler,
              reject
            ).then(
              chunkTerrainDataHandler,
              reject
            ).then(
              patchesHandler,
              reject
            ).then(function(objects){
              trackedObjects.get(mobileReference).push(objects);
              resolve(objects);
            }, reject);
          }
        }
      );
    }
    return trackedObjects.get(mobileReference)[0];
  };

  RendererTHREE.prototype[AddMobileReference] = function(mobileReference){
    var
      self = this
    ;
    return new Promise(function(resolve, reject){
      self[GetMobileReferenceObjects](mobileReference).then(
        function(objects){
          for(let object of objects){
            self.AddObject(object);
          }
          resolve(mobileReference);
        },
        reject
      );
    });
  };

  RendererTHREE.prototype[RemoveMobileReference] = function(mobileReference){
    var
      self = this
    ;
    return new Promise(function(resolve, reject){
      self[GetMobileReferenceObjects](mobileReference).then(
        function(objects){
          for(let object of objects){
            self.RemoveObject(object);
          }
          resolve(mobileReference);
        },
        reject
      );
    });
  };

  RendererTHREE.prototype[LoadColorOverlay] = function(chunkState, resolution){
    if(!(chunkState instanceof ChunkState)){
      throw new Error(
        'ChunkState instance must be specified'
      );
    }else if(typeof(resolution) !== 'number'){
      throw new Error(
        'Resolution must be specified as number'
      );
    }else if(resolution % 1 !== 0){
      throw new Error(
        'Resolution must be specified as integer'
      );
    }
    resolution = resolution|0;
    if(!(colorOverlayLoaders[resolution] instanceof WeakMap)){
      colorOverlayLoaders[resolution] = new WeakMap();
    }
    if(!colorOverlayLoaders[resolution].has(chunkState)){
      colorOverlayLoaders[resolution].set(
        chunkState,
        new Promise(function(resolve, reject){
          IO.LoadTerrainMap(
            resolution,
            false,
            true,
            chunkState.Name,
            'ColorOverlay',
            DataType.World
          ).then(function(ctx){
            var
              texture = new THREE.Texture(ctx.canvas)
            ;
            texture.needsUpdate = true;
            resolve(texture);
          }, reject);
        })
      );
    }

    return colorOverlayLoaders[resolution].get(chunkState);
  };

  return RendererTHREE;
})();
