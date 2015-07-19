onFrontiersReady(function(){
  'use strict';
  console.log('frontiers loaded');
  var
    renderer = new Frontiers.Renderers.THREE(
      THREE.WebGLRenderer,
      1280,
      720
    )
  ;
  renderer.Controls = THREE.TrackballControls;
  renderer.Render();
  window.renderer = renderer;
  document.body.appendChild(renderer.RenderSurface);
  Frontiers.Data.GameData.IO.InitializeSystemPaths(
    (function(){
      var
        path = location.pathname.split('/')
      ;
      path.pop();
      path.pop();
      path.push('src');
      path.push('Data');
      path.unshift(location.hostname);
      return location.protocol + '//' + path.join('/');
    })()
  ).then(function(){
    Frontiers.Data.GameData.IO.LoadWorld('FRONTIERS').then(function(world){
      window.world = world;
      Promise.all(world.DefaultRevealedLocations.map(function(revealedLocation){
        return renderer.AddObject(revealedLocation);
      })).then(function(revealedLocations){
        console.log(
          'should be done now',
          revealedLocations
        );
        renderer.Play();
        renderer.Camera.position.x = 15000;
        renderer.Camera.position.z = 15000;
      }, function(failure){
        console.error(failure);
      });
    });
  });
});
