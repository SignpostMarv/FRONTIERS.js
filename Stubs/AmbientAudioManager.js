import ChunkAudioItem from './AmbientAudioManager/ChunkAudioItem.js';
import ChunkAudioSettings from './AmbientAudioManager/ChunkAudioSettings.js';

export default (function(){
  'use strict';

  class AmbientAudioManager{

    static get ChunkAudioItem(){
      return ChunkAudioItem;
    }

    static get ChunkAudioSettings(){
      return ChunkAudioSettings;
    }
  }

  return AmbientAudioManager;
})();
