onFrontiersReady(function(){
  'use strict';
  console.log('FRONTIERS.JS is loaded!');
  function setDisabled(isDisabled){
    var
      disabledStuffs = this.querySelectorAll('*[disabled]'),
      i = 0|0
    ;
    for(i=0;i<disabledStuffs.length;++i){
      disabledStuffs[i].disabled = isDisabled;
    }
  }
  var
    form = document.querySelector('form'),
    directory = form.querySelector('[type="url"]'),
    path = location.pathname.split('/')
  ;
  path.pop();
  path.pop();
  path.push('Data');
  path.unshift(location.hostname);
  directory.value = location.protocol + '//' + path.join('/');
  setDisabled.call(form, false);
  function doStuff(){
    Frontiers.Data.GameData.IO.InitializeSystemPaths(
      directory.value
    ).catch(function(e){
      alert('Error!');
      console.error(e);
    }).then(function(e){
      Frontiers.Data.GameData.IO.LoadTerrainHeights(
        513,
        'C-0-0-100',
        'Raw16Mac',
        Frontiers.DataType.World
      ).then(function(heights){
        console.log(heights); // an array of Float32Array instances
      });
      Frontiers.Data.GameData.IO.LoadTerrainCanvas(
        513,
        'C-0-0-100',
        'Raw16Mac',
        Frontiers.DataType.World
      ).then(function(canvas){
        document.body.appendChild(canvas);
      });
    });
  }
  form.addEventListener('submit', function(e){
    e.preventDefault();
    setDisabled.call(this, true);
    doStuff();
  });
  doStuff();
}, function(failure){
  console.error(failure);
});
