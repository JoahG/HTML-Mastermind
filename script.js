// Thanks SO much to @pcs for his help with the compareArrays() function
function compareArrays(a1,a2)
{
    var numSame = 0;
    var numMisplaced = 0;
    var indexesToIgnoreA1 = [];
    var indexesToIgnoreA2 = [];
    var i=0;

        for (i=0;i<a1.length;i++)
        {
            if(a1[i]===a2[i])
            {
                numSame++;
                indexesToIgnoreA1.push(i);
            }
        }

        for(i=0;i<a1.length;i++)
        {
            for(j=0;j<a2.length;j++)
            {
                if(indexesToIgnoreA1.indexOf(i)===-1 && indexesToIgnoreA2.indexOf(j)===-1)
                {
                    if(a1[i]===a2[j])
                    {
                        numMisplaced++;
                        indexesToIgnoreA1.push(i);
                        indexesToIgnoreA2.push(j);
                    }
                }
            }
        }

        if (numSame === a1.length)
        {
            return false;
        } 
        else 
        {
            return [numSame, numMisplaced] ;
        }
}
$(document).ready(function(){
    alert("Rules:                                                                                                       Try to solve the puzzle by trying different color combinations until you guess one that matches the answer. The red number is the number of colors that are correct, and the blue number is the number of colors that are IN the answer, but are not in the correct position in your guess. Have fun!");
    var com_colors = [];
    var colors = ["rgb(0, 0, 255)","rgb(255, 0, 0)","rgb(255, 255, 0)","rgb(0, 255, 0)", "rgb(255, 0, 255)", "orange"];
    function startgame(){
        $("#container").html("<span id='title'>Mastermind Game</span><br><span id='subtitle'>By <a href='http://codecademy.com/users/joahg'>JoahG</a></span><div id='mastermind'> <div id='guesses'>  <div id='guess' active='true' name='1'><div id='check'>Check</div><div id='circle' name='1'></div><div id='circle' name='2'></div><div id='circle' name='3'></div><div id='circle' name='4'></div></div> <div id='guess' active='false' name='2'><div id='check'>Check</div><div id='circle' name='1'></div><div id='circle' name='2'></div><div id='circle' name='3'></div><div id='circle' name='4'></div></div><div id='guess' active='false' name='3'><div id='check'>Check</div><div id='circle' name='1'></div><div id='circle' name='2'></div><div id='circle' name='3'></div><div id='circle' name='4'></div></div><div id='guess' active='false' name='4'><div id='check'>Check</div><div id='circle' name='1'></div><div id='circle' name='2'></div><div id='circle' name='3'></div><div id='circle' name='4'></div></div><div id='guess' active='false' name='5'><div id='check'>Check</div><div id='circle' name='1'></div><div id='circle' name='2'></div><div id='circle' name='3'></div><div id='circle' name='4'></div></div><div id='guess' active='false' name='6'><div id='check'>Check</div><div id='circle' name='1'></div><div id='circle' name='2'></div><div id='circle' name='3'></div><div id='circle' name='4'></div></div><div id='guess' active='false' name='7'><div id='check'>Check</div><div id='circle' name='1'></div><div id='circle' name='2'></div><div id='circle' name='3'></div><div id='circle' name='4'></div></div><div id='guess' active='false' name='8'><div id='check'>Check</div><div id='circle' name='1'></div><div id='circle' name='2'></div><div id='circle' name='3'></div><div id='circle' name='4'></div></div><div id='guess' active='false' name='9'><div id='check'>Check</div><div id='circle' name='1'></div><div id='circle' name='2'></div><div id='circle' name='3'></div><div id='circle' name='4'></div></div><div id='guess' active='false' name='10'><div id='check'>Check</div><div id='circle' name='1'></div><div id='circle' name='2'></div><div id='circle' name='3'></div><div id='circle' name='4'></div></div></div><div id='sidebar'><div id='markup1' class='markup' name='1'></div><div id='markup2' class='markup' name='2'></div><div id='markup3' class='markup' name='3'></div><div id='markup4' class='markup' name='4'></div><div id='markup5' class='markup' name='5'></div><div id='markup6' class='markup' name='6'></div><div id='markup7' class='markup' name='7'></div><div id='markup8' class='markup' name='8'></div><div id='markup9' class='markup' name='9'></div><div id='markup10' class='markup' name='10'></div></div><div id='answer'><div id='circle0' class='circle' name='1'></div><div id='circle1' class='circle' name='2'></div><div id='circle2' class='circle' name='3'></div><div id='circle3' class='circle' name='4'></div></div><div id='answerhide'>Answer Hidden</div></div>");
        $("#answer").hide();
        $("#answerhide").show();
        com_colors = [];
        for (i=0;i<4;i++){
            com_colors.push(colors[Math.floor((Math.random()*colors.length-1)+1)]);
            $("#answer > #circle"+i.toString(10)).css("background-color", com_colors[i]);
            if (com_colors[i] === "orange"){
                com_colors[i] = "rgb(255, 165, 0)";
            }
        }
    }
    startgame();
    function getCircle(active, col){
        col = typeof col !== 'undefined' ? col : '';
        active = active.toString();
        col = col.toString();
        if (col.length === 0){
            return $("#guess[active="+active+"] > #circle");
        } else {
            return $("#guess[active="+active+"] > #circle[name="+col+"]");
        }
    }
    function getCheck(active, col){
        col = typeof col !== 'undefined' ? col : '';
        active = active.toString();
        col = col.toString();
        if (col.length === 0){
            return $("#guess[active="+active+"] > #check");
        } else {
            return $("#guess[active="+active+"] > #check[name="+col+"]");
        }
    }
    getCircle(true).live('click', function(event) {
        $(this).css("background-color", colors[(colors.indexOf($(this).css("background-color")))+1]);
    });
    getCheck(true).live("click", function(event){
        var pass = true;
        var human_guess = [getCircle(true).css("background-color"),getCircle(true).next().css("background-color"),getCircle(true).next().next().css("background-color"),getCircle(true).next().next().next().css("background-color")];
        for (i=0;i<human_guess;i++){
            if (human_guess[i] === "orange"){
                human_guess[i] = "rgb(255, 165, 0)";
            }}
            if (getCircle(true).css("background-color") === "rgb(128, 128, 128)"||getCircle(true).next().css("background-color") === "rgb(128, 128, 128)"||getCircle(true).next().next().css("background-color") === "rgb(128, 128, 128)"||getCircle(true).next().next().next().css("background-color") === "rgb(128, 128, 128)"){
                alert("You did not fill in all the spaces for this guess, please try again.");
                human_guess = [];
                getCircle(true).css("background-color","gray");
                pass = false;
                return;
            } 
        if (!compareArrays(com_colors, human_guess)){
            $("#answer").show();
            $("#answerhide").hide();
            $("#markup"+($("#guess[active=true]").attr("name")).toString(10)).html("<span id='red'>W!</span>");
            answer = confirm("You win! Do you want to play again?");
            if (answer){
                startgame();
                return;
            } else {
                pass = false;
                return;
            }
        }
        $("#markup"+($("#guess[active=true]").attr("name")).toString(10)).html("<span id='red'>"+(compareArrays(com_colors, human_guess))[0]+"</span>  <span id='blue'>"+(compareArrays(com_colors, human_guess))[1]+"</span>");
        if (pass){
            if (parseInt($("#guess[active=true]").attr("name"),10)>=10){
                $("#answer").show();
            $("#answerhide").hide();
            $("#markup"+($("#guess[active=true]").attr("name")).toString(10)).html("<span id='red'>L</span>");
            answer = confirm("You Lose. Do you want to play again?");
            if (answer){
                startgame();
                return;
            } else {
                pass = false;
                return;
            }
            }
            $("#guess[active=true]").attr("active","false").next().attr("active","true");
        }
    });
    $(document).keypress(function(event){var keycode = (event.keyCode ? event.keyCode : event.which);if (keycode === 65) {$("#answer").toggle();$("#answerhide").toggle();}});
}); 