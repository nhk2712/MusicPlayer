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

const NONE = 0
const CURRENT = 1
const ALL = 2
var value
var isLoop = NONE

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

var list = [song1, song2]

var index = 0

function init() {
    aud.src="data/song/" + list[index].dir + ".mp3"
    curtime.innerText = "0 : 00"
    value = -1
    title.innerText = list[index].name
    artist.innerText = list[index].artist
    artwork.src = "data/artwork/" + list[index].artwork + ".jpg"
    container.style.backgroundColor = list[index].color
}

time.onchange = function () { //Makes the music's current time be the same as the range's value
    aud.currentTime = time.value
    curtime.innerText = secToMinStr(aud.currentTime)
    value = aud.currentTime
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
        value++
        time.value = value;
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
    value = 0
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