function submitForm() {
  //getting the values of password and usernames from their entry fields
  let password = document.getElementById("password").value;
  let username = document.getElementById("username").value;
  let dateOfBirth = document.getElementById("dateofbirth").value;
  let genders = document.querySelectorAll(".gender-options");
  let genderInput = document.querySelector(
    "input.gender-options:checked"
  );
  //if genderInput is not null, value will be assigned to genderSelected or else null will be assigned to it
  let genderSelected = genderInput ? genderInput.value : null;

  let warningText = "";
  let errorText = "";
  let errorCount = 0;

  //validating age of player first to verify if they meet minimum age requirement
  const dateEntered = new Date(dateOfBirth);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - dateEntered.getFullYear();
  if (age < 10) {
    warningText +=
      "You must be at least <b>10 years old</b> to play this game!s <br>";
    Swal.fire({
      title: "Age Restricted!",
      html: warningText,
      icon: "warning",
      confirmButtonText: "OK",
    });

    //modifying the HTML input directly
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("dateofbirth").value = "";

    //unchecking the gender options
    genders.forEach(function (gender) {
      gender.checked = false;
    });

    //if user meets age requirement, move on to this part
  } else {
    //checking if entry fields are left empty
    if (username == null || username == ""){
      errorText += "Username field cannot be left <b> empty! </b> <br>";
      errorCount++;
    }

    if (password == null || password == ""){
      errorText += "Password field cannot be left <b> empty! </b> <br>";
      errorCount++;
    }

    if (dateOfBirth == null || dateOfBirth == ""){
      errorText += "Date of birth field cannot be left <b> empty! </b> <br>";
      errorCount++;
    }

    if (genderSelected == null || genderSelected == ""){
      errorText += "Gender field cannot be left <b> empty! </b> <br>";
      errorCount++;
    }
    //validating password and username
    //checking password length
    if (password.length < 8) {
      errorText += "Password length must be at least <b>8 characters!</b> <br>";
      errorCount++;
    }
    //checking username length
    if (username.length > 15) {
      errorText += "Max username length is <b>15 characters!</b> <br>";
      errorCount++;
    }
    //checking if password contains at least 1 uppercase character
    if (!/[A-Z]/.test(password)) {
      errorText +=
        "Password must contain at least 1 <b>uppercase character!</b> <br>";
      errorCount++;
    }
    //checking if password contains at least 1 lowercase character
    if (!/[a-z]/.test(password)) {
      errorText +=
        "Password must contain at least 1 <b>lowercase character!</b> <br>";
      errorCount++;
    }
    //checking if password contains at least 1 digit
    if (!/\d/.test(password)) {
      errorText += "Password must contain at least 1 <b>digit!</b> <br>";
      errorCount++;
    }
    //if there is at least 1 error, display error pop up
    if (errorCount > 0) {
      Swal.fire({
        title: "Invalid Credentials!",
        html: errorText,
        icon: "error",
        confirmButtonText: "OK",
      });
      //also, wipe entry fields
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
      document.getElementById("dateofbirth").value = "";
      genders.forEach(function (gender) {
        gender.checked = false;
      });

      //if no error, store user data
    } else {
      let userDetailsCollected = {
        Username: username,
        Password: password,
        Gender: genderSelected,
        DateofBirth: dateOfBirth,
        TopScore: 0,
        DateAchieved: "",
      };
      //check if username entered already exists in local storage
      let usersArray = JSON.parse(localStorage.getItem("currentUsers")) || [];
      let userAlreadyExists = usersArray.some(
        (user) => user.Username === username
      );

      //checking if the username already exists in local storage
      if (userAlreadyExists) {
        Swal.fire({
          title: "Username Already Taken!",
          text: `Please Choose another username! \n ${username} already exists.`,
          icon: "warning",
          confirmButtonText: "OK",
          timer: 3000,
          //reset entry fields
          willClose: function () {
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
            document.getElementById("dateofbirth").value = "";
            genders.forEach(function (gender) {
              gender.checked = false;
            });
          },
        });
        //username does not exist, append details to usersArray and store in Local storage
      } else {
        usersArray.push(userDetailsCollected);
        localStorage.setItem("currentUsers", JSON.stringify(usersArray));

        Swal.fire({
          title: "Sucessfully Registered!",
          text: "You have successfully created an account!",
          icon: "success",
          confirmButtonText: "OK",
          //reset entry fields upon success
          willClose: function () {
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
            document.getElementById("dateofbirth").value = "";
            genders.forEach(function (gender) {
              gender.checked = false;
            });
            window.location.href = "login.html";
          },
        });
      }
    }
  }
}
