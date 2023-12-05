let usersArray = JSON.parse(localStorage.getItem("currentUsers")) || [];

let scoreboard = document.querySelector('.score-table');

for (let i =0; i < usersArray.length; i++){
    let row = scoreboard.insertRow(1);
    let username = row.insertCell(0);
    let score = row.insertCell(1);
    let date = row.insertCell(2);

    username.innerHTML = usersArray[i].Username;
    score.innerHTML = usersArray[i].TopScore;
    date.innerHTML = usersArray[i].DateAchieved;

}
