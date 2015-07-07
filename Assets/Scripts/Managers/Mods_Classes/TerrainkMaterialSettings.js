import SColor from '../../Utilities/SColor.js';
import Material from '../../../../Stubs/Material.js';
import Mats from '../../../../Stubs/Mats.js';

export default (function(){
  'use strict';

  var
    props = Symbol('props'),
    methods = Symbol('methods'),
    defaultProps = {
      CombinedNormals12: function(){
        return 'CombinedNormalsA';
      },
      CombinedNormals34: function(){
        return 'CombinedNormalsB';
      },
      CombinedNormals56: function(){
        return 'CombinedNormalsC';
      },
      TerrainSpecColor: function(){
        return new SColor(
          +0.25,
          +0.25,
          +0.25,
          +0
        );
      },
      TerrainSpecPower: function(){
        return +0.25;
      },
      Texture1Average: function(){
        return SColor.Black;
      },
      Texture2Average: function(){
        return SColor.Black;
      },
      Texture3Average: function(){
        return SColor.Black;
      },
      Texture4Average: function(){
        return SColor.Black;
      },
      Texture5Average: function(){
        return SColor.Black;
      },
      Texture6Average: function(){
        return SColor.Black;
      },
      Texture1Shininess: function(){
        return +0.07812;
      },
      Texture2Shininess: function(){
        return +0.07812;
      },
      Texture3Shininess: function(){
        return +0.07812;
      },
      Texture4Shininess: function(){
        return +0.07812;
      },
      Texture5Shininess: function(){
        return +0.07812;
      },
      Texture6Shininess: function(){
        return +0.07812;
      },
      MultiUV: function(){
        return +0.5;
      },
      Desaturation: function(){
        return +0.5;
      },
      SplattingDistance: function(){
        return +600;
      },
      Decal1CCStrength: function(){
        return +0.5;
      },
      Decal1Sharpness: function(){
        return +0.5;
      },
      Decal2CCStrength: function(){
        return +0.5;
      },
      Decal2Sharpness: function(){
        return +0.5;
      },
      Splat0Tiling: function(){
        return +100;
      },
      Splat1Tiling: function(){
        return +100;
      },
      Splat2Tiling: function(){
        return +100;
      },
      Splat3Tiling: function(){
        return +100;
      },
      Splat4Tiling: function(){
        return +100;
      },
      Splat5Tiling: function(){
        return +100;
      },
      FresnelIntensity: function(){
        return +2;
      },
      FresnelPower: function(){
        return +1.5;
      },
      FresnelBias: function(){
        return -0.5;
      }
    },
    prototypeMethods = {
      ApplyMap: function(mapName, propertyName, maps, atsMaterial){
        if(
          !maps.GetValue(mapName, function(map){
            atsMaterial.SetTexture(propertyName, map);
          })
        ){
          /*
          console.log(
            'Couldn\'t get namp name ' + mapName
          );
          */
        }
      }
    }
  ;

  class TerrainkMaterialSettings{

    constructor(){
      for(var prop of Object.keys(defaultProps)){
        this[props][prop] = defaultProps[prop]();
      }
    }

    GetSettings(atsMaterial){
      if(!(atsMaterial instanceof Material)){
        throw new Error('Instance of Material not passed!');
      }

      let
        terrainCombinedFloats =
          atsMaterial.GetVector('_terrainCombinedFloats'),
        cn12 = atsMaterial.GetTexture ("_CombinedNormal12"),
        cn34 = atsMaterial.GetTexture ("_CombinedNormal34"),
        cn56 = atsMaterial.GetTexture ("_CombinedNormal56"),
        fresnelSettings = atsMaterial.GetVector ("_Fresnel")
      ;
			this.MultiUV = terrainCombinedFloats.x;
			this.Desaturation = terrainCombinedFloats.y;
			this.SplattingDistance = terrainCombinedFloats.z;
			this.TerrainSpecPower = terrainCombinedFloats.w;

      this.TerrainSpecColor = atsMaterial.GetColor('_SpecColor');

      this.Splat0Tiling = atsMaterial.GetFloat ("_Splat0Tiling");
      this.Splat1Tiling = atsMaterial.GetFloat ("_Splat1Tiling");
      this.Splat2Tiling = atsMaterial.GetFloat ("_Splat2Tiling");
      this.Splat3Tiling = atsMaterial.GetFloat ("_Splat3Tiling");
      this.Splat4Tiling = atsMaterial.GetFloat ("_Splat4Tiling");
      this.Splat5Tiling = atsMaterial.GetFloat ("_Splat5Tiling");

      this.Texture1Average = atsMaterial.GetColor ("_ColTex1");
      this.Texture2Average = atsMaterial.GetColor ("_ColTex2");
      this.Texture3Average = atsMaterial.GetColor ("_ColTex3");
      this.Texture4Average = atsMaterial.GetColor ("_ColTex4");
      this.Texture5Average = atsMaterial.GetColor ("_ColTex5");
      this.Texture6Average = atsMaterial.GetColor ("_ColTex6");

      this.Texture1Shininess = atsMaterial.GetFloat ("_Spec1");
      this.Texture2Shininess = atsMaterial.GetFloat ("_Spec2");
      this.Texture3Shininess = atsMaterial.GetFloat ("_Spec3");
      this.Texture4Shininess = atsMaterial.GetFloat ("_Spec4");
      this.Texture5Shininess = atsMaterial.GetFloat ("_Spec5");
      this.Texture6Shininess = atsMaterial.GetFloat ("_Spec6");

      if (cn12 != null) {
        this.CombinedNormals12 = cn12.name;
      } else {
        this.CombinedNormals12 = '';
      }
      if (cn34 != null) {
        this.CombinedNormals34 = cn34.name;
      } else {
        this.CombinedNormals34 = '';
      }
      if (cn56 != null) {
        this.CombinedNormals56 = cn56.name;
      } else {
        this.CombinedNormals56 = '';
      }

      this.FresnelIntensity = fresnelSettings.x;
      this.FresnelPower = fresnelSettings.y;
      this.FresnelBias = fresnelSettings.z;
    }

    ApplySettings(atsMaterial){
      if(!(atsMaterial instanceof Material)){
        throw new Error('Instance of Material not passed!');
      }

      atsMaterial.SetFloat ("_Splat0Tiling", this.Splat0Tiling);
			atsMaterial.SetFloat ("_Splat1Tiling", this.Splat1Tiling);
			atsMaterial.SetFloat ("_Splat2Tiling", this.Splat2Tiling);
			atsMaterial.SetFloat ("_Splat3Tiling", this.Splat3Tiling);
			atsMaterial.SetFloat ("_Splat4Tiling", this.Splat4Tiling);
			atsMaterial.SetFloat ("_Splat5Tiling", this.Splat5Tiling);

			atsMaterial.SetColor ("_ColTex1", this.Texture1Average);
			atsMaterial.SetColor ("_ColTex2", this.Texture2Average);
			atsMaterial.SetColor ("_ColTex3", this.Texture3Average);
			atsMaterial.SetColor ("_ColTex4", this.Texture4Average);
			atsMaterial.SetColor ("_ColTex5", this.Texture5Average);
			atsMaterial.SetColor ("_ColTex6", this.Texture6Average);
    }

    ApplyMaps(atsMaterial, chunkName, maps){
			this[methods].ApplyMap ("ColorOverlay", "_CustomColorMap", maps, atsMaterial);
			this[methods].ApplyMap ("NormalOverlay", "_TerrainNormalMap", maps, atsMaterial);
			this[methods].ApplyMap ("Splat1", "_Control", maps, atsMaterial);
			this[methods].ApplyMap ("Splat2", "_Control2nd", maps, atsMaterial);

      this[methods].ApplyMap ("Ground0", "_Splat0", maps, atsMaterial);
      this[methods].ApplyMap ("Ground1", "_Splat1", maps, atsMaterial);
      this[methods].ApplyMap ("Ground2", "_Splat2", maps, atsMaterial);
      this[methods].ApplyMap ("Ground3", "_Splat3", maps, atsMaterial);
      this[methods].ApplyMap ("Ground4", "_Splat4", maps, atsMaterial);
      this[methods].ApplyMap ("Ground5", "_Splat5", maps, atsMaterial);

      Mats.Get.GetTerrainGroundTexture (this.CombinedNormals12, function(cn12){
	      atsMaterial.SetTexture ("_CombinedNormal12", cn12);
      });

      Mats.Get.GetTerrainGroundTexture (this.CombinedNormals34, function(cn34){
	      atsMaterial.SetTexture ("_CombinedNormal34", cn34);
      });

      Mats.Get.GetTerrainGroundTexture (this.CombinedNormals56, function(cn56){
	      atsMaterial.SetTexture ("_CombinedNormal56", cn56);
      });
    }

    get CombinedNormals12(){
      return this[props].CombinedNormals12;
    }

    set CombinedNormals12(val){
      return this[props].CombinedNormals12 = (val + '');
    }

    get CombinedNormals34(){
      return this[props].CombinedNormals34;
    }

    set CombinedNormals34(val){
      return this[props].CombinedNormals34 = (val + '');
    }

    get CombinedNormals56(){
      return this[props].CombinedNormals56;
    }

    set CombinedNormals56(val){
      return this[props].CombinedNormals56 = (val + '');
    }

    get TerrainSpecColor(){
      return this[props].TerrainSpecColor;
    }

    set TerrainSpecColor(val){
      this[props].TerrainSpecColor.copyFrom(val);
    }

    get TerrainSpecPower(){
      return this[props].TerrainSpecPower;
    }

    set TerrainSpecPower(val){
      if(typeof(val) !== 'number'){
        throw new Error('TerrainSpecPower must be numeric');
      }
      return (this[props].TerrainSpecPower = val);
    }

    get Texture1Average(){
      return this[props].Texture1Average;
    }

    set Texture1Average(val){
      this[props].Texture1Average.copyFrom(val);
    }

    get Texture2Average(){
      return this[props].Texture2Average;
    }

    set Texture2Average(val){
      this[props].Texture2Average.copyFrom(val);
    }

    get Texture3Average(){
      return this[props].Texture3Average;
    }

    set Texture3Average(val){
      this[props].Texture3Average.copyFrom(val);
    }

    get Texture4Average(){
      return this[props].Texture4Average;
    }

    set Texture4Average(val){
      this[props].Texture4Average.copyFrom(val);
    }

    get Texture5Average(){
      return this[props].Texture5Average;
    }

    set Texture5Average(val){
      this[props].Texture5Average.copyFrom(val);
    }

    get Texture6Average(){
      return this[props].Texture6Average;
    }

    set Texture6Average(val){
      this[props].Texture6Average.copyFrom(val);
    }

    get Texture1Shininess(){
      return this[props].Texture1Shininess;
    }

    set Texture1Shininess(val){
      if(typeof(val) !== 'number'){
        throw new Error('Texture1Shininess must be a number!');
      }
      this[props].Texture1Shininess = +val;
    }

    get Texture2Shininess(){
      return this[props].Texture2Shininess;
    }

    set Texture2Shininess(val){
      if(typeof(val) !== 'number'){
        throw new Error('Texture2Shininess must be a number!');
      }
      this[props].Texture2Shininess = +val;
    }

    get Texture3Shininess(){
      return this[props].Texture3Shininess;
    }

    set Texture3Shininess(val){
      if(typeof(val) !== 'number'){
        throw new Error('Texture3Shininess must be a number!');
      }
      this[props].Texture3Shininess = +val;
    }

    get Texture4Shininess(){
      return this[props].Texture4Shininess;
    }

    set Texture4Shininess(val){
      if(typeof(val) !== 'number'){
        throw new Error('Texture4Shininess must be a number!');
      }
      this[props].Texture4Shininess = +val;
    }

    get Texture5Shininess(){
      return this[props].Texture5Shininess;
    }

    set Texture5Shininess(val){
      if(typeof(val) !== 'number'){
        throw new Error('Texture5Shininess must be a number!');
      }
      this[props].Texture5Shininess = +val;
    }

    get Texture6Shininess(){
      return this[props].Texture6Shininess;
    }

    set Texture6Shininess(val){
      if(typeof(val) !== 'number'){
        throw new Error('Texture6Shininess must be a number!');
      }
      this[props].Texture6Shininess = +val;
    }

    get MultiUV(){
      return this[props].MultiUV;
    }

    set MultiUV(val){
      if(typeof(val) !== 'number'){
        throw new Error('MultiUV must be a number!');
      }
      this[props].MultiUV = +val;
    }

    get Desaturation(){
      return this[props].Desaturation;
    }

    set Desaturation(val){
      if(typeof(val) !== 'number'){
        throw new Error('Desaturation must be a number!');
      }
      this[props].Desaturation = +val;
    }

    get SplattingDistance(){
      return this[props].SplattingDistance;
    }

    set SplattingDistance(val){
      if(typeof(val) !== 'number'){
        throw new Error('SplattingDistance must be a number!');
      }
      this[props].SplattingDistance = +val;
    }

    get Decal1CCStrength(){
      return this[props].Decal1CCStrength;
    }

    set Decal1CCStrength(val){
      if(typeof(val) !== 'number'){
        throw new Error('Decal1CCStrength must be a number!');
      }
      this[props].Decal1CCStrength = +val;
    }

    get Decal1Sharpness(){
      return this[props].Decal1Sharpness;
    }

    set Decal1Sharpness(val){
      if(typeof(val) !== 'number'){
        throw new Error('Decal1Sharpness must be a number!');
      }
      this[props].Decal1Sharpness = +val;
    }

    get Decal2CCStrength(){
      return this[props].Decal2CCStrength;
    }

    set Decal2CCStrength(val){
      if(typeof(val) !== 'number'){
        throw new Error('Decal2CCStrength must be a number!');
      }
      this[props].Decal2CCStrength = +val;
    }

    get Decal2Sharpness(){
      return this[props].Decal2Sharpness;
    }

    set Decal2Sharpness(val){
      if(typeof(val) !== 'number'){
        throw new Error('Decal2Sharpness must be a number!');
      }
      this[props].Decal2Sharpness = +val;
    }

    get Splat0Tiling(){
      return this[props].Splat0Tiling;
    }

    set Splat0Tiling(val){
      if(typeof(val) !== 'number'){
        throw new Error('Splat0Tiling must be a number!');
      }
      this[props].Splat0Tiling = +val;
    }

    get Splat1Tiling(){
      return this[props].Splat1Tiling;
    }

    set Splat1Tiling(val){
      if(typeof(val) !== 'number'){
        throw new Error('Splat1Tiling must be a number!');
      }
      this[props].Splat1Tiling = +val;
    }

    get Splat2Tiling(){
      return this[props].Splat2Tiling;
    }

    set Splat2Tiling(val){
      if(typeof(val) !== 'number'){
        throw new Error('Splat2Tiling must be a number!');
      }
      this[props].Splat2Tiling = +val;
    }

    get Splat3Tiling(){
      return this[props].Splat3Tiling;
    }

    set Splat3Tiling(val){
      if(typeof(val) !== 'number'){
        throw new Error('Splat3Tiling must be a number!');
      }
      this[props].Splat3Tiling = +val;
    }

    get Splat4Tiling(){
      return this[props].Splat4Tiling;
    }

    set Splat4Tiling(val){
      if(typeof(val) !== 'number'){
        throw new Error('Splat4Tiling must be a number!');
      }
      this[props].Splat4Tiling = +val;
    }

    get Splat5Tiling(){
      return this[props].Splat5Tiling;
    }

    set Splat5Tiling(val){
      if(typeof(val) !== 'number'){
        throw new Error('Splat5Tiling must be a number!');
      }
      this[props].Splat5Tiling = +val;
    }

    get FresnelIntensity(){
      return this[props].FresnelIntensity;
    }

    set FresnelIntensity(val){
      if(typeof(val) !== 'number'){
        throw new Error('FresnelIntensity must be a number!');
      }
      this[props].FresnelIntensity = +val;
    }

    get FresnelPower(){
      return this[props].FresnelPower;
    }

    set FresnelPower(val){
      if(typeof(val) !== 'number'){
        throw new Error('FresnelPower must be a number!');
      }
      this[props].FresnelPower = +val;
    }

    get FresnelBias(){
      return this[props].FresnelBias;
    }

    set FresnelBias(val){
      if(typeof(val) !== 'number'){
        throw new Error('FresnelBias must be a number!');
      }
      this[props].FresnelBias = +val;
    }

    static FromJXON(jxon, obj){
      return new Promise(function(resolve, reject){
        if(obj === undefined){
          obj = new TerrainkMaterialSettings();
        }else if(!(obj instanceof TerrainkMaterialSettings)){
          console.error(obj);
          reject(new Error(
            'Supplied object must be instanceof TerrainkMaterialSettings'
          ));
          return;
        }
        var
          promiseStack = []
        ;

        for(var prop of Object.keys(defaultProps)){
          if(obj[prop] instanceof SColor){
            promiseStack.push(SColor.FromJXON(jxon[prop], obj[prop]));
          }else{
            obj[prop] = jxon[prop];
          }
        }

        if(promiseStack.length > 0){
          Promise.all(promiseStack).then(function(){
            resolve(obj);
          }, reject);
        }else{
          resolve(obj);
        }

      });
    }
  }

  TerrainkMaterialSettings.prototype[props] = new WeakMap();
  for(var method in Object.keys(prototypeMethods)){
    TerrainkMaterialSettings.prototype[methods] = prototypeMethods[method];
  }

  return TerrainkMaterialSettings;
})();
