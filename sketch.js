const PIXEL_SIZE = 960;
const START_SIZE = 16;
const sketchField = document.querySelector(".canvas");
const pixelChangeButton = document.querySelector("#pixelChange");
const clearFieldButton = document.querySelector('#clearField');
pixelChangeButton.addEventListener("click", promptPixelChange);
clearFieldButton.addEventListener("click", clearSketchField);

let colorMax = 256;
const colorStep = 5;

let currentFieldSize = START_SIZE;

createSketchField(START_SIZE);

function createSketchField(fieldSize) {
    colorMax = 256; //reset color draw ability
    
    for (let i = 0; i < fieldSize; i++) {
        let buttonRow = document.createElement("div");

        for (let k = 0; k < fieldSize; k++) {
            let sketchButton = document.createElement("button");
            let buttonSize = PIXEL_SIZE / fieldSize;
            sketchButton.style.width = String(buttonSize) + "px";
            sketchButton.style.height = String(buttonSize) + "px";
            sketchButton.addEventListener("mouseover", hoverEffect);
            buttonRow.appendChild(sketchButton);
        }
        sketchField.appendChild(buttonRow);
    }
}

function clearSketchField(event) {
    sketchField.replaceChildren();
    createSketchField(currentFieldSize);
}

function hoverEffect(event) {
    let button = event.currentTarget;
    button.removeEventListener("mouseover", hoverEffect);
    let randomRed = Math.floor(Math.random() * colorMax);
    let randomGreen = Math.floor(Math.random() * colorMax);
    let randomBlue = Math.floor(Math.random() * colorMax);
    button.style.backgroundColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;

    if (colorMax > 0) {
        colorMax = Math.floor(colorMax - colorStep);
    }

    if (colorMax < 0) {
        colorMax = 0;
    }
}

function promptPixelChange(event) {
    let newSize = getFieldSizeFromUser();
    currentFieldSize = newSize;
    sketchField.replaceChildren();
    createSketchField(newSize);
}

function getFieldSizeFromUser() {
    let newSize = NaN;
    while (isNaN(Number(newSize))) {
        newSize = prompt("Change pixels in the canvas? Enter a number between 0 and 100!");
    }
    if (newSize > 100) {
        newSize = 100;
    }
    return newSize;
}