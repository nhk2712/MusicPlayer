var time = document.getElementById('time')
var music = document.createElement('audio')
var play = document.getElementById('play')

time.onchange = function(){
    console.log(time.value)
    aud.currentTime = time.value
}

play.onclick = function(){
    if (aud.paused) bar()
    else unbar()
}

music.setAttribute("src","data/song/song.mp3")
music.setAttribute("id","aud")
document.body.appendChild(music)

var aud = document.getElementById('aud')
aud.volume=0.3

var inter
function bar(){
    inter = setInterval(function(){
        time.value++;
    },1000)
    aud.play()
    play.innerText="Pause"
}

function unbar(){
    clearInterval(inter)
    aud.pause()
    play.innerText="Play"
}