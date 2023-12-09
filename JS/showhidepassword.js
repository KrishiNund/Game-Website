//get password from password field
let showHideButton = document.querySelector(".showHideButton");
let password = document.getElementById("password");

//if show is pressed, show actual password
//else if hide is pressed, hide password
//by default, password is hidden
function showHide() {
  if (showHideButton.textContent == "Show") {
    showHideButton.textContent = "Hide";
    password.type = "text";
  } else {
    showHideButton.textContent = "Show";
    password.type = "password";
  }
  
}
