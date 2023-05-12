
function test() {
    const value = textBox.value;
    obj = {k:true, a:true, u:true}
    if (obj[value]) {
        const body = document.querySelector('body');
        body.style.backgroundColor = body.style.backgroundColor === 'red' ? 'yellow' : 'red';
    }
    textBox.value = ''
}
const textBox = document.getElementById('textBox');
textBox.oninput = test;