import { dataJSON } from "./dataService";
let data = dataJSON;

// p5 instance mode
const s = ( p ) => {
    let font;

    let canvasWidth = 800;
    let canvasHeight = 600;
    let backgroundColor = "black";

    let scaleX = 1;
    let scaleY = 1;

    let gapX = 0;

    p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight);
        p.background(backgroundColor);
        p.textSize(20);
        p.textStyle(p.BOLD);
        if (font) {
            p.textFont(font);
        } else {
            p.textFont('Courier New');
        }

        // Clear canvas button
        let clearCanvasBtn = p.createButton('Clear canvas');
        clearCanvasBtn.position(700, 260);
        clearCanvasBtn.mousePressed(() => {
            // Reset canvas
            p.clear();
            p.background(250);
            height = 20;
        });

    }

    p.draw = async () => {
        // Draw barcode from data
        for (let i = 0; i < data.length; i++) {
            console.log(data[i])
        }
    }

}

let mainCanvas = new p5(s);