//This code has to ALWAYS retrun no errors and be formatted correctly or
//the loader wont be able to handle the code properly
function getLevelVariable(VAR) {
    if (vm.runtime.variables["isHost?"] == '1') {
        if (VAR == 'lastP2Arrow') {
            VAR = 'lastP1Arrow'
        } else {
            if (VAR == 'lastP1Arrow') {
                VAR = 'lastP2Arrow'
            }
        }
    }
    return vm.runtime.variables[VAR];
};

function setLevelVariable(VAR, DATA) {
    vm.runtime.variables[VAR] = DATA;
};

function broadcast(NAME) {
    vm.runtime.startHats('event_whenbroadcastreceived', {
        BROADCAST_OPTION: NAME
    })
};
try {
    var valueObject = JSON.parse(getLevelVariable("value1"));
} catch (err) {};
var scriptSession = getLevelVariable("sessionID");