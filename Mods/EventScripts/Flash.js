const flashTime = Number(getLevelVariable("value1"))*100;
const delay = ms => new Promise(res => setTimeout(res, ms));
vm.runtime.ext_theshovelcanvaseffects.changeEffect({"EFFECT":"brightness","NUMBER":100});
const flash = async () => {
  vm.runtime.ext_theshovelcanvaseffects.changeEffect({"EFFECT":"brightness","NUMBER":-2});
    await delay (flashTime);
    if(vm.runtime.ext_theshovelcanvaseffects.geteffect({"EFFECT":"brightness"}) > 100){
      flash();
    } else {
      vm.runtime.ext_theshovelcanvaseffects.seteffect({"EFFECT":"brightness","NUMBER":100})
    };
  };
flash();
