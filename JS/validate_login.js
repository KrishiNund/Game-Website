// const { default: Swal } = require("sweetalert2");
function verifyUser(){
    //getting the values of password and usernames from their entry fields
    let password = document.getElementById("password").value;
    let username = document.getElementById("username").value;
    
    //converting JSON object to JS array
    let usersArray = JSON.parse(localStorage.getItem("currentUsers")) || [];
    let UserPresent = false;

    console.log(usersArray);
    //checking if username and password match any in the local storage
    usersArray.forEach(function(user){
        // console.log(user);
        if (user.Username === username && user.Password === password){
            UserPresent = true;
            console.log(user.Username,username);
            // let userFound = user;

            sessionStorage.setItem("loggedInUser",username);
            // console.log(userFound);

            Swal.fire({
                title: 'Access Granted!',
                text:`Welcome Back ${username}!`,
                icon: 'success',
                confirmButtonText: 'OK',
                willClose: function(){
                    // document.getElementById("signup").submit();
                    document.getElementById("username").value="";
                    document.getElementById("password").value="";
                    sessionStorage.setItem("status","logged in");
                    window.location.href="game.html";
                } 
            })
            // let game = document.querySelector('.game-window');
            // let startMenu = document.querySelector('.start-menu');
            // startMenu.style.display='none';
            // game.style.display='block';
        }
    });
    //if username and password do not match any
    if (UserPresent == false){
        Swal.fire({
            title: 'Account Not Found!',
            text:'Please try again or Sign Up!' ,
            icon: 'error',
            confirmButtonText: 'OK',
            willClose: function(){
                // document.getElementById("signup").submit();
                document.getElementById("username").value="";
                document.getElementById("password").value="";
                // localStorage.clear();
            } 
        })
    };
}

