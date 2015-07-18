onFrontiersReady(function(){
  'use strict';
  console.log('FRONTIERS.JS is loaded!');
  function setDisabled(queryOn, isDisabled){
    var
      disabledStuffs = queryOn.querySelectorAll('*[disabled]'),
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
  setDisabled(form, false);
  function doStuff(){
    Frontiers.Data.GameData.IO.InitializeSystemPaths(
      directory.value
    ).catch(function(e){
      alert('Error!');
      console.error(e);
    }).then(function(){
      Frontiers.Mods.Get.Runtime.LoadMod('Chunk', 'C-0-0-100').then(
        function(response){
          console.log(response);
        },
        function(failure){
          alert('Error!');
          console.error(failure);
        }
      );
    });
  }
  form.addEventListener('submit', function(e){
    e.preventDefault();
    setDisabled(this, true);
    doStuff();
  });
  doStuff();
}, function(failure){
  console.error(failure);
});
