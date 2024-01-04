const jsontemp = JSON.parse(getLevelVariable("value1"));
if(jsontemp.main == true){
    if (jsontemp.characterName == "enemy"){
        var dataPlace = "player1Data";
    }else{
        var dataPlace = "player2Data";
        }
    }
    else {
        var dataPlace = "player"+jsontemp.characterName+"Data";
    }

    var tempJSON = JSON.parse(getLevelVariable(dataPlace));
    tempJSON.x = JSON.parse(getLevelVariable("value2")).x;
    tempJSON.y = JSON.parse(getLevelVariable("value2")).y;

vm.runtime.ext_lmsTempVars2.setRuntimeVariable({ "VAR": dataPlace,
"STRING": JSON.stringify(tempJSON)});