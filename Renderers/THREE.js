import MobileReference from '../Assets/Scripts/Managers/GameData/MobileReference.js';

export default (function(){
  'use strict';

  var
    props = Symbol('props'),
    init = Symbol('init'),
    AddMobileReference = Symbol('AddMobileReference')
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
      return new Promise((resolve, reject) => {
        if(obj instanceof MobileReference){
          this[AddMobileReference](obj).then(resolve, reject);
        }else{
          this[props].Scene.add(obj);
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

    scene.fog = new THREE.Fog(0xffffff, 150, 20000);
    scene.add(new THREE.AmbientLight(0x222222));

    this[props].Renderer = renderer;
    this[props].Scene = scene;
    this[props].Camera = camera;
  };

  RendererTHREE.prototype[AddMobileReference] = function(mobileReference){
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
          numTiles = (resolution - 1) / 16;
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
      makeTileHandler = function(resp){
        var
          resolution = resp[2].HeightmapResolution
        ;
        return function(tile){
          return tile.TypedArray().then(function(typed){
            var
              materialSettings = resp[2].MaterialSettings,
              geometry = new THREE.PlaneBufferGeometry(
                1,
                1,
                tile.width - 1,
                tile.height - 1
              ),
              material = new THREE.MeshPhongMaterial({
                color: parseInt(materialSettings.TerrainSpecColor, 16),
                shininess: materialSettings.TerrainSpecPower * 100,
                side: THREE.DoubleSide,
              }),
              mesh = new THREE.Mesh(geometry, material)
            ;

            for(var i=0;i<typed.length;++i){
              geometry.attributes.position.array[(i * 3) + 0] = (
                (i % tile.width) / tile.width
              );
              geometry.attributes.position.array[(i * 3) + 1] = (
                (typed[i] / 0xffff)
              );
              geometry.attributes.position.array[(i * 3) + 2] = (
                Math.floor(i / tile.width) / tile.height
              );
            }

            mesh.scale.x = (tile.width / resolution) * resp[1].SizeX;
            mesh.scale.y = resp[2].HeightmapHeight;
            mesh.scale.z = (tile.height / resolution) * resp[1].SizeZ;
            mesh.position.x = (
              (resp[1].XTilePosition * resp[1].SizeX) +
              resp[1].TileOffset.x +
              (
                resp[1].SizeX * (tile.x / resolution)
              )
            );
            mesh.position.y = (
              resp[1].YOffset +
              resp[1].TileOffset.y
            );
            mesh.position.z = (
              (resp[1].ZTilePosition * resp[1].SizeZ) +
              resp[1].TileOffset.z +
              (
                resp[1].SizeZ * (tile.y / resolution)
              )
            );

            return mesh;
          });
        };
      },
      patchesHandler = function(resp){
        return Promise.all(resp[3].map(function(prom){
          return new Promise(function(resolve, reject){
            prom.then(function(patch){
              requestAnimationFrame(function(){
                renderer.AddObject(patch).then(function(){
                  resolve(patch);
                  renderer.Camera.lookAt(patch.position);
                });
              });
            }, reject);
          });
        }));
      }
    ;
    return new Promise(function(resolve, reject){
      mobileReferenceHandler(mobileReference).then(
        chunkStateHandler,
        reject
      ).then(
        chunkTerrainDataHandler,
        reject
      ).then(
        patchesHandler,
        reject
      ).then(function(){
        resolve(mobileReference);
      }, reject);
    });
  };

  return RendererTHREE;
})();
