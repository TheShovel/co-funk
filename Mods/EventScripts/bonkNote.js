const delay = ms => new Promise(res => setTimeout(res, ms));
const bonk = async () => {
    vm.runtime.ext_lmsTempVars2.setRuntimeVariable({"VAR":"songSpeed","STRING":getLevelVariable("value1")});
    await delay (Number(getLevelVariable("value2"))*1000);
    vm.runtime.ext_lmsTempVars2.setRuntimeVariable({"VAR":"songSpeed","STRING":getLevelVariable("realSpeed")});
  };
bonk();
