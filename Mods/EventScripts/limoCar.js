async function playAudio() {
  var audio = new Audio(getLevelVariable("path")+"EventScripts/carPass1.mp3");
  audio.type = 'audio/mp3';
    await audio.play();
}
const delay = ms => new Promise(res => setTimeout(res, ms));
const pass = async () => {
  playAudio();
await delay (1000);
  setLevelVariable("BGELEMENTisHidden9", false);
await delay (500);
  setLevelVariable("BGELEMENTisHidden9", true);
  };
pass();
