const icons = ["cogs", "chrome", "apple", "google", "git", "medium", "firefox", "cubes", "code", "edge", "envira", "wordpress", "android"];
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
const generateBoard = function(){
    let iconSet = generateRandom(8,12);
    let positions = generateRandom(16,16);
    let newArray = [];
    for(let i=0;i<positions.length;i++){
        newArray.push([positions[i],iconSet[Math.floor(i/2)]]);
    };
    let cards = document.getElementsByClassName("card");
    newArray.forEach(function(el){
        cards[el[0]].firstChild.classList.add("fa-"+icons[el[1]]);
    });
}();
let board = document.querySelector(".deck");
var selectedCards = [];
let winCondition = false;
let moves = 0;
board.addEventListener("click", function(e){
    if(e.target.classList.contains("card") && !e.target.classList.contains("match") && !e.target.classList.contains("show")){
        selectedCards.push(e.target);
        e.target.classList.add("show", "open");
        if(selectedCards.length == 2){
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
            if(moves == 22 || moves == 35 || moves == 50){
                document.querySelector(".stars").firstElementChild.remove();
            }
        }
        const matchedCards = document.getElementsByClassName("match");
        if(matchedCards.length == 16){
            winCondition = true;
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