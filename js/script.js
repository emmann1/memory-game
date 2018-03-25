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
function generateBoard(){
    let iconSet = generateRandom(8,12);
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

function resetBoard(){
    setTimeout(generateBoard,550);
    moves = 0;
    for(let i=0;i<board.children.length;i++){
        board.children[i].classList.remove("show", "open", "match");
    }
    selectedCards = [];
    document.querySelector(".moves").innerHTML = moves;
    let stars = document.querySelector(".stars").children.length;
    while(stars < 3){
        let li = document.createElement("LI");
        let i = document.createElement("I");
        i.classList.add("fa", "fa-star");
        li.appendChild(i);
        document.querySelector(".stars").appendChild(li);
        stars++;
    }
};
let board = document.querySelector(".deck");
var selectedCards = [];
let winCondition = false;
let moves = 0;
let resetButton = document.querySelector(".restart").firstElementChild;
let confirmReplay = document.getElementById("yes");
let disfirmReplay = document.getElementById("no");

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

resetButton.addEventListener("click", resetBoard);
confirmReplay.addEventListener("click", function(){
    resetBoard();
    document.querySelector(".modal-backdrop").removeAttribute("style", "display:block;");
})
disfirmReplay.addEventListener("click", function(){
    document.querySelector(".modal").innerHTML = "<h1>Thanks for playing!</h2>";
});