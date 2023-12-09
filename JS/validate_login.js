function verifyUser() {
  //getting the values of password and usernames from their entry fields
  let password = document.getElementById("password").value;
  let username = document.getElementById("username").value;

  //converting JSON object to JS array
  let usersArray = JSON.parse(localStorage.getItem("currentUsers")) || [];
  let UserPresent = false;

  //checking if username and password match any in the local storage
  usersArray.forEach(function (user) {
    if (user.Username === username && user.Password === password) {
      UserPresent = true;

      //store the username of the logged in user in session storage
      sessionStorage.setItem("loggedInUser", username);
      // if entered details have match in usersArray
      Swal.fire({
        title: "Access Granted!",
        text: `Welcome Back ${username}!`,
        icon: "success",
        confirmButtonText: "OK",
        willClose: function () {
          document.getElementById("username").value = "";
          document.getElementById("password").value = "";
          sessionStorage.setItem("status", "logged in");
          window.location.href = "game.html";
        },
      });
    }
  });
  //if username and password entered do not have any match
  if (UserPresent == false) {
    Swal.fire({
      title: "Account Not Found!",
      text: "Please try again or Sign Up!",
      icon: "error",
      confirmButtonText: "OK",
      willClose: function () {
        //clear password and username fields
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
      },
    });
  }
}
