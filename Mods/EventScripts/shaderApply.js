if (getLevelVariable("disableShaders") != "true"){
var effect = '';
vm.runtime.ext_SPspriteEffects.setSpriteEffect({"EFFECT":getLevelVariable("value1"),"NUM":getLevelVariable("value2")}).then(result =>
{effect = result; 
    vm.runtime.ext_SPspriteEffects.addCanvasFilter({"FILTER":effect,"NAME":Math.random()+''})
});};