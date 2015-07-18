onFrontiersReady(function(){
  'use strict';
  var
    form = document.querySelector('form'),
    directory = form.querySelector('[type="url"]'),
    xTiles = form.querySelector('#x-tiles'),
    xTilesOut = form.querySelector('output[for="x-tiles"]'),
    zTiles = form.querySelector('#z-tiles'),
    zTilesOut = form.querySelector('output[for="z-tiles"]'),
    path = location.pathname.split('/')
  ;
  path.pop();
  path.pop();
  path.push('Data');
  path.unshift(location.hostname);
  directory.value = location.protocol + '//' + path.join('/');
  setDisabled(form, false);
  xTiles.addEventListener('change', function(){
    xTilesOut.textContent = this.value;
  });
  zTiles.addEventListener('change', function(){
    zTilesOut.textContent = this.value;
  });
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var
      resolution = 513,
      chunkName = 'C-0-0-100',
      filename = 'Raw16Mac',
      datatype = Frontiers.DataType.World,
      table = document.createElement('table'),
      makeGetTileCanvas = function(goHere){
        return function(tile){
          tile.Canvas().then(function(canvas){
            goHere.appendChild(canvas);
          });
        };
      },
      x = 0|0,
      z = 0|0,
      xTilesVal = xTiles.value,
      zTilesVal = zTiles.value,
      sw = ((resolution - 1) / xTilesVal) + 1,
      sh = ((resolution - 1) / zTilesVal) + 1
    ;
    if(
      (xTilesVal & (xTilesVal - 1)) !== 0 ||
      (zTilesVal & (zTilesVal - 1)) !== 0
    ){
      alert('tiles must be power of two!');
      return;
    }
    setDisabled(this, true);
    Frontiers.Data.GameData.IO.InitializeSystemPaths(
      directory.value
    ).catch(function(e){
      alert('Error!');
      console.error(e);
    }).then(function(){
      var
        tables = document.querySelectorAll('body > table'),
        i=0|0
      ;
      for(i=0;i<tables.length;++i){
        document.body.removeChild(tables[i]);
      }
      document.body.appendChild(table);
      for(z=0;z<zTilesVal;++z){
        var
          tr = document.createElement('tr')
        ;
        table.appendChild(tr);
        for(x=0;x<xTilesVal;++x){
          var
            td = document.createElement('td')
          ;
          tr.appendChild(td);
          Frontiers.Data.GameData.IO.LoadTerrainTile(
            (x * (resolution - 1) / xTilesVal),
            (z * (resolution - 1) / zTilesVal),
            sw,
            sh,
            resolution,
            chunkName,
            filename,
            datatype
          ).then(makeGetTileCanvas(td));
        }
      }
    });
  });
}, function(failure){
  console.error(failure);
});
