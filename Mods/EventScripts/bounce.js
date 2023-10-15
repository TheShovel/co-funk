if(getLevelVariable("value1") == 1){
  var direction = -2
} else {
  var direction = 2
}


const delay = ms => new Promise(res => setTimeout(res, ms));
const rotate = async () => {
  vm.runtime.ext_theshovelcanvaseffects.seteffect({"EFFECT":"rotation","NUMBER":direction});
    await delay (1000);
    vm.runtime.ext_theshovelcanvaseffects.seteffect({"EFFECT":"rotation","NUMBER":0});
  };
  rotate();
