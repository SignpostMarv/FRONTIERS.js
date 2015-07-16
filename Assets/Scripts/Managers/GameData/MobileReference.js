import applyDefaultPropsSpecToObject from '../../../../Utilities/applyDefaultPropsSpecToObject.js';
import WIGroup from '../../GameWorld/WIScripts/WIGroup/WIGroup.js';
import Path from '../../../../Stubs/System/IO/Path.js';
import Debug from '../../../../Stubs/Unity/Debug.js';

export default (function(){
  'use strict';

  var
    props = Symbol('props'),
    defaultProps = {
      FileName: function(){
        return '';
      },
      GroupPath: function(){
        return '';
      },
      mChunkName: function(){
        return '';
      },
      mFullPath: function(){
        return '';
      },
      mChunkID: function(){
        return -1;
      }
    }
  ;

  class MobileReference{

    constructor(fileName, groupPath){
      applyDefaultPropsSpecToObject(this, props, defaultProps);
      if(typeof(fileName) === 'string'){
        if(typeof(fileName) !== 'string'){
          this.FullPath = fileName;
        }else{
          this.FileName = fileName;
          this.GroupPath = groupPath;
        }
      }
    }

    static get Empty(){
      var
        empty = new MobileReference()
      ;
      empty.FileName = '';
      empty.GroupPath = '';

      return empty;
    }

    Refresh(){
      this.mFullPath = (
        this.GroupPath +
        WIGroup.gPathJoinString +
        this.FileName
      );
    }

    get FileName(){
      return this[props].FileName;
    }

    set FileName(val){
      this[props].FileName = (val + '');
    }

    get GroupPath(){
      return this[props].GroupPath;
    }

    set GroupPath(val){
      this[props].GroupPath = (val + '');
    }

    AppendLocation(locationName){
      return new MobileReference(
        locationName,
        this.GroupPath + '\\' + this.FileName
      );
    }

    get FullPath(){
      if(!this[props].mFullPath){
        this[props].mFullPath = (
          this.GroupPath +
          WIGroup.gPathJoinString +
          this.FileName
        );
      }

      return this[props].mFullPath;
    }

    set FullPath(val){
      if(val !== this[props].mFullPath){
        this[props].mFullPath = (val + '');
        this.GroupPath = Path.GetDirectoryName(this[props].mFullPath);
        this.FileName = Path.GetFileName(this[props].mFullPath);
      }
    }

    get ChunkName(){
      if(!this[props].mChunkName){
        try{
          this[props].mChunkName = this.GroupPath.replace('Root\\World\\', '');
          this[props].mChunkName = (
            this[props].mChunkName.split('\\').filter(
              function(str){
                return !!str;
              }
            ).shift()
          );
        }catch(e){
          Debug.LogException(e);
        }

      }
      return this[props].mChunkName;
    }

    get ChunkID(){
      if(this[props].mChunkID < 0){
        var
          splitChunkName = this.ChunkName.split('-').filter(function(e){
            return !!e;
          })
        ;
        if(splitChunkName.length > 3){
          this[props].mChunkID = parseInt(splitChunkName[3], 10|0);
        }else{
          Debug.LogError(
            'Error when splitting mobile reference for chunk ID: ' +
            (this.ChunkName + '')
          );
        }
      }

      return this[props].mChunkID;
    }

    static IsNullOrEmpty(mr){
      return !mr || !mr.FileName || !mr.GroupPath;
    }

    Equals(other){
      if(
        !other ||
        !(other instanceof MobileReference)
      ){
        return false;
      }

      return ((this === other) || (this.FullPath === other.FullPath));
    }

    CompareTo(other){
      if(!(other instanceof MobileReference)){
        throw new Error(
          'Can only compare to other instances of MobileReference'
        );
      }
      return this.FullPath.localeCompare(other.FullPath);
    }

    CopyFrom(other){
      if(!(other instanceof MobileReference)){
        throw new Error(
          'Can only copy from other instances of MobileReference'
        );
      }
      Object.keys(defaultProps).forEach(prop => {
        this[prop] = other[prop];
      });
    }

    static FromJXON(jxon){
      return new Promise(function(resolve, reject){
        if(
          'MobileReference' in jxon &&
          Object.keys(jxon).length === 1
        ){
          if(jxon.MobileReference instanceof Array){
            Promise.all(jxon.MobileReference.map(function(e){
              return MobileReference.FromJXON(e);
            })).then(resolve).catch(reject);
          }else{
            reject(new Error(
              'MobileReference array was expected but not found!'
            ));
          }
        }else{
          if('FileName' in jxon && 'GroupPath' in jxon){
            resolve(new MobileReference(jxon.FileName, jxon.GroupPath));
          }else if(!('FileName' in jxon)){
            reject(new Error('jxon object missing filename'));
          }else{
            reject(new Error('jxon object missing group path'));
          }
        }
      });
    }
  }

  return MobileReference;
})();
