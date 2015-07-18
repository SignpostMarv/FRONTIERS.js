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
      Frontiers.Data.GameData.IO.LoadWorld('FRONTIERS').then(function(world){
        Promise.all(world.DefaultRevealedLocations.map(
          function(revealedLocation){
            return new Promise(function(resolve){
              Frontiers.Data.GameData.IO.LoadTerrainCanvas(
                513,
                revealedLocation.ChunkName,
                'Raw16Mac',
                Frontiers.DataType.World
              ).then(function(canvas){
                var
                  div = document.createElement('div')
                ;
                div.setAttribute('title', revealedLocation.FullPath);
                div.appendChild(canvas);
                resolve(div);
              });
            });
          }
        )).then(function(canvases){
          canvases.sort(function(a, b){
            var
              aLoc = canvases.indexOf(a),
              bLoc = canvases.indexOf(b)
            ;
            if(aLoc < 0 && bLoc < 0){
              return 0;
            }else if(aLoc < 0 && bLoc >= 0){
              return 1;
            }else if(aLoc >= 0 && bLoc < 0){
              return -1;
            }
            aLoc = world.DefaultRevealedLocations[aLoc];
            bLoc = world.DefaultRevealedLocations[bLoc];
            var
              aChunkNameParts = aLoc.ChunkName.split('-'),
              bChunkNameParts = bLoc.ChunkName.split('-'),
              aNum = 0|0,
              bNum = 0|0
            ;
            for(var i=0;i<aChunkNameParts.length;++i){
              if(
                /^[0-9]+$/.test(aChunkNameParts[i]) &&
                /^[0-9]+$/.test(bChunkNameParts[i])
              ){
                aNum = parseInt(aChunkNameParts[i], 10|0);
                bNum = parseInt(aChunkNameParts[i], 10|0);
                if(aNum !== bNum){
                  return aNum - bNum;
                }
              }
            }
            return a.title.localeCompare(b.title);
          });
          for(var canvas of canvases){
            document.body.appendChild(canvas);
          }
        });
        window.world = world;
      }, function(e){
        alert('Error!');
        console.error(e);
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
