const mainHtml = document.querySelector('main')
const html = document.querySelector('html')
html.addEventListener('keydown', main)
const word = 'KAUA'
let wordIndex = 0
writing = document.querySelector('#writing')
hintKey = document.querySelector('#hintKey')

function main(event) {
    const key = event.key
    if (key.toUpperCase() === word[wordIndex]) {
        mainHtml.style.backgroundColor = mainHtml.style.backgroundColor === 'red' ? 'yellow' : 'red';
        if (wordIndex < word.length - 1){
            wordIndex += 1
            updateHintKey()
            updateWriting()
            hintKey.style.fontSize = '200%'
            hintKey.classList.remove('attention')
        } else{
            winner()
        }
    } else{
        upSizeIntruction()
        hintKey.classList.add('attention')
    }
    
}
function updateHintKey(){
    hintKey.innerText = word[wordIndex]
}
function updateWriting(){
    let writingText = ''
    for (let index = 0; index < wordIndex; index++){
        writingText += word[index]
    }
    writing.innerText = writingText
}
function upSizeIntruction(){
    fontSize = parseInt(hintKey.style.fontSize)
    if (fontSize < 250 || isNaN(fontSize)){
        hintKey.style.fontSize = fontSize ? `${fontSize + 10}%` : '210%'
    }

}

function winner(){
    console.log('winner');
    wordIndex = 0
    hintKey.classList.remove('attention')
    hintKey.style.fontSize = '200%'
    updateHintKey()
    updateWriting()


}
updateHintKey()