let usersArray = JSON.parse(localStorage.getItem("currentUsers")) || [];

//adding data to table rows
function fillInTable(){
    let tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = "";
    for (let i =0; i < usersArray.length; i++){
        let row = tableBody.insertRow();
        let username = row.insertCell(0);
        let score = row.insertCell(1);
        let date = row.insertCell(2);

        username.innerHTML = usersArray[i].Username;
        score.innerHTML = usersArray[i].TopScore;
        date.innerHTML = usersArray[i].DateAchieved;

    }
}

fillInTable();

//sorting rows in table according to their top score
function sortTable(){
    let sortingOrder = 1;
    let sortingButton = document.querySelector(".sortingButton");

    if (sortingButton.dataset.order === "asc"){
        sortingOrder = -1;
        sortingButton.dataset.order = "desc";
    } else {
        sortingButton.dataset.order = "asc";
    }

    usersArray.sort(function(player1, player2){
        return sortingOrder * (player1.TopScore - player2.TopScore)
    });

    fillInTable();

}