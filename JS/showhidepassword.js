let showHideButton = document.querySelector('.showHideButton');
let password = document.getElementById('password');

function showHide(){
    if (showHideButton.textContent == "Show"){
        showHideButton.textContent = "Hide";
        password.type = 'text';

    } else {
        showHideButton.textContent = "Show";
        password.type = 'password';
    }

}