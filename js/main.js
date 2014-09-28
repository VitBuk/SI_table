(function() {

    window.addPlayer = addPlayer;
    window.changeScore = changeScore;
    window.deletePlayer = deletePlayer;
    window.enterScore = enterScore;
    window.applyScore = applyScore;
    window.enterName = enterName;
    window.applyName = applyName;
    window.changeTextField = changeTextField;

    function addPlayer (playerId) {
        var playerColumnId = "Column" + playerId;
        var playerScoreId = "Score" + playerId;
        var playerNameId = "Player" + playerId;
        var scoreHistoryId = "ScoreHistory" + playerId;
        var arbitaryScoreId = "ArbitaryScore" + playerId;

        var playerList = document.getElementById("playerList");

        var playerColumn = "<div class=playerColumn id="+playerColumnId+">";
        var playerNameDiv = "<div class=nameData id= "+playerNameId+" onclick='enterName("+playerId +")'> "+playerNameId+" </div>";
        var playerScoreDiv = "<div class=scoreData id="+playerScoreId+" onclick='enterScore("+playerId+")'>0</div>";
        var scoreHistoryDiv = "<div id="+scoreHistoryId+"> </div>";

        var scoreButtons = "<div class=buttonsDiv>";
        var deletePlayerButton = "<input class=deletePlayerButton type='button' value='Delete' onclick='deletePlayer("+playerId+")'/>";
        var scoreButton10 = "<div><input class =scoreButton type='button' value='-10' onclick='changeScore("+playerId+", -10)'/>" +
            "<input class=scoreButton type='button' value='+10' onclick='changeScore("+playerId+", +10)'/></div>";
        var scoreButton20 = "<div><input class = scoreButton type='button' value='-20' onclick='changeScore("+playerId+", -20)'/>" +
            "<input class=scoreButton type='button' value='+20' onclick='changeScore("+playerId+", +20)'/></div>";
        var scoreButton30 = "<div class=scoreMinusButtonData><input class = scoreButton type='button' value='-30' onclick='changeScore("+playerId+", -30)'/>" +
            "<input class=scoreButton type='button' value='+30' onclick='changeScore("+playerId+", +30)'/></div>";
        var scoreButton40 = "<div><input class = scoreButton type='button' value='-40' onclick='changeScore("+playerId+", -40)'/>" +
            "<input class=scoreButton type='button' value='+40' onclick='changeScore("+playerId+", +40)'/></div>";
        var scoreButton50 = "<div><input class = scoreButton type='button' value='-50' onclick='changeScore("+playerId+", -50)'/>" +
            "<input class=scoreButton type='button' value='+50' onclick='changeScore("+playerId+", +50)'/></div>";
        var scoreButtonArbitary = "<div><input class=arbitaryButton type='button' value='-' onclick='changeTextField("+playerId +", false)' />" +
            "<input class=arbitaryTextField id="+arbitaryScoreId+" type='text' value='10'/><input class=arbitaryButton type='button' value='+' onclick='changeTextField("+playerId+", true)' /> </div>";
        scoreButtons += deletePlayerButton +scoreButton10 + scoreButton20 + scoreButton30 + scoreButton40 + scoreButton50 + scoreButtonArbitary;
        scoreButtons += "</div>";

        playerColumn += scoreButtons + playerNameDiv + playerScoreDiv + scoreHistoryDiv;
        playerColumn += "</div>";
        playerList.innerHTML += playerColumn;

        //check playerColumn <div> composition
        console.log (playerColumn);
    }

    function changeTextField (id, bool) {
        var arbitaryScoreId = "ArbitaryScore" + id;
        var arbitaryScore = document.getElementById(arbitaryScoreId);

        if (parseInt(arbitaryScore.value)){
            if (bool) changeScore(id, +arbitaryScore.value);
            else changeScore(id, -arbitaryScore.value);
        }
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
        var playerOldName = playerName.innerHTML;


        if (document.getElementById(inputNameId) == null) {
            playerName.innerHTML = "<input id=" + inputNameId + " value=" +playerOldName+ " type'text' onkeypress='applyName(event, " + id + ")' onblur='applyName(event," + id + ")'/>";
        }
    }

    function applyName (event, id) {
        var playerNameId = "Player" +id;
        var inputNameId = "InputName" +id;
        var playerName = document.getElementById(playerNameId);
        var inputName = document.getElementById(inputNameId);

        if (event.type == 'blur' || event.keyCode == 13){
            playerName.innerHTML = inputName.value;
        }
    }
}());