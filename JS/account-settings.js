function deleteAccount() {
  //confirm choice of user
  Swal.fire({
    title: "Account Deletion",
    text: "Are you sure you want to delete your account?",
    icon: "warning",
    confirmButtonText: "Yes",
    showCancelButton: true,
    cancelButtonText: "Cancel",
  }).then((response) => {
    //chose yes
    if (response.isConfirmed) {
      accountStatus = sessionStorage.getItem("status");

      if (accountStatus == "logged in") {
        let usersArray = JSON.parse(localStorage.getItem("currentUsers")) || [];
        let currentlyLoggedInAccount = sessionStorage.getItem("loggedInUser");
        let newUsersArray = [];

        let accountToDelete = currentlyLoggedInAccount;

        //creating a new array with all user accounts except the account to be deleted
        usersArray.forEach(function (user) {
          if (user.Username !== accountToDelete) {
            newUsersArray.push(user);
          }
        });

        localStorage.setItem("currentUsers", JSON.stringify(newUsersArray));
        sessionStorage.setItem("status", "logged out");

        Swal.fire({
          title: "Successfully Deleted Account!",
          text: "Your account has been deleted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        //if user is not logged in and is trying to delete his account
      } else {
        Swal.fire({
          title: "Invalid Request!",
          text: "You are not logged in any particular account at the moment.\n Please Log In your Account first if you want to delete it.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  });
}

function logOut() {
  //ask for confirmation first
  Swal.fire({
    title: "Log out?",
    text: "Are you sure you want to log out of your account?",
    icon: "warning",
    confirmButtonText: "Yes",
    showCancelButton: true,
    cancelButtonText: "Cancel",
  }).then((response) => {
    //if yes
    if (response.isConfirmed) {
      accountStatus = sessionStorage.getItem("status");
      if (accountStatus == "logged in") {
        Swal.fire({
          title: "Successfully Logged Out",
          text: "You have successfully logged out of your account!",
          icon: "success",
          confirmButtonText: "Yes",
          willClose: function () {
            sessionStorage.setItem("status", "logged out");
            window.location.href = "game.html";
          },
        });
        //if user is not logged in his account and is trying to log out
      } else {
        Swal.fire({
          title: "Invalid Request",
          text: "You are not logged in any particular account at this moment!",
          icon: "warning",
          confirmButtonText: "Yes",
        });
      }
    }
  });
}

//obtaining volume value while sliding volume slider
function adjustFxVolume() {
  let volumeSlider = document.getElementById("soundFXVolume");
  let volume = volumeSlider.value;
  sessionStorage.setItem("soundFXVolume", volume);
}

//set new volume on slider
currentFxVolume = sessionStorage.getItem("soundFXVolume");
document.getElementById("soundFXVolume").value = currentFxVolume;

function adjustBgVolume() {
  let volumeSlider = document.getElementById("backgroundSoundVolume");
  let volume = volumeSlider.value;
  sessionStorage.setItem("bgVolume", volume);
}

//set new volume on slider
currentBgVolume = sessionStorage.getItem("bgVolume");
document.getElementById("backgroundSoundVolume").value = currentBgVolume;
