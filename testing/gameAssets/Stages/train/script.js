console.log("Stage session scriptID:" + scriptSession)
async function trainSound() {
    var audio = new Audio(getLevelVariable("path") + "EventScripts/train_passes.mp3");
    audio.type = 'audio/mp3';
    await audio.play();
}
const delay = ms => new Promise(res => setTimeout(res, ms));
const pass = async () => {
    await delay(Math.random() * 20000+35000);
    if (getLevelVariable("sessionID") == scriptSession) {
        trainSound();
        await delay(4000);
        setLevelVariable("BGELEMENTisHidden5", false);
        await delay(3500);
        setLevelVariable("BGELEMENTisHidden5", true);
        pass();
    }
};
pass();