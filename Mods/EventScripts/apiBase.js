//This code has to ALWAYS retrun no errors and be formatted correctly or
//the loader wont be able to handle the code properly
function getLevelVariable(VAR) {
    if (vm.runtime.ext_lmsTempVars2.getRuntimeVariable({
            "VAR": "isHost?"
        }) == '1') {
        if (VAR == 'lastP2Arrow') {
            VAR = 'lastP1Arrow'
        } else {
            if (VAR == 'lastP1Arrow') {
                VAR = 'lastP2Arrow'
            }
        }
    }
    return vm.runtime.ext_lmsTempVars2.getRuntimeVariable({
        "VAR": VAR
    });
};

function setLevelVariable(VAR,DATA) {
    vm.runtime.ext_lmsTempVars2.setRuntimeVariable({
        "VAR": VAR,
        "STRING": DATA
    });
};
function broadcast(NAME) {
    vm.runtime.startHats('event_whenbroadcastreceived',{ BROADCAST_OPTION: NAME })
};
try{
var valueObject = JSON.parse(getLevelVariable("value1"));
}
catch(err){};
var scriptSession = getLevelVariable("sessionID");

