let artistField = document.getElementsByClassName("artist-field")[0]
let songField = document.getElementsByClassName("song-field")[0]

function SearchSong(){
    let artist = document.getElementsByClassName("artist-field")[0].value
    let song = document.getElementsByClassName("song-field")[0].value
    let lyricsField = document.getElementsByClassName("lyrics")[0]

    artist = artist.toLowerCase()
    artist = artist[0].toUpperCase()+artist.slice(1)
    song = song.toLowerCase()
    song = song[0].toUpperCase()+song.slice(1)

    let multWordsArtist = artist.includes(" ", 1)
    let multWordsSong = song.includes(" ", 1)

    if(multWordsArtist){
        let artistArray = artist.split(" ")
        for(let i=0; i<artistArray.length; i++){
            artistArray[i] = artistArray[i][0].toUpperCase()+artistArray[i].slice(1)
        }
        artist = artistArray.join(" ")
    }
    if(multWordsSong){
        let songArray = song.split(" ")
        for(let i=0; i<songArray.length; i++){
            songArray[i] = songArray[i][0].toUpperCase()+songArray[i].slice(1)
        }
        song = songArray.join(" ")
    }

    artistField.value = ""
    songField.value = ""
    document.getElementsByClassName("placeholder-text")[0].innerText = ""
    document.getElementsByClassName("artis-name")[0].innerHTML = ""
    document.getElementsByClassName("song-title")[0].innerHTML = ""
    lyricsField.innerHTML = ""

    fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`)
    .then(
        function(res){
            if(res.status !== 200){
                document.getElementsByClassName("placeholder-text")[0].innerHTML = "Opps! Looks like something went wrong...<br><br>"
                document.getElementsByClassName("placeholder-text")[0].innerHTML += `Could not find ${song} by ${artist}`
                return
            }
            res.json().then(lyrics => {
                        document.getElementsByClassName("artis-name")[0].innerHTML = artist
                        document.getElementsByClassName("song-title")[0].innerHTML = song
                        lyricsField.innerHTML = lyrics.lyrics
                    })
        })
}

artistField.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        event.preventDefault()
        SearchSong()
    }
})
songField.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        event.preventDefault()
        SearchSong()
    }
})