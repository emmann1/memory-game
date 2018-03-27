//Icons used of which 8 random ones are chosen

const icons = ["cogs", "chrome", "apple", "google", "git", "medium", "firefox", "cubes", "code", "edge", "envira", "wordpress", "android", "github", "amazon", "codepen"];

//Generate random numbers

function generateRandom(length, maxValue){
    result = [];
    for(let i=0;i<length;i++){
        let randomNumber = Math.floor((Math.random() * maxValue));
        while(result.includes(randomNumber)){
            randomNumber = Math.floor((Math.random() * maxValue));
        }
        result[i] = randomNumber;
    }
    return result;
}
//Function for generating the positions and chosen icons for the board

function generateBoard(){
    let iconSet = generateRandom(8,icons.length-1);
    let positions = generateRandom(16,16);
    let newArray = [];
    for(let i=0;i<positions.length;i++){
        newArray.push([positions[i],iconSet[Math.floor(i/2)]]);
    };
    let cards = document.getElementsByClassName("card");
    newArray.forEach(function(el){
        cards[el[0]].firstChild.removeAttribute("class");
        cards[el[0]].firstChild.classList.add("fa", "fa-"+icons[el[1]]);
    });
};
generateBoard();

//Function for resetting the icons and position on the board, also the rating and previous matched cards

function resetBoard(){
    setTimeout(generateBoard,550);
    moves = 0;
    for(let i=0;i<board.children.length;i++){
        board.children[i].classList.remove("show", "open", "match");
    }
    selectedCards = [];
    document.querySelector(".moves").innerHTML = moves;
    
    for(let i=0;i<stars.length;i++){
        stars[i].firstChild.classList.remove("gray-star");
        stars[i].firstChild.classList.add("gold-star");
    };
    startgame = 0;
    document.querySelector(".timer").innerHTML = "0:00";
    timerCount = 0;
    clearInterval(timer);
    if(document.querySelector("#time").firstElementChild != null || document.querySelector("#rating").firstElementChild != null){
        document.querySelector("#time").firstElementChild.remove();
        document.querySelector("#rating").firstElementChild.remove();
    }
}

//Timer function

function Timer() {
    timerCount+=5;
    let minutes = Math.floor((timerCount % 360000) / 6000); 
    let seconds = Math.floor((timerCount % 6000) / 100);
    let miliseconds = Math.floor(timerCount % 100);
    if(seconds<10){
        seconds = "0" + String(seconds);
    }
    if(miliseconds<10){
        miliseconds = "0" + String(miliseconds);
    }
    document.querySelector(".timer").innerHTML = minutes+":"+seconds+":"+miliseconds;
}

function setScore() {
    let xhttp = new XMLHttpRequest();
    const time = String(document.querySelector("#time").innerText);
    const score = document.querySelector("#rating").querySelectorAll(".gold-star").length;
    const name = String(document.querySelector("#score-input").value);
    xhttp.open("POST", "lib/put.php?name="+name+"&time="+time+"&stars="+score, true);
    xhttp.send();
    console.log("name="+name+"&time="+time+"&stars="+score);
}

function getScore() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            leaderboard = JSON.parse(this.responseText);
       }
    };
    xhttp.open("POST", "lib/get.php", true);
    xhttp.send();
}

getScore();

//intialisation of variables

let timerCount = 0;
let timer;
let leaderboard;
const board = document.querySelector(".deck");
let selectedCards = [];
let startgame = 0;
let stars = document.querySelector(".stars").children;
let moves = 0;
let resetButton = document.querySelector(".restart").firstElementChild;
let confirmReplay = document.querySelector(".replay-button");

//Event listener for cards

board.addEventListener("click", function(e){

    //checks if the clicked element is a card that wasn't previous matched of clicked

    if(e.target.classList.contains("card") && !e.target.classList.contains("match") && !e.target.classList.contains("show")){

        //if the game just started (startgame = 1) then start the timer once

        startgame++;
        if(startgame == 1){
            timer = setInterval(Timer, 50);
        }
        selectedCards.push(e.target);
        e.target.classList.add("show", "open");

        //chekc if two cards were selected

        if(selectedCards.length == 2){

            //checks if the cards are matched

            if(selectedCards[0].firstChild.classList.value == selectedCards[1].firstChild.classList.value){
                selectedCards[0].classList.add("match");
                selectedCards[0].classList.remove("show", "open");
                selectedCards[1].classList.add("match");
                selectedCards[1].classList.remove("show", "open");
                selectedCards = [];
            }else{
                selectedCards[0].classList.add("notmatch");
                selectedCards[1].classList.add("notmatch");
                setTimeout(function(){
                    selectedCards[0].classList.remove("show", "open", "notmatch");
                    selectedCards[1].classList.remove("show", "open", "notmatch");
                    selectedCards = [];
                },100);
            }
            moves++;
            document.querySelector(".moves").innerHTML = moves;

            //checks the number of moves and substract stars

            if(moves == 22){
                stars[0].firstChild.classList.add("gray-star");
                stars[0].firstChild.classList.remove("gold-star");
            }else if(moves == 35){
                stars[1].firstChild.classList.add("gray-star");
                stars[1].firstChild.classList.remove("gold-star");
            }else if(moves == 50){
                stars[2].firstChild.classList.add("gray-star");
                stars[2].firstChild.classList.remove("gold-star");
            }
        }
        const matchedCards = document.getElementsByClassName("match");
        
        //Display modal when the game is won

        if(matchedCards.length == 16){
            let ratingWrap = document.createElement("DIV");
            let score = document.querySelector(".stars").cloneNode(true);
            ratingWrap.classList.add("rating-wrap");
            ratingWrap.appendChild(score);
            clearInterval(timer);
            let gametime = document.querySelector(".timer").cloneNode(true);
            document.querySelector("#time").appendChild(gametime);
            document.querySelector("#rating").appendChild(ratingWrap);
            document.querySelector(".modal-backdrop").setAttribute("style", "display:block;");
            document.querySelector(".modal").removeAttribute("close");
            document.querySelector(".modal").setAttribute("open","");
            document.querySelector(".modal-backdrop").addEventListener("click", function(e){
                if(e.target == document.querySelector(".modal-backdrop")){
                    document.querySelector(".modal-backdrop").removeAttribute("style", "display:block;");
                }
            });
        }
    } 
});

//Event listener for the reset button

resetButton.addEventListener("click", resetBoard);
confirmReplay.addEventListener("click", function(){
    resetBoard();
    document.querySelector(".modal-backdrop").removeAttribute("style", "display:block;");
});

document.querySelector("#score-submit").addEventListener("click", function(e){
    e.preventDefault();
    setScore();
});

