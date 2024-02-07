if (getLevelVariable("cameraTarget") != ''){
if (JSON.parse(getLevelVariable("cameraTarget"))) {
    if (!getLevelVariable("lastP2Arrow") == ''){
        if(getLevelVariable("lastP2Arrow") == 'left'){
            setLevelVariable("cameraR",89);
        }else{
            if(getLevelVariable("lastP2Arrow") == 'right'){
                setLevelVariable("cameraR",91);
            }else{
                setLevelVariable("cameraR",90);
            }
        }
    if (getLevelVariable("originalOffsetp2x") == '') {
        setLevelVariable("originalOffsetp2x",JSON.stringify(JSON.parse(getLevelVariable("player2Data")).cameraX));
        setLevelVariable("originalOffsetp2y",JSON.stringify(JSON.parse(getLevelVariable("player2Data")).cameraY));
    }
    var offsetY = JSON.parse(getLevelVariable("player2Data")).offsets[getLevelVariable("lastP2Arrow")].y;
    var offsetX = JSON.parse(getLevelVariable("player2Data")).offsets[getLevelVariable("lastP2Arrow")].x;
    var jsontemp = JSON.parse(getLevelVariable("player2Data"));
    if (jsontemp.flipped == true){
    jsontemp.cameraX = Number(getLevelVariable("originalOffsetp2x")) + (Number(offsetX) / 4)
    } else {
    jsontemp.cameraX = Number(getLevelVariable("originalOffsetp2x")) + (0 - Number(offsetX) / 4)
    }
    jsontemp.cameraY = Number(getLevelVariable("originalOffsetp2y")) + (0 - Number(offsetY) / 4)
    setLevelVariable("player2Data",JSON.stringify(jsontemp));
    }
} else {
    if (!getLevelVariable("lastP1Arrow") == ''){
        if(getLevelVariable("lastP1Arrow") == 'left'){
            setLevelVariable("cameraR",89);
        }else{
            if(getLevelVariable("lastP1Arrow") == 'right'){
                setLevelVariable("cameraR",91);
            }else{
                setLevelVariable("cameraR",90);
            }
        }
        if (getLevelVariable("originalOffsetp1x") == '') {
            setLevelVariable("originalOffsetp1x",JSON.stringify(JSON.parse(getLevelVariable("player1Data")).cameraX));
            setLevelVariable("originalOffsetp1y",JSON.stringify(JSON.parse(getLevelVariable("player1Data")).cameraY));
        }
        var offsetY = JSON.parse(getLevelVariable("player1Data")).offsets[getLevelVariable("lastP1Arrow")].y;
        var offsetX = JSON.parse(getLevelVariable("player1Data")).offsets[getLevelVariable("lastP1Arrow")].x;
        var jsontemp = JSON.parse(getLevelVariable("player1Data"));
        if (jsontemp.flipped == true){
            jsontemp.cameraX = Number(getLevelVariable("originalOffsetp1x")) + (Number(offsetX) / 4)
            } else {
            jsontemp.cameraX = Number(getLevelVariable("originalOffsetp1x")) + (0 - Number(offsetX) / 4)
            }
        jsontemp.cameraY = Number(getLevelVariable("originalOffsetp1y")) + (0 - Number(offsetY) / 4)
        setLevelVariable("player1Data",JSON.stringify(jsontemp));
        }
};};