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