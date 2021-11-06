var time = document.getElementById('time')
var music = document.createElement('audio')
var play = document.getElementById('play')
var volume = document.getElementById('volume')
var maxtime = document.getElementById('maxtime')
var curtime = document.getElementById('curtime')
var repeat = document.getElementById('repeat')
var loopIcon = document.getElementById('loopIcon')

var value=-1
var isLoop = false
time.onchange = function(){ //Makes the music's current time be the same as the range's value
    console.log(time.value)
    aud.currentTime = time.value
    curtime.innerText=secToMinStr(aud.currentTime)
    value=aud.currentTime
}

//Initially, the audio is considered to be paused
play.addEventListener('click',firstPlayFunc)
function firstPlayFunc(){ //Plays for the first time (and occurs during the playback as well)
    if (aud.paused) bar() //When the audio is paused and the user wants to play it
    else unbar() //When the audio is playing and the user wants to pause it
}

music.setAttribute("src","data/song/song.mp3")
music.setAttribute("id","aud")
document.body.appendChild(music)

var aud = document.getElementById('aud')
aud.volume=0.3

var inter
curtime.innerText="0 : 00"
function bar(){ //Pause to play
    inter = setInterval(function(){ //Makes the range and string indicator be consistent to the audio playback
        value++
        time.value=value;
        curtime.innerText=secToMinStr(aud.currentTime)
    },1000)
    aud.play()
    play.src="icon/pause.png"
}

function unbar(){ //Play to pause
    clearInterval(inter)
    aud.pause()
    play.src="icon/play.png"
}

volume.onchange = function(){ //Change the audio's volume
    aud.volume=volume.value/100
}

aud.onloadedmetadata= function(){
    time.max=this.duration
    maxtime.innerText=secToMinStr(aud.duration)
}

function secToMinStr(sec){
    var min=Math.floor(sec/60)
    var minStr=min.toString()
    var secDis=Math.floor(sec%60)
    var secStr=secDis.toString()
    if (secDis<10) return minStr+" : 0"+secStr
    else return minStr+" : "+secStr
}

aud.onended=function(){
    unbar()
    play.removeEventListener('click',firstPlayFunc)
    play.addEventListener('click',again)
    if (isLoop) play.click()
}

function again(){
    value=0
    time.value=0
    play.removeEventListener('click',again)
    play.addEventListener('click',firstPlayFunc)
    bar()
}

repeat.onclick = function(){
    if (!isLoop){
        isLoop=true;
        loopIcon.style.color="DodgerBlue"
    }
    else{
        isLoop=false
        loopIcon.style.color="white"
    }
}