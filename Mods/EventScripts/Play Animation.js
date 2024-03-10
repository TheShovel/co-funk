//Missing animations are handled by the framework
if(getLevelVariable("value2") == "enemy"){
  setLevelVariable("lastP1Arrow",getLevelVariable("value1"));
  broadcast("animateP1");
} else {
  setLevelVariable("lastP2Arrow",getLevelVariable("value1"));
  broadcast("animateP2");
};