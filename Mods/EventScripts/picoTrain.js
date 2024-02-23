async function playAudio() {
  var audio = new Audio(getLevelVariable("path")+"EventScripts/train_passes.mp3");
  audio.type = 'audio/wav';
    await audio.play();
}
const delay = ms => new Promise(res => setTimeout(res, ms));
const pass = async () => {
  playAudio();
await delay (4000);
  setLevelVariable("BGELEMENTisHidden5", false);
await delay (3500);
  setLevelVariable("BGELEMENTisHidden5", true);
  };
pass();
