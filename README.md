# Co-Funk
The bare minimum that you need to get funky on a Friday night<br>
Friday Night Funkin' rewrite made in [PenguinMod](https://studio.penguinmod.com/editor.html).  
Probably the cleanest Friday Night Funkin framework ever. Like seriously. It's like 1.4MB by itself. Thats insane.
### What it can do
Most things that vanilla FNF can do, and more, or at leat other different stuff.<br>
We are talking like custom events, modding support, cross platform (mobile support out of the box!!!) and like so much cool stuff (better than psych engine for real for real :trollface:)

### What it can't do
Access your bank account<br>
Leak your SSN<br>

### Why does this exist
Because it's very small compared to other Friday Night Funkin frameworks.<br>
It's lightweight and fast, making it run really well on lower-end devices. Also, JavaScript is the best programming language to ever get created.
# How to use
While you read this, I would recommend looking at the example mods that I have ported in the "Mods" folder.
### Development environment
To work on stuff locally, you need a local server that can be accessed by PenguinMod. This turns out to be tricky because of cors and ssl certificates and poo poo but don't worry. I gotchu  
#### 1.Run the script  
Run start-server.sh  
#### 2.Set the variable  
Set the path global variable inside the project to the assets folder hosted on localhost:8000  
### Folder structure
The folder structure is pretty easy to understand.<br>
<ul>
  <li>Mods</li>
  <ul>
  <li>song-name
    <ul>
      <li>Characters
    <ul>
      <li>Player</li>
      <li>Enemy</li>
    </ul>
  </li>
      <li>Song</li>
    </ul>
  </li>
  </ul>
</ul>

You could also just download the Electron version in the releases if you just wanna add new songs and weeks

# Song folder
The song folders contain something essential. The "paths.json" file. This file contains the names of the characters and stage, as well as other information like if the song has a cutscene.<br>
Here is the structure of the file:
<ul>
  <li>"Enemy":"enemy-name"</li>
  <li>"Player":"player-name"</li>
  <li>"Stage":"stage-name"</li>
  <li>"Cutscene":true/false</li>
</ul>
Remember that I mentioned cutscenes? You can add a mp4 file called "cutscene.mp4" in this the folder, and set the "Cutscene" property in "paths.json" to true, and the video will play before the song starts (check "thorns" for an example).<br><br>
This folder also contains the thumbnail for the song inside the freeplay menu. Its called "menuImage.png".

## character.json
Inside the "Enemy" and "Player" folders in the "Characters folder"... Inside the song folder... There is a "character.json" file.<br>
The "character.json" file will contain the configuration of the character.<br>
This is the structure of this file:
<ul>
  <li>"size": size of the character</li>
  <li>"cameraX": where the cameraX goes when this character sings</li>
  <li>"cameraY": where the cameraY goes when this character sings</li>
  <li>"x": y position</li>
</ul>

There are some extra values you can add at the very top of the json file.<br>
``"loop":true`` makes the idle animation constantly loop (look at the mom week for examples).
``"flipped":true`` flips the character.

## Song folder
This is the Song folder inside the folder of the song. It contains "song.json" and "song.mp3".<br>
Unlike other Friday Night Funkin engines, this one doesn't use 2 separate tracks for the instrumental and the vocals. They are merged into an MP3 file. It's also worth noting that nothing besides MP3 works.<br>
The "song.json" file is just the chart of the song. Nothing special.

# Stages folder

Contains all stages.

### Stage folder

A stage's folder constains all of its assets and the "stage.json" file. Optionally, it can also contain a "stageExtra.json" file, that contains optional stuff. Duh.

## stage.json
The "stage.json" file is a JSON array. Every item in that array is a background object.<br><br>
A basic background item looks like this:<br>
```
{"fileName":"nameOfImage.png","x": X position,"y": Y position,"size": size of object}
```
<br><br>
An animated background item looks like this:<br>
```
{"fileName":"fileNamePrefix.png","x": X position,"y": Y position,"size": size of object,"isAnimated":true,"frames":number of frames,"seconds per frame": seconds per frame}
```
<br><br>
There also are special properties that you can add:<br>
```"canBop"``` will make that element bop on the beat. You can look at the "stage.json" file of the "fuss-erect" and "soda-pop" examples to see it.<br>
```"inFront"``` will render the element in front of everything else.<br>
```"isRGB"``` will make the object shift its color automatically. Like the lights in the Pico week.

## stageExtra.json
Extra stage stuff. All it does right now is specify if a stage is in the pixel style or not, with the ``"isPixel?":true`` value.

# Characters folder

Not to be confused with the characters folder inside the song's folder, this is inside the main "Mods" folder and contains all the characters.

## Character folder

Contains all the images of a character. Unlike other FNF frameworks, this uses PNG sequences instead of spritesheets.<br><br>
All the animations should be named like ``animationName+frameNumber.png``. For example, the up animation for a character goes like ``up1.png``, then ``up2.png`` and so on.<br>
There is also a "icon.png" file that is the icon of the character. It appears on the health bar.<br>
Inside here there is a ``data.json`` file that contains the configuration file for the animations of the character. It looks like this
  <li>"animations"
    <ul>
      <li>"idle"</li>
      <ul>
      <li>"frames": number of frames for that pose</li>
      </ul>
      <li>"up"</li>
            <ul>
      <li>"frames": number of frames for that pose</li>
      </ul>
      <li>"down"</li>
            <ul>
      <li>"frames": number of frames for that pose</li>
      </ul>
      <li>"left"</li>
            <ul>
      <li>"frames": number of frames for that pose</li>
      </ul>
      <li>"right"</li>
            <ul>
      <li>"frames": number of frames for that pose</li>
      </ul>
      <li>"seconds per frame"</li>
    </ul>
  </li>
    <li>"offsets"</li>
    <ul>
    <li>"idle"</li>
    <ul>
    <li>"x"</li>
    <li>"y"</li>
    </ul>
    </ul>
    <ul>
    <li>"up"</li>
    <ul>
    <li>"x"</li>
    <li>"y"</li>
    </ul>
    </ul>
    <ul>
    <li>"down"</li>
    <ul>
    <li>"x"</li>
    <li>"y"</li>
    </ul>
    </ul>
    <ul>
    <li>"left"</li>
    <ul>
    <li>"x"</li>
    <li>"y"</li>
    </ul>
    </ul>
    <ul>
    <li>"right"</li>
    <ul>
    <li>"x"</li>
    <li>"y"</li>
    </ul>
    </ul>
    <li>"healthColor": color in HEX</li>

### EventScripts folder
Contains all the events. You can look at the existing ones to learn how to write your own. It's just JavaScript with a couple of predefined functions you can use.

### loadingScreens folder
Contains the loading screens.

### bgart folder
Contains all the background art that pops up in the menus.

### songList.json (in root directory)
List with all the songs in freeplay.

### Weeks folder
Contains all the weeks and their data.
## weekList.json
Lists all the weeks in the weeks menu.
## Week folders
They contain the image for the week inside the weeks menu, and the "songList.json" that is basically the config for the week.

## songList.json
The ``Songs`` array contains all the songs in order.<br>
The ``weekStory`` array contains that little funny text.<br>
The ``disableReload`` disables reloading of the stage and characters. This can be used to save load times in weeks where the characters and stage dont change.<br>

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br><br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br><br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

"GF's ass is thiiiiiiiiiiiiiiiiissssss big" - Phantom Arcade 2024
