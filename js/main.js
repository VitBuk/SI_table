(function() {

    window.addPlayer = addPlayer;
    window.changeScore = changeScore;
    window.deletePlayer = deletePlayer;
    window.enterScore = enterScore;
    window.applyScore = applyScore;

    function addPlayer (playerId) {
        var playerColumnId = "Column" + playerId;
        var playerScoreId = "Score" + playerId;
        var playerNameId = "Player" + playerId;
        var scoreHistoryId = "ScoreHistory" + playerId;

        var playerList = document.getElementById("playerList");

        var playerColumn = "<div class=playerColumn id="+playerColumnId+">";
        //onclick='enterName("+playerId+")
        var playerNameDiv = "<div class=nameData id= "+playerNameId+"> "+playerNameId+" </div>";
        var playerScoreDiv = "<div class=scoreData id="+playerScoreId+" onclick='enterScore("+playerId+")'>0</div>";
        var scoreHistoryDiv = "<div id="+scoreHistoryId+"> </div>";
        //button массив через цикл?_?
        var scoreButton1 = "<input class=scoreButtonData type='button' value='-10' onclick='changeScore("+playerId+", -10)'/>";
        var scoreButton2 = "<input class=scoreButtonData type='button' value='+10' onclick='changeScore("+playerId+", +10)'/>";
        var deletePlayerButton = "<input class=deletePlayerButtonData type='button' value='Delete' onclick='deletePlayer("+playerId+")'/>";

        playerColumn += deletePlayerButton+scoreButton1+scoreButton2+playerNameDiv+playerScoreDiv+scoreHistoryDiv;
        playerColumn += "</div>";
        playerList.innerHTML += playerColumn;
    }

    function changeScore (id, change) {
        var playerScoreId = "Score" + id;
        var playerScoreValue = document.getElementById(playerScoreId);
        var scoreInt = parseInt(playerScoreValue.innerHTML);

        playerScoreValue.innerHTML = scoreInt + change;

        changeScoreHistory (id, scoreInt, change);
    }

    function changeScoreHistory (id, score, change) {
        var scoreHistoryId = "ScoreHistory" + id;
        var playerScoreHistory = document.getElementById(scoreHistoryId);

        console.log (score);
        console.log (change);

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
        var inputTextId= "InputScore" + id;
        var playerScoreId = "Score" + id;
        var playerScoreValue = document.getElementById(playerScoreId);
        var scoreInt = parseInt(playerScoreValue.innerHTML);

        if (document.getElementById(inputTextId) == null) {
            playerScoreValue.innerHTML = "<input id="+inputTextId+" value="+scoreInt+" type='text' onkeypress='applyScore(event, "+scoreInt+", "+id+")' onblur='applyScore(event, "+scoreInt+", "+id+")'/>";
        }
    }

    function applyScore (event, score, id) {
        var playerScoreId = "Score" +id;
        var inputScoreTxtFieldId = "InputScore" +id;
        var playerScoreValue = document.getElementById(playerScoreId);
        var inputText = document.getElementById(inputScoreTxtFieldId);

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
}());