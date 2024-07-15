console.log("Stage session scriptID:" + scriptSession)
const delay = ms => new Promise(res => setTimeout(res, ms));
const check = async () => {
    await delay(3);
    if (getLevelVariable("sessionID") == scriptSession) {
        if (getLevelVariable("lastP2Arrow") == "weekend-1-blockhigh") {
            setLevelVariable("lastP2Arrow") = "blockHit";
            setLevelVariable("lastP1Arrow") = "punchHigh";
            broadcast("animateP1");
            broadcast("animateP2");
        }
        check();
    }
};
check();