
if(Number(getLevelVariable("value1")) == 1){
   var tempSinger = "singer1";
} else {
    var tempSinger = "singer2";
}
setLevelVariable(tempSinger,getLevelVariable("value2"));