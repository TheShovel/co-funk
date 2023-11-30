if (JSON.parse(getLevelVariable("section")).mustHitSection) {
    if (!getLevelVariable("lastP2Arrow") == ''){
    if (getLevelVariable("originalOffsetp2x") == '') {
        vm.runtime.ext_lmsTempVars2.setRuntimeVariable({ "VAR": "originalOffsetp2x", "STRING": JSON.stringify(JSON.parse(getLevelVariable("player2Data")).cameraX)});
        vm.runtime.ext_lmsTempVars2.setRuntimeVariable({ "VAR": "originalOffsetp2y", "STRING": JSON.stringify(JSON.parse(getLevelVariable("player2Data")).cameraY)});
    }
    var offsetY = JSON.parse(getLevelVariable("player2Data")).offsets[getLevelVariable("lastP2Arrow")].y;
    var offsetX = JSON.parse(getLevelVariable("player2Data")).offsets[getLevelVariable("lastP2Arrow")].x;
    var jsontemp = JSON.parse(getLevelVariable("player2Data"))
    jsontemp.cameraX = Number(getLevelVariable("originalOffsetp2x")) + (0 - Number(offsetX) / 4)
    jsontemp.cameraY = Number(getLevelVariable("originalOffsetp2y")) + (0 - Number(offsetY) / 4)
    vm.runtime.ext_lmsTempVars2.setRuntimeVariable({ "VAR": "player2Data", "STRING": JSON.stringify(jsontemp)});
    }
} else {
    if (!getLevelVariable("lastP1Arrow") == ''){
        if (getLevelVariable("originalOffsetp1x") == '') {
            vm.runtime.ext_lmsTempVars2.setRuntimeVariable({ "VAR": "originalOffsetp1x", "STRING": JSON.stringify(JSON.parse(getLevelVariable("player1Data")).cameraX)});
            vm.runtime.ext_lmsTempVars2.setRuntimeVariable({ "VAR": "originalOffsetp1y", "STRING": JSON.stringify(JSON.parse(getLevelVariable("player1Data")).cameraY)});
        }
        var offsetY = JSON.parse(getLevelVariable("player1Data")).offsets[getLevelVariable("lastP1Arrow")].y;
        var offsetX = JSON.parse(getLevelVariable("player1Data")).offsets[getLevelVariable("lastP1Arrow")].x;
        var jsontemp = JSON.parse(getLevelVariable("player1Data"))
        jsontemp.cameraX = Number(getLevelVariable("originalOffsetp1x")) + (0 - Number(offsetX) / 4)
        jsontemp.cameraY = Number(getLevelVariable("originalOffsetp1y")) + (0 - Number(offsetY) / 4)
        vm.runtime.ext_lmsTempVars2.setRuntimeVariable({ "VAR": "player1Data", "STRING": JSON.stringify(jsontemp)});
        }
};