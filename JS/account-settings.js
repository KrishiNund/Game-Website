// const { default: Swal } = require("sweetalert2");

// const { default: Swal } = require("sweetalert2");

// const { default: Swal } = require("sweetalert2");

function deleteAccount(){
    //confirm choice of user
    Swal.fire({
        title: 'Account Deletion',
        text:"Are you sure you want to delete your account?",
        icon: 'warning',
        confirmButtonText: 'Yes',
        showCancelButton:true,
        cancelButtonText: 'Cancel'
    }).then((response)=>{
        //chose yes
        if (response.isConfirmed){
            // localStorage.clear();
            accountStatus = sessionStorage.getItem("status");
            if (accountStatus == "logged in"){
                let usersArray = JSON.parse(localStorage.getItem("currentUsers")) || [];
                let currentlyLoggedInAccount = sessionStorage.getItem("loggedInUser");
                let newUsersArray = [];
    
                let accountToDelete = currentlyLoggedInAccount;
                
                //creating a new array with all user accounts except the account to be deleted
                usersArray.forEach(function(user){
                    // console.log(user.Username);
                    // console.log(accountToDelete);
                    if (user.Username !== accountToDelete){
                        newUsersArray.push(user);
                    }
    
                })
    
                localStorage.setItem("currentUsers",JSON.stringify(newUsersArray));
                sessionStorage.setItem("status","logged out");
                // console.log(usersArray);
    
                Swal.fire({
                    title: 'Successfully Deleted Account!',
                    text:"Your account has been deleted successfully!",
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            } else {
                Swal.fire({
                    title: 'Invalid Request!',
                    text:"You are not logged in any particular account at the moment.\n Please Log In your Account first if you want to delete it.",
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
           
        }
    });
}

function logOut(){
    Swal.fire({
        title: 'Log out?',
        text:"Are you sure you want to log out of your account?",
        icon: 'warning',
        confirmButtonText: 'Yes',
        showCancelButton:true,
        cancelButtonText: 'Cancel'
    }).then((response)=>{
        if (response.isConfirmed){
            accountStatus = sessionStorage.getItem("status");
            if (accountStatus == "logged in"){
                Swal.fire({
                    title: 'Successfully Logged Out',
                    text:"You have successfully logged out of your account!",
                    icon: 'success',
                    confirmButtonText: 'Yes',
                    willClose: function(){
                        sessionStorage.setItem("status","logged out");
                        window.location.href="game.html";
                    }
                })
                
            } else {
                Swal.fire({
                    title: 'Invalid Request',
                    text:"You are not logged in any particular account at this moment!",
                    icon: 'warning',
                    confirmButtonText: 'Yes'
                })
            }
            
        }
    })
    
}

function adjustVolume(){
    let volume = document.getElementById("soundFXVolume").value / 100;
    console.log(volume);
    sessionStorage.setItem("soundFXVolume", volume);
}