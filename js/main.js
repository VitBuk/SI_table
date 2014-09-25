(function() {

    window.addPlayer = addPlayer;
    window.changeScore = changeScore;
    window.deletePlayer = deletePlayer;
    window.enterScore = enterScore;
    window.applyScore = applyScore;
    window.enterName = enterName;
    window.applyName = applyName;

    function addPlayer (playerId) {
        var playerColumnId = "Column" + playerId;
        var playerScoreId = "Score" + playerId;
        var playerNameId = "Player" + playerId;
        var scoreHistoryId = "ScoreHistory" + playerId;

        var playerList = document.getElementById("playerList");

        var playerColumn = "<div class=playerColumn id="+playerColumnId+">";
        var playerNameDiv = "<div class=nameData id= "+playerNameId+" onclick='enterName("+playerId+")'> "+playerNameId+" </div>";
        var playerScoreDiv = "<div class=scoreData id="+playerScoreId+" onclick='enterScore("+playerId+")'>0</div>";
        var scoreHistoryDiv = "<div id="+scoreHistoryId+"> </div>";
        //button массив через цикл?_?
        var scoreButton1 = "<input class=scoreButtonData type='button' value='-10' onclick='changeScore("+playerId+", -10)'/>";
        var scoreButton2 = "<input class=scoreButtonData type='button' value='+10' onclick='changeScore("+playerId+", +10)'/>";
        var deletePlayerButton = "<input class=deletePlayerButtonData type='button' value='Delete' onclick='deletePlayer("+playerId+")'/>";

        playerColumn += deletePlayerButton+scoreButton1+scoreButton2+playerNameDiv+playerScoreDiv+scoreHistoryDiv;
        playerColumn += "</div>";
        playerList.innerHTML += playerColumn;

        //check playerColumn <div> composition
        console.log (playerColumn);
    }

    function changeScore (id, change) {
        var playerScoreId = "Score" + id;
        var inputScoreId = "InputScore" +id;
        var playerScoreValue = document.getElementById(playerScoreId);
        var inputText = document.getElementById(inputScoreId);

        if (inputText == null) {
            var scoreInt = parseInt(playerScoreValue.innerHTML);
            playerScoreValue.innerHTML = scoreInt + change;
            changeScoreHistory (id, scoreInt, change);
        }
        else {
            playerScoreValue.innerHTML = (parseInt(inputText.value) + change);
            changeScoreHistory (id, parseInt(inputText.value), change );
        }
    }

    function changeScoreHistory (id, score, change) {
        var scoreHistoryId = "ScoreHistory" + id;
        var playerScoreHistory = document.getElementById(scoreHistoryId);

        if (change>0) {
            playerScoreHistory.innerHTML = "<div class=scoreHistoryData id="+scoreHistoryId+"> "+score+"<span class=scoreHistoryIncrease> +"+change+"</span></div>" + playerScoreHistory.innerHTML;
        }
        else {
            playerScoreHistory.innerHTML = "<div class=scoreHistoryData id="+scoreHistoryId+">"+score+"<span class=scoreHistoryDecrease> "+change+"</span></div>" + playerScoreHistory.innerHTML;
        }

    }

    function deletePlayer (id) {
        var playerColumnId = "Column" + id;
        var playerList = document.getElementById("playerList");
        var playerColumn = document.getElementById(playerColumnId);

        playerList.removeChild(playerColumn);
    }

    function enterScore (id) {
        var inputScoreId= "InputScore" + id;
        var playerScoreId = "Score" + id;
        var playerScoreValue = document.getElementById(playerScoreId);
        var scoreInt = parseInt(playerScoreValue.innerHTML);

        if (document.getElementById(inputScoreId) == null) {
            playerScoreValue.innerHTML = "<input id="+inputScoreId+" value="+scoreInt+" type='text' onkeypress='applyScore(event, "+scoreInt+", "+id+")' onblur='applyScore(event, "+scoreInt+", "+id+")'/>";
        }
    }

    /*   function applyScore (event, id) {
     var inputTextId = "InputScore" + id;
     var inputText = document.getElementById(inputTextId);

     if (event.type == 'blur' || event.keyCode == 13) {
     changeScore(id, inputText.value);
     }
     }
     */

    function applyScore (event, score, id) {
        var playerScoreId = "Score" +id;
        var inputScoreId = "InputScore" +id;
        var playerScoreValue = document.getElementById(playerScoreId);
        var inputText = document.getElementById(inputScoreId);

        if (event.type == 'blur' || event.keyCode == 13) {
            if (!parseInt(inputText.value)) {
                playerScoreValue.innerHTML = 0;
                changeScoreHistory(id, score, -score);
            }
            else {
                playerScoreValue.innerHTML = inputText.value;
                changeScoreHistory(id, score, (inputText.value - score));
            }
        }
    }

    function enterName (id) {
        var playerNameId = "Player" +id;
        var playerName = document.getElementById(playerNameId);
        var inputNameId = "InputName" +id;
        var inputName = document.getElementById(inputNameId);
        var playerOldName;

        console.log ("playerOldName before if " + playerOldName);
        var playerShowName = playerName.innerHTML;

        if (inputName == null) {
            playerOldName = playerName.innerHTML;
            console.log ("playerOldName in if " + playerOldName);
            playerName.innerHTML = "<input id=" + inputNameId + " value=" + playerShowName + " type'text' onkeypress='applyName(event, " + playerOldName + ", " + id + ")' onblur='applyName(event, " + playerOldName + ", " + id + ")'/>";
            playerOldName = playerName.innerHTML;
        }
        else {
            playerOldName = inputName.value;
            console.log ("playerOldName after if " + playerOldName);
        }
    }

    function applyName (event, name, id) {
        var playerNameId = "Player" +id;
        var inputNameId = "InputName" +id;
        var playerName = document.getElementById(playerNameId);
        var inputName = document.getElementById(inputNameId);

        console.log ("Параметр name в applyName равен " + name);
        if (event.type == 'blur' || event.keyCode == 13){
            if (inputName.value == "") {
                playerName.innerHTML = name;
            }
            else {
                playerName.innerHTML = inputName.value;
            }
        }
    }
}());