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
let match = [];
var selectedCards = [];
board.addEventListener("click", function(e){
    if(e.target.classList.contains("card") && !e.target.classList.contains("match") && !e.target.classList.contains("show")){
        selectedCards.push(e.target);
        console.log(selectedCards);
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
        }
    }
});

