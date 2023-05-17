const mainHtml = document.querySelector('main')
const html = document.querySelector('html')
html.addEventListener('keydown', main)
const word = 'KAUA'
let wordIndex = 0
writing = document.querySelector('#writing')
instructionKey = document.querySelector('#instructionKey')

function main(event) {
    const key = event.key
    if (key.toUpperCase() === word[wordIndex]) {
        mainHtml.style.backgroundColor = mainHtml.style.backgroundColor === 'red' ? 'yellow' : 'red';
        if (wordIndex < word.length - 1){
            wordIndex += 1
            updateInstructionKey()
            updateWriting()
        } else{
            winner()
        }
        }
    
}
function updateInstructionKey(){
    instructionKey.innerText = word[wordIndex]
}
function updateWriting(){
    let writingText = ''
    for (let index = 0; index < wordIndex; index++){
        writingText += word[index]
    }
    writing.innerText = writingText
}
function winner(){
    console.log('winner');
    wordIndex = 0
    updateInstructionKey()
    updateWriting()
}
updateInstructionKey()