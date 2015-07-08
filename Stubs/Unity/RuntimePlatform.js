export default (function(){
  'use strict';

  class RuntimePlatform{
    static get ES2015(){
      return -1|0;
    }

    static get OSXEditor(){ //	In the Unity editor on Mac OS X.
      return 0|0;
    }

    static get OSXPlayer(){ //	In the player on Mac OS X.
      return 1|0;
    }

    static get WindowsPlayer(){ //	In the player on Windows.
      return 2|0;
    }

    static get OSXWebPlayer(){ //	In the web player on Mac OS X.
      return 3|0;
    }

    static get OSXDashboardPlayer(){ //	In the Dashboard widget on Mac OS X.
      return 4|0;
    }

    static get WindowsWebPlayer(){ //	In the web player on Windows.
      return 5|0;
    }

    static get WindowsEditor(){ //	In the Unity editor on Windows.
      return 6|0;
    }

    static get IPhonePlayer(){ //	In the player on the iPhone.
      return 7|0;
    }

    static get XBOX360(){ //	In the player on the XBOX360.
      return 8|0;
    }

    static get PS3(){ //	In the player on the Play Station 3.
      return 9|0;
    }

    static get Android(){ //	In the player on Android devices.
      return 10|0;
    }

    static get LinuxPlayer(){ //	In the player on Linux.
      return 11|0;
    }

    static get WebGLPlayer(){ //	In the player on WebGL?
      return 12|0;
    }

    static get WSAPlayerX86(){ //	In the player on Windows Store Apps when CPU architecture is X86.
      return 13|0;
    }

    static get WSAPlayerX64(){ //	In the player on Windows Store Apps when CPU architecture is X64.
      return 14|0;
    }

    static get WSAPlayerARM(){ //	In the player on Windows Store Apps when CPU architecture is ARM.
      return 15|0;
    }

    static get WP8Player(){ //	In the player on Windows Phone 8 device.
      return 16|0;
    }

    static get TizenPlayer(){ //	In the player on Tizen.
      return 17|0;
    }

    static get PSP2(){ //	In the player on the PS Vita.
      return 18|0;
    }

    static get PS4(){ //	In the player on the Playstation 4.
      return 19|0;
    }

    static get XboxOne(){ //	In the player on Xbox One.
      return 20|0;
    }

    static get SamsungTVPlayer(){ //	In the player on Samsung Smart TV.
      return 21|0;
    }

  }

  return RuntimePlatform;
})();
