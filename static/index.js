// Change should occur if screen is width 300 or less 
let screenSize = window.matchMedia("(max-width: 300px)");

document.addEventListener('DOMContentLoaded', event => {
    myFunction(screenSize);
})

//Changes
function myFunction(screenSize) {
    image = document.getElementById('wide');
    if (screenSize.matches) { // If media query matches
        image.src = './img/parapente700-6.jpg';
    } else {
        image.src = './img/parapente700-4.jpg'
    }
}

screenSize.onchange = () => myFunction(screenSize)