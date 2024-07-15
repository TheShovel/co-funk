console.log("Stage session scriptID:" + scriptSession)
let lastArrow = "";
let lastArrow1 = "";
let lastArrow2 = "";
let oldLastArrow ="";
const delay = ms => new Promise(res => setTimeout(res, ms));
const check = async () => {
    await delay(10);
    if (getLevelVariable("sessionID") == scriptSession) {
        if(lastArrow1 != getLevelVariable("P1Anim")){
            lastArrow1 = getLevelVariable("P1Anim");
            lastArrow = lastArrow1;
        }
        if(lastArrow2 != getLevelVariable("P2Anim")){
            lastArrow2 = getLevelVariable("P2Anim");
            lastArrow = lastArrow2;
        }
        if(oldLastArrow != lastArrow){
            oldLastArrow = lastArrow;
        switch (lastArrow) {
            case "weekend-1-blockhigh":
                setLevelVariable("lastP2Arrow", "blockHit");
                setLevelVariable("lastP1Arrow", "punchHigh");
                broadcast("animateP1");
                broadcast("animateP2");
                break;
            case "weekend-1-punchlowblocked":
                setLevelVariable("lastP2Arrow", "punchLow");
                setLevelVariable("lastP1Arrow", "blockHit");
                broadcast("animateP1");
                broadcast("animateP2");
                break;
            case "weekend-1-punchhighblocked":
                setLevelVariable("lastP2Arrow", "punchHigh");
                setLevelVariable("lastP1Arrow", "blockHit");
                broadcast("animateP1");
                broadcast("animateP2");
                break;
            case "weekend-1-punchlowdodged":
                setLevelVariable("lastP2Arrow", "punchLow");
                setLevelVariable("lastP1Arrow", "dodge");
                broadcast("animateP1");
                broadcast("animateP2");
                break;
            case "weekend-1-dodgelow":
                setLevelVariable("lastP2Arrow", "dodge");
                setLevelVariable("lastP1Arrow", "punchLow");
                broadcast("animateP1");
                broadcast("animateP2");
                break;
            case "weekend-1-blockspin":
                setLevelVariable("lastP2Arrow", "blockHit");
                setLevelVariable("lastP1Arrow", "spin");
                broadcast("animateP1");
                broadcast("animateP2");
                break;
            case "weekend-1-punchhigh":
                setLevelVariable("lastP2Arrow", "punchHigh");
                setLevelVariable("lastP1Arrow", "hitHigh");
                broadcast("animateP1");
                broadcast("animateP2");
                break;
            case "weekend-1-hithigh":
                setLevelVariable("lastP2Arrow", "hitHigh");
                setLevelVariable("lastP1Arrow", "punchHigh");
                broadcast("animateP1");
                broadcast("animateP2");
                break;
            case "weekend-1-dodgehigh":
                setLevelVariable("lastP2Arrow", "dodge");
                setLevelVariable("lastP1Arrow", "punchHigh");
                broadcast("animateP1");
                broadcast("animateP2");
                break;
            case "weekend-1-darnelluppercutprep":
                setLevelVariable("lastP1Arrow", "beforeUppercut");
                broadcast("animateP1");
                break;
            case "weekend-1-darnelluppercut":
                setLevelVariable("lastP2Arrow", "hitHigh");
                setLevelVariable("lastP1Arrow", "uppercut");
                broadcast("animateP1");
                broadcast("animateP2");
                break;
            case "weekend-1-hitlow":
                setLevelVariable("lastP2Arrow", "hitLow");
                setLevelVariable("lastP1Arrow", "punchLow");
                broadcast("animateP1");
                broadcast("animateP2");
                break;
            case "weekend-1-picouppercutprep":
                setLevelVariable("lastP2Arrow", "beforeUppercut");
                broadcast("animateP2");
                break;
            case "weekend-1-picouppercut":
                setLevelVariable("lastP2Arrow", "uppercut");
                setLevelVariable("lastP1Arrow", "hitHigh");
                broadcast("animateP1");
                broadcast("animateP2");
                break;
            case "weekend-1-blocklow":
                setLevelVariable("lastP2Arrow", "blockHit");
                setLevelVariable("lastP1Arrow", "punchLow");
                broadcast("animateP1");
                broadcast("animateP2");
                break;
            case "weekend-1-punchlow":
                setLevelVariable("lastP2Arrow", "punchLow");
                setLevelVariable("lastP1Arrow", "hitLow");
                broadcast("animateP1");
                broadcast("animateP2");
                break;
            case "weekend-1-punchlow":
                setLevelVariable("lastP2Arrow", "punchLow");
                setLevelVariable("lastP1Arrow", "hitLow");
                broadcast("animateP1");
                broadcast("animateP2");
                break;
            case "weekend-1-fakeout":
                setLevelVariable("lastP2Arrow", "fakeOut");
                setLevelVariable("lastP1Arrow", "cringe");
                broadcast("animateP1");
                broadcast("animateP2");
                break;
            case "weekend-1-taunt":
                setLevelVariable("lastP2Arrow", "laughing");
                setLevelVariable("lastP1Arrow", "cringe");
                broadcast("animateP1");
                broadcast("animateP2");
                break;
            case "weekend-1-idle":
                setLevelVariable("lastP2Arrow", "idle");
                setLevelVariable("lastP1Arrow", "idle");
                broadcast("animateP1");
                broadcast("animateP2");
                break;
            case "weekend-1-dodgehigh":
                setLevelVariable("lastP2Arrow", "dodge");
                setLevelVariable("lastP1Arrow", "punchHigh");
                broadcast("animateP1");
                broadcast("animateP2");
                break;
        }}
        check();
    }else{
        console.log("done");
    }
};
check();
