import applyDefaultPropsSpecToObject from '../../../../../Utilities/applyDefaultPropsSpecToObject.js';
import Flags from '../../../Utilities/Flags.js';
import IStackOwner from '../../../../../Stubs/Frontiers.World/IStackOwner.js';
import Action from '../../../../../Stubs/System/Action.js';
import WIGroupLoadState from '../../../GameWorld/WIScripts/WIGroup/WIGroup.js';

export default (function(){
  'use strict';

  var
    props = Symbol('props'),
    staticProps = Symbol('props'),
    defaultProps = {
      Props: function(){
        return;
      },
      ParentGroup: function(){
        return;
      },
      ParentStructure: function(){
        return;
      },
      Chunk: function(){
        return;
      },
      ChildGroups: function(){
        return [];
      },
      ChildItems: function(){
        return new WeakSet();
      },
      tr: function(){
        return;
      },
      AttemptedToUnload: function(){
        return false;
      },
      SaveOnUnload: function(){
        return false;
      },
      mDestroyed: function(){
        return false;
      },
      mOwner: function(){
        return;
      },
      mLoadState: function(){
        return;
      },
      OnLoadStateChange: function(){
        return;
      },
      OnChildItemAdded: function(){
        return;
      },
      OnChildItemRemoved: function(){
        return;
      },
      mSavedState: function(){
        return false;
      },
      mChildItemsToUpdateChanged: function(){
        return false;
      },
      mChildItemsToUpdate: function(){
        return [];
      },
    }
  ;

  class WIGroup{

    constructor(){
      applyDefaultPropsSpecToObject(this, props, defaultProps);
    }

    get Path(){
      return this[props].Props.PathName;
    }

    get FileName(){
      return this[props].Props.FileName;
    }

    get SaveOnUnload(){
      return this[props].SaveOnUnload;
    }

    set SaveOnUnload(val){
      this[props].SaveOnUnload = !!val;
    }

    GetActionNodes(){
      return this.GetParentChunk().GetNodesForLocation(this.Path);
    }

    get IsDestroyed(){
      return this[props].mDestroyed;
    }

    get Owner(){
      var
        owner
      ;
      if(!!this[props].mOwner){
        owner = this[props].mOwner;
      }else if(!this.IsRoot){
        owner = this.ParentGroup.Owner;
      }
      return owner;
    }

    set Owner(val){
      if(!(val instanceof IStackOwner)){
        throw new Error('Owner must be instanceof IStackOwner');
      }
      this[props].mOwner = val;
    }

    Is(loadState){
      if(typeof(loadState) === 'number'){
        loadState = new WIGroupLoadState(loadState);
      }
      if(!(loadState instanceof WIGroupLoadState)){
        throw new Error('loadState must be instanceof WIGroupLoadState');
      }
      return Flags.Check(
        this[props].mLoadState.toUint(),
        loadState.toUint(),
        Flags.CheckType.MatchAny
      );
    }

    get LoadState(){
      return this[props].mLoadState;
    }

    set LoadState(val){
      if(this[props].mLoadState !== val){
        this[props].mLoadState = val;
        this.RefreshRequest();
      }
      this.OnLoadStateChange.SafeInvoke();
    }

    get OnLoadStateChange(){
      return this[props].OnLoadStateChange;
    }

    set OnLoadStateChange(val){
      if(!(val instanceof Action)){
        throw new Error(
          'OnLoadStateChange must be an instanceof Action'
        );
      }
      this[props].OnLoadStateChange = val;
    }

    get OnChildItemAdded(){
      return this[props].OnChildItemAdded;
    }

    set OnChildItemAdded(val){
      if(!(val instanceof Action)){
        throw new Error(
          'OnChildItemAdded must be an instanceof Action'
        );
      }
      this[props].OnChildItemAdded = val;
    }

    get OnChildItemRemoved(){
      return this[props].OnChildItemRemoved;
    }

    set OnChildItemRemoved(val){
      if(!(val instanceof Action)){
        throw new Error(
          'OnChildItemRemoved must be an instanceof Action'
        );
      }
      this[props].OnChildItemRemoved = val;
    }

    UpdateDirty(){
      this[props].mChildItemsToUpdateChanged = false;
      var
        announceLoad = this.Is(
          WIGroupLoadState.Loaded | WIGroupLoadState.Loading
        ),
        continueUpdating = true,
        childItemsToUpdate = this[props].mChildItemsToUpdate[Symbol.iterator]
      ;
      for(var childItemToUpdate of childItemsToUpdate){
        if(this[props].mChildItemsToUpdateChanged){
          continueUpdating = false;
          return;
        }
        childItemToUpdate.Group = this;
        childItemToUpdate.OnAddedToGroup.SafeInvoke();
        if(announceLoad){
          childItemToUpdate.OnGroupLoaded.SafeInvoke();
        }
      }
      this[props].mChildItemsToUpdate.Clear();
    }

    OnDestroy(){
      this[props].mDestroyed = true;
    }

    static get gPathJoinChar(){
      return WIGroup.gPathJoinString();
    }

    static set gPathJoinChar(val){
      return WIGroup.gPathJoinString(val);
    }

    static get gPathJoinString(){
      return WIGroup[staticProps].gPathJoinString;
    }

    static set gPathJoinString(val){
      WIGroup[staticProps].gPathJoinString = (val + '');
    }
  }

  WIGroup[staticProps] = {
    gPathJoinString: '\\',
  };

  return WIGroup;
})();
