//check whether player is logged in or not
let accountStatus = sessionStorage.getItem("status");

//if player is logged in, hide start menu page and display game page
if (accountStatus == "logged in") {
  let game = document.getElementById("gameArea");
  let startMenu = document.querySelector(".start-menu");
  startMenu.style.display = "none";
  game.style.display = "block";
}
