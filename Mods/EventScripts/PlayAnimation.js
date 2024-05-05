//Missing animations are handled by the framework
if (valueObject.target == "enemy") {
  setLevelVariable("lastP1Arrow", valueObject.anim);
  broadcast("animateP1");
} else {
  setLevelVariable("lastP2Arrow", valueObject.anim);
  broadcast("animateP2");
};