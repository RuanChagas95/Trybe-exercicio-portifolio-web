/* global $ */
const mainHtml = document.querySelector('main')
const html = document.querySelector('html')
let word = ''
let wordIndex = 0
const writing = document.querySelector('#writing')
const hintKey = document.querySelector('#hintKey')
const hintText = document.querySelector('#hint')
const question = document.querySelector('#question')
const audios = {}
let error = false
//RequestName Modal
const inputField = document.querySelector('#inputName')
const sendButton = document.querySelector('#sendButton')
const requestName = document.querySelector('#requestName')
$(function () {
  showRequestName()
})
function showRequestName() {
  addRequestNameListeners()
  $('#requestName').modal('show')
}

function setWordText(event) {
  const inputText = inputField.value
  word = inputText
  $('#requestName').modal('hide')
  init(event)
}

//end requestName Modal
function init(event) {
  loadAudios()
  updateHintKey()
  word = word.toUpperCase()
  if (!event){
    writing.classList.add('winner')
  }
  html.addEventListener('keydown', main)
  question.classList.remove('invisible')
}

function main(event) {
  const key = event.key
  if (writing.classList.contains('winner')) {
    return reset()
  }
  if (key.toUpperCase() === word[wordIndex]) {
    mainHtml.style.backgroundColor = mainHtml.style.backgroundColor === 'red' ? 'yellow' : 'red'
    if (wordIndex < word.length - 1) {
      hit()
    } else {
      winner()
    }
  } else {
    error = true
    updateHintText()
    updateHintKey()
  }
}

function updateHintKey() {
  hintKey.innerText = word[wordIndex]
  if (error) {
    hintKey.classList.remove('invisible')
    fontSizeHint()
  } else {
    hintKey.classList.add('invisible')
  }
}

function updateWriting() {
  let writingText = ''
  for (let index = 0; index < wordIndex; index++) {
    writingText += word[index]
  }
  writing.innerText = writingText
}

function fontSizeHint() {
  const fontSize = parseInt(hintKey.style.fontSize)
  if (!error){
    hintKey.style.fontSize = '200%'
  }
  if (fontSize < 250 || isNaN(fontSize)) {
    hintKey.style.fontSize = fontSize ? `${fontSize + 10}%` : '210%'
  }
}

function loadAudios() {
  audios['hit'] = new Audio('songs/hit.mp3')
  audios['hit'].volume = 0.2
  audios['winner'] = new Audio('songs/winner.mp3')
}

function playAudio(audio) {
  if (audios[audio]) {
    audios[audio].currentTime = 0
    audios[audio].play()
  }
}

function winner() {
  playAudio('winner')
  writing.innerText = word
  writing.classList.add('winner')
}

function reset() {
  fontSizeHint()
  writing.innerText = ''
  writing.classList.remove('winner')
  wordIndex = 0
  updateHintText()
  updateHintKey()
  updateWriting()
}

function updateHintText() {
  if (error) {
    hintText.classList.remove('invisible')
  } else {
    hintText.classList.add('invisible')
  }
}

function hit(){
  wordIndex += 1
  error = false
  updateHintText()
  updateHintKey()
  updateWriting()
  playAudio('hit')
  fontSizeHint()
}

function addRequestNameListeners(){
  sendButton.addEventListener('click', setWordText)
  requestName.addEventListener('shown.bs.modal', function () {
    inputField.focus()
  })
  requestName.addEventListener('hidden.bs.modal', function () {
    mainHtml.focus()
  })
  requestName.addEventListener('hidePrevented.bs.modal', function () {
    inputField.placeholder = 'digite um nome antes de iniciarmos'
  })
  inputField.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      setWordText()
    }
  })
}