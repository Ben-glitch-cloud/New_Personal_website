import ObjectColoursArray from './ObjectColoursStorage.js'  

document.getElementById('vid').play();

let coloursBlockOne = document.getElementById('BlockOne'), coloursBlockTwo = document.getElementById('BlockTwo'), coloursBlockThree = document.getElementById('BlockThree'), coloursBlockFour = document.getElementById('BlockFour')

let arrayOfColourBlocks = [coloursBlockOne, coloursBlockTwo, coloursBlockThree, coloursBlockFour]

let findColour = document.getElementById('FindColour'), gameMessage = document.getElementById('gameMessage') 

let buttonRest = document.getElementById('reset')  

// has the colour been found | Colours that have been click on 

let ColourFound = false, ColoursFoundArray = [], score = 0, ColourArray, targetColour

function chosingColours(){  
    score++
    if((score - 1) === Math.max(...Object.keys(ObjectColoursArray).map((item) => Number(item)))){score = 1}  
    console.log(Math.floor(Math.random() * 3) + 1, 'random') 
    ColourArray = ObjectColoursArray[score]  
    targetColour = ObjectColoursArray[score][Math.floor(Math.random() * 3) + 1]
} 

function setFindColour(){ findColour.textContent = targetColour }

function setBlockColours(){ 
    arrayOfColourBlocks.forEach((item, index) => {
        item.style = `background: ${ColourArray[index]}; solid 2px ${ColourArray[index]}`
    })
    gameMessage.textContent = 'Click a sqaure' 
}   

buttonRest.addEventListener('click', function(){ 
    ColourFound = false  
    buttonRest.style.background = '#2E8BC0'
    ColoursFoundArray = [] 
    chosingColours()
    setBlockColours()
    setFindColour()  
})  

function setBlockColourClickFunactions(){
    arrayOfColourBlocks.forEach((item) => {
        item.addEventListener('click', function(){  
            if(ColourFound){ return }
            let Found = colourFinderHex(item.style.background)  
            if(ColoursFoundArray.includes(Found)){ return } 
            if(!matchColour(Found)){ ColoursFoundArray.push(Found), item.style.opacity = 0.4 }
            if(matchColour(Found)){ item.style.border = 'solid 2px #274472' }
        }) 
    })
}

function matchColour(colour){ 
    if(colour === targetColour && ColoursFoundArray.length === 0){ 
        gameMessage.textContent = 'You found the colour on your first try :)'   
        buttonRest.style = "background: #274472;"
        ColourFound = true
        return true 
    } else if(colour === targetColour) {
        gameMessage.textContent = `You found the colour, only ${ColoursFoundArray.length} attempts made.`
        buttonRest.style = "background: #274472;"
        ColourFound = true  
        return true
    } else {
        gameMessage.textContent = 'Not quite right!' 
        return false
    }
}

function colourFinderHex(stringRGB){
    var a = stringRGB.split("(")[1].split(")")[0]; 
    a = a.split(",");
    var b = a.map(function(x){             //For each array element
        x = parseInt(x).toString(16);      //Convert to a base16 string
        return (x.length==1) ? "0"+x : x;  //Add zero if we get only one character
    }) 
    b = "#"+b.join("").toUpperCase();
    return b
} 

chosingColours()
setBlockColours()
setFindColour()  
setBlockColourClickFunactions() 

