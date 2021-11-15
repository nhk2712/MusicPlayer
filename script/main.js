var song1  = {
    name:"DotA",
    dir:"dota",
    artist:"Basshunter",
    artwork:"basshunter",
    color:"lightgreen"
}

var song2 = {
    name:"Shivers",
    dir:"shivers",
    artist:"Ed Sheeran",
    artwork:"sheeran",
    color:"lightcoral"
}

var song3 = {
    name:"Believer",
    dir:"believer",
    artist:"Imagine Dragons",
    artwork:"believer",
    color:"lightgrey"
}

var song4 = {
    name:"Boten Anna",
    dir:"boten",
    artist:"Basshunter",
    artwork:"basshunter",
    color:"lightgreen"
}

var song5 = {
    name:"Dragostea Din Tei",
    dir:"dragostea",
    artist:"O-Zone",
    artwork:"dragostea",
    color:"lightblue"
}

var list = [song1, song2, song3, song4, song5]

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
shuffleArray(list)

var container = document.getElementById('container')
var time = document.getElementById('time')
var music = document.createElement('audio')
var play = document.getElementById('play')
var volume = document.getElementById('volume')
var maxtime = document.getElementById('maxtime')
var curtime = document.getElementById('curtime')
var repeat = document.getElementById('repeat')
var loopIcon = document.getElementById('loopIcon')
var repType = document.getElementById('repType')

var title = document.getElementById('title')
var artist = document.getElementById('artist')
var artwork = document.getElementById('artwork')

var prev= document.getElementById('prev')
var next= document.getElementById('next')

var playlist= document.getElementById('playlist')

var songTile = document.getElementsByClassName('songTile')
var songArtwork = document.getElementsByClassName('songArtwork')
var songName = document.getElementsByClassName('songName')
var songArtist = document.getElementsByClassName('songArtist')
var isPlaying = document.getElementsByClassName('isPlaying')

var playlistBtn = document.getElementById('playlistBtn')
var closeList = document.getElementById('closeList')

var tiles = document.getElementById('tiles')
var tileContent = '<button class="songTile"><img class="songArtwork"><span class="songInfo"><span class="songName"></span><span class="songArtist"></span></span><span class="isPlaying"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-music-note" viewBox="0 0 16 16"><path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2z"/><path fill-rule="evenodd" d="M9 3v10H8V3h1z"/><path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5V2.82z"/></svg></span></button>'

const NONE = 0
const CURRENT = 1
const ALL = 2
var isLoop = NONE

var index = 0

for (var i=0; i<list.length; i++) {
    tiles.innerHTML+=tileContent
}

function init() {
    aud.src="data/song/" + list[index].dir + ".mp3"
    curtime.innerText = "0 : 00"
    title.innerText = list[index].name
    artist.innerText = list[index].artist
    artwork.src = "data/artwork/" + list[index].artwork + ".jpg"
    container.style.backgroundColor = list[index].color
    playlist.style.backgroundColor = list[index].color
    play.src = "icon/play.png"

    for (var i = 0; i < list.length; i++) {
        if (i==index) isPlaying[i].style.visibility = "unset"
        else isPlaying[i].style.visibility = "hidden"
    }
}

time.onchange = function () { //Makes the music's current time be the same as the range's value
    aud.currentTime = time.value
    curtime.innerText = secToMinStr(aud.currentTime)
}

//Initially, the audio is considered to be paused
play.addEventListener('click', firstPlayFunc)
function firstPlayFunc() { //Plays for the first time (and occurs during the playback as well)
    if (aud.paused) bar() //When the audio is paused and the user wants to play it
    else unbar() //When the audio is playing and the user wants to pause it
}

music.setAttribute("src", "data/song/" + list[index].dir + ".mp3")
music.setAttribute("id", "aud")
document.body.appendChild(music)

var aud = document.getElementById('aud')
aud.volume = 0.3
init()

var inter
function bar() { //Pause to play
    inter = setInterval(function () { //Makes the range and string indicator be consistent to the audio playback
        time.value = aud.currentTime;
        curtime.innerText = secToMinStr(aud.currentTime)
    }, 1000)
    aud.play()
    play.src = "icon/pause.png"
}

function unbar() { //Play to pause
    clearInterval(inter)
    aud.pause()
    play.src = "icon/play.png"
}

volume.onmousemove = function () { //Change the audio's volume
    aud.volume = volume.value / 100
}

aud.onloadedmetadata = function () {
    time.max = this.duration
    maxtime.innerText = secToMinStr(aud.duration)
}

aud.onpause=unbar
aud.onplaying=bar

function secToMinStr(sec) {
    var min = Math.floor(sec / 60)
    var minStr = min.toString()
    var secDis = Math.floor(sec % 60)
    var secStr = secDis.toString()
    if (secDis < 10) return minStr + " : 0" + secStr
    else return minStr + " : " + secStr
}

aud.onended = function () {
    unbar()
    play.removeEventListener('click', firstPlayFunc)
    play.addEventListener('click', again)
    if (isLoop==CURRENT) play.click()
    else if (isLoop==ALL) next.click()
    else if (isLoop==NONE && index!=list.length-1) next.click()
}

function again() {
    time.value = 0
    play.removeEventListener('click', again)
    play.addEventListener('click', firstPlayFunc)
    bar()
}

repeat.onclick = function () {
    if (isLoop==NONE) {
        isLoop = CURRENT;
        loopIcon.style.color = "DodgerBlue"
        repType.innerText="Current"
        repType.style.color = "DodgerBlue"
    }
    else if (isLoop==CURRENT) {
        isLoop = ALL
        loopIcon.style.color = "DodgerBlue"
        repType.innerText="All"
        repType.style.color = "DodgerBlue"
    }
    else {
        isLoop = NONE
        loopIcon.style.color = "white"
        repType.innerText="None"
        repType.style.color = "white"
    }
}

prev.onclick = function () {
    if (index==0) index=list.length-1
    else index--
    init()
    play.click()
}

next.onclick = function () {
    if (index==list.length-1) index=0
    else index++
    init()
    play.click()
}

for (var i=0; i<list.length; i++) {
    songArtwork[i].src="data/artwork/"+ list[i].artwork+".jpg"
    songName[i].innerText=list[i].name
    songArtist[i].innerText=list[i].artist
    songTile[i].value=i
}

for (var i=0; i<list.length; i++) {
    songTile[i].onclick = function () {
        index=this.value
        init()
        closeList.click()
        play.click()
    }
}

playlistBtn.onclick = function () {
    playlist.style.animation="show 0.3s"
    playlist.style.display="flex"
}

closeList.onclick = function () {
    playlist.style.animation="hide 0.3s"
    setTimeout(function () {
        playlist.style.display="none"
    },250)
}