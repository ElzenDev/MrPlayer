//               *** V A R I A V E I S ***
let musics = [
    {titulo:'Mayhem', 
        artista:'Neoni x Easy Mccoy', 
        src:'music/Mayhem.mp3', 
        img:'img/guitar.jpg'},

    {titulo:'Royalty', 
        artista:'Egzod & Maestro Chives', 
        src:'music/Royalty.mp3', 
        img:'img/Violet.jpg'},

    {titulo:'Rise Up', 
        artista:'Fat rat', 
        src:'music/RiseUp.mp3', 
        img:'img/yoda.jpg'},

    {titulo:'Lily', 
        artista:'Alan Walker, K-391 & Emelie Hollow', 
        src:'music/lily.mp3',
        img:'img/lily.jpg'},
    
    {titulo:'Toca Toca Toca',
        artista:'Fly Project',
        src:'music/Toca.mp3',
        img:'img/party.jpg'
    }
];

let currentMusic = document.querySelector('audio');
let currentImg = document.querySelector('img');
let musicIndex = 0;

let musicDuration = document.querySelector('.fim');

let musicName = document.querySelector('.descricao h2');
let artistName = document.querySelector('.descricao i');

renderMusic(musicIndex);

//               *** E V E N T O S ***
document.querySelector('.btnPlay').addEventListener('click', playMusic);
document.querySelector('.btnPause').addEventListener('click', stopMusic);
currentMusic.addEventListener('timeupdate', atualizarBarra)
currentMusic.addEventListener('loadeddata', Duration)

document.querySelector('.anterior').addEventListener('click', () => {
    musicIndex--;
    if (musicIndex < 0) {
        musicIndex = 4;
    }
    renderMusic(musicIndex);
});

document.querySelector('.proxima').addEventListener('click', () => {
    musicIndex++
    if (musicIndex > 4) {
        musicIndex = 0;
    }
    renderMusic(musicIndex);

});

//               *** F U N Ç Õ E S ***

function renderMusic(index) {
    currentMusic.setAttribute('src', musics[index].src);
    currentMusic.addEventListener('loadeddata', () => {
        musicName.textContent = musics[index].titulo;
        artistName.textContent = musics[index].artista;
        currentImg.src = musics[index].img;
        musicDuration.textContent = converter(Math.floor(currentMusic.duration));
    });

    currentMusic.play();
}

function playMusic() {
    currentMusic.play();
    document.querySelector('.btnPause').style.display = 'block';
    document.querySelector('.btnPlay').style.display = 'none'
}

function stopMusic() {
    currentMusic.pause();
    document.querySelector('.btnPlay').style.display = 'block';
    document.querySelector('.btnPause').style.display = 'none';

    document.querySelector('.anterior').addEventListener('click', () => {
        renderMusic();
    });

    document.querySelector('.proxima').addEventListener('click', () => {
        renderMusic();
    });
}
function atualizarBarra() {
    
    //         Movimentação da Barra
   let barra = document.querySelector('progress');
   barra.style.width = Math.floor((currentMusic.currentTime / currentMusic.duration) * 100) + '%';
   
   //          Tempo Decorrido
   let tempoDecorrido = document.querySelector('.inicio')
   tempoDecorrido.textContent = converter(Math.floor(currentMusic.currentTime));            
}

function converter(segundos) {
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10) {
        campoSegundos = '0' + campoSegundos
    }

    return campoMinutos+':'+campoSegundos;
}

function Duration(){
    let musicDuration = document.querySelector('.fim');

    musicDuration.textContent = converter(Math.floor(currentMusic.duration));
}