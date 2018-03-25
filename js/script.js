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
    console.log(newArray);
    let cards = document.getElementsByClassName("card");
    newArray.forEach(function(el){
        cards[el[0]].firstChild.classList.add("fa-"+icons[el[1]]);
    });
}();
let board = document.querySelector(".deck");
let match = [];
board.addEventListener("click", function(e){
    e.target.classList.add("open", "show");
    match.push(e.target.firstChild.className);
    console.log(match);
    if(match.length == 2){
        if(match[0] == match[1]){
            console.log(document.getElementsByClassName(match[0]).parentElement);
        }
        match = [];
    }
});

