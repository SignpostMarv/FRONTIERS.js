onFrontiersReady(function(){
  'use strict';
  console.log('FRONTIERS.JS is loaded!');
  var
    form = document.querySelector('form'),
    directory = form.querySelector('[type="url"]'),
    resolution = form.querySelector('#resolution'),
    resolutionOut = form.querySelector('[for="resolution"]'),
    texturesGoHere = document.querySelector('#textures-go-here'),
    path = location.pathname.split('/'),
    failureLogger = function(failure){
      alert('Error!');
      console.error(failure);
    }
  ;
  path.pop();
  path.pop();
  path.push('Data');
  path.unshift(location.hostname);
  directory.value = location.protocol + '//' + path.join('/');
  setDisabled(form, false);
  function doStuff(){
    if(
      (resolution.value & (resolution.value - 1)) !== 0
    ){
      alert('resolution must be power of two!');
      return;
    }
    setDisabled(form, true);
    while(texturesGoHere.hasChildNodes()){
      texturesGoHere.removeChild(texturesGoHere.firstChild);
    }
    Frontiers.Data.GameData.IO.InitializeSystemPaths(
      directory.value
    ).catch(function(e){
      alert('Error!');
      console.error(e);
    }).then(function(){
      Frontiers.Data.GameData.IO.LoadWorld('FRONTIERS').then(function(world){
        Promise.all(world.DefaultRevealedLocations.map(
          function(revealedLocation){
            return Frontiers.Mods.Get.Runtime.LoadMod(
              'Chunk',
              revealedLocation.ChunkName
            ).then(function(ChunkState){
              return Frontiers.Data.GameData.IO.LoadTerrainMap(
                parseInt(resolution.value, 10|0),
                false,
                true,
                ChunkState.Name,
                'ColorOverlay',
                Frontiers.DataType.World
              ).then(function(e){
                var
                  div = document.createElement('div')
                ;
                div.setAttribute('title', revealedLocation.FullPath);
                div.appendChild(e.canvas);
                return div;
              }, failureLogger);
            });
          }
        )).then(function(divs){
          for(var div of divs){
            texturesGoHere.appendChild(div);
          }
          setDisabled(form, false);
        }, failureLogger);
      });
    });
  }
  form.addEventListener('submit', function(e){
    e.preventDefault();
    setDisabled(this, true);
    doStuff();
  });
  resolution.addEventListener('change', function(){
    resolutionOut.textContent = this.value;
  });
  doStuff();
}, function(failure){
  console.error(failure);
});
