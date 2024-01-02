# PenguinFunk
It's basically Friday Night Funkin but rewritten in [PenguinMod](https://studio.penguinmod.com/editor.html).  
Probably the cleanest Friday Night Funkin framework ever. Like seriously. It's like 1.6MB by itself.
### What it can do
<ul>
  <li>Reads charts made with the Friday Night Funkin chart editor</li>
  <li>Group multiple songs into weeks</li>
  <li>Has (limited) support for Psych Engine events. You can add more using JavaScript!</li>
  <li>Can load mods from the "Mods" folder
    <ul>
      <li>Characters with configs and icons</li>
      <li>Stages with configs and animated elements</li>
      <li>Songs with charts</li>
    </ul>
  </li>
  <li>Customizable list to display the mods </li>
</ul>

### What it can't do
<ul>
  <li>Access your bank account</li>
</ul>

### Why does this exist
Because it's very small compared to other Friday Night Funkin engines.<br>
It's light and fast, making it run really well on lower-end devices. Also, JavaScript is the best programming language to ever get created.

# How to use
While you read this, I would recommend looking at the example mods that I have ported in the "Mods" folder.
### Folder structure
The folder structure is pretty easy to understand.<br>
<ul>
  <li>Mods</li>
  <ul>
  <li>Mod-name
    <ul>
      <li>Characters
    <ul>
      <li>Player</li>
      <li>Enemy</li>
    </ul>
  </li>
      <li>Stage</li>
      <li>Song</li>
    </ul>
  </li>
  </ul>
</ul>

### Character folders
The characters folder contains 2 sub-folders. "Enemy" and "Player". The "Enemy" folder will contain the assets for the character you play against, and the "Player" folder will contain the assets for the character that you play as. I use [this tool](https://github.com/i-winxd/FnF-Spritesheet-to-PNG-seq/tree/master) to get the individual frames from a spritesheet.<br>
The 2 folders will both contain:
<ul>
  <li>A "character.json" file</li>
  <li>The poses as separate frames, followed by their name and frame number</li>
  <li>The icon of the character, named "icon.png"</li>
</ul>
Look in the "Mods" folder for examples.

### character.json
The "character.json" file will contain the configuration of the character.<br>
This is its structure:
<ul>
  <li>"size": size of the character</li>
  <li>"cameraX": where the cameraX goes when this character sings</li>
  <li>"cameraY": where the cameraY goes when this character sings</li>
  <li>"x": y position</li>
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
</ul>

### Stage folder
The stage folder contains all the images in the stage and a stage.json file. Pretty simple.

### stage.json
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
```"inFront"``` will render the element in front of everything else.
### Song folder
It contains "song.json" and "song.mp3".<br>
Unlike other Friday Night Funkin engines, this one doesn't use 2 separate tracks for the instrumental and the vocals. They are merged into an MP3 file. It's also worth noting that nothing besides MP3 works.<br>
The "song.json" file is just the chart of the song. Nothing special.


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
<br>

[![cantaloupe](https://img.youtube.com/vi/mYiBdMnIT88/0.jpg)](https://www.youtube.com/watch?v=mYiBdMnIT88)
