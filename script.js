const mainHtml = document.querySelector('main')
const html = document.querySelector('html')
html.addEventListener('keydown', main)
let word = prompt('Digite o nome da criança(sem acentos):')
word = word.toUpperCase()
let wordIndex = 0
const writing = document.querySelector('#writing')
const hintKey = document.querySelector('#hintKey')
const hintText = document.querySelector('#hint')
const audios = {}
let error = false
function main(event) {
  const key = event.key
  if (writing.classList.contains('winner')){
    reset()
  }
  if (key.toUpperCase() === word[wordIndex]) {
    mainHtml.style.backgroundColor = mainHtml.style.backgroundColor === 'red' ? 'yellow' : 'red'
    if (wordIndex < word.length - 1){
      wordIndex += 1
      error = false
      updateHintText()
      updateHintKey()
      updateWriting()
      playAudio('hit')
    } else{
      winner()
            
    }
  } else{
    error = true
    updateHintText()
    updateHintKey()
  }
    
}
function updateHintKey(){
  hintKey.innerText = word[wordIndex]
  if (error){
    hintKey.classList.remove('invisible')

    upSizeIntruction()
  }else{
    hintKey.classList.add('invisible')
  }
}
function updateWriting(){
  let writingText = ''
  for (let index = 0; index < wordIndex; index++){
    writingText += word[index]
  }
  writing.innerText = writingText
}
function upSizeIntruction(){
  const fontSize = parseInt(hintKey.style.fontSize)
  if (fontSize < 250 || isNaN(fontSize)){
    hintKey.style.fontSize = fontSize ? `${fontSize + 10}%` : '210%'
  }
}
function loadAudios(){
  audios['hit'] = new Audio('songs/hit.mp3')
  audios['hit'].volume = 0.2
  audios['winner'] = new Audio('songs/winner.mp3')
}
function playAudio(audio){
  if (audios[audio]){
    audios[audio].currentTime = 0        
    audios[audio].play()
  }
}

function winner(){
  playAudio('winner')
  writing.innerText = word
  writing.classList.add('winner')
  
    
}
function reset(){
  writing.innerText = ''
  writing.classList.remove('winner')
  wordIndex = 0
  updateHintText()
  updateHintKey()
  updateWriting()
}
function updateHintText(){
  if (error){
    hintText.classList.remove('invisible')
  }else{
    hintText.classList.add('invisible')
  }
}
loadAudios()
updateHintKey()