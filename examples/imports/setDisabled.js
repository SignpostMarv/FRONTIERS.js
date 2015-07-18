window.setDisabled = function(queryOn, isDisabled){
  var
    disabledStuffs = queryOn.querySelectorAll('*[disabled]'),
    i = 0|0
  ;
  for(i=0;i<disabledStuffs.length;++i){
    disabledStuffs[i].disabled = isDisabled;
  }
};
