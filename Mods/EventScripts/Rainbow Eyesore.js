var timeLimit = Number(getLevelVariable("value1"))/1000;
const delay = ms => new Promise(res => setTimeout(res, ms));
const lsd = async () => {
vm.runtime.ext_theshovelcanvaseffects.seteffect({"EFFECT":"color shift","NUMBER":Math.abs(Math.cos(Date.now()/1000))*500})
await delay (1);
if(Number(vm.runtime.ext_lmsTimers.valueOfTimer({"TIMER":"songTimer"}))>timeLimit ||Number(vm.runtime.ext_lmsTimers.valueOfTimer({"TIMER":"songTimer"}))==0){
    vm.runtime.ext_theshovelcanvaseffects.seteffect({"EFFECT":"color shift","NUMBER":0})
}else{
    lsd();
}
}
lsd();
