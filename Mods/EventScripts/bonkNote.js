const delay = ms => new Promise(res => setTimeout(res, ms));
const bonk = async () => {
  setLevelVariable("songSpeed", getLevelVariable("value1"));
    await delay (Number(getLevelVariable("value2"))*1000);
  setLevelVariable("songSpeed",getLevelVariable("realSpeed"));
  };
bonk();
