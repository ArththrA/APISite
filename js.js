let index = 0;
let tracks = [];

async function carregarTop50() {
    const playlistId = 1313621735;
    const apiUrl = `https://api.deezer.com/playlist/${playlistId}`;
    const proxy = "https://corsproxy.io/?";

    const res = await fetch(proxy + apiUrl);
    const data = await res.json();

    tracks = data.tracks.data.filter(track => track.preview).map(track => ({name: track.title, artist: track.artist.name, preview: track.preview, image: track.album.cover_big}));

    mostrarMusica();
}

function mostrarMusica() {
    const musica = tracks[index];

    document.getElementById("trackTitle").textContent = musica.name;
    document.getElementById("artist").textContent = musica.artist;
    document.getElementById("cover").src = musica.image;

    const audio = document.getElementById("audio");
    audio.src = musica.preview;
}



function tocarOuPausar() {
    const audio = document.getElementById("audio");
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

function avancar() {
    index = (index + 1) % tracks.length;
    mostrarMusica();
}

function voltar() {
    index = (index - 1 + tracks.length) % tracks.length;
    mostrarMusica();
}

carregarTop50();