let accountStatus = sessionStorage.getItem("status");

if (accountStatus == "logged in"){
    let game = document.getElementById('gameArea');
    let startMenu = document.querySelector('.start-menu');
    startMenu.style.display='none';
    game.style.display='block';
}