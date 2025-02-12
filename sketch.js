import { dataJSON } from "./dataService.js";
let data = dataJSON;

// p5 instance mode
const s = ( p ) => {
    let font;

    let canvasWidth = 1200;
    let canvasHeight = 800;
    let backgroundColor = "white";
    let mainColor = "black";
    let subColor = "gray";

    let scaleX = 0.5;
    let scaleY = 1;

    let gapX = 0;

    p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight);
        p.background(backgroundColor);
        p.noStroke();

        p.textSize(20);
        p.textStyle(p.BOLD);
        if (font) {
            p.textFont(font);
        } else {
            p.textFont('Courier New');
        }

        // Clear canvas button
        /*let clearCanvasBtn = p.createButton('Clear canvas');
        clearCanvasBtn.position(700, 260);
        clearCanvasBtn.mousePressed(() => {
            // Reset canvas
            p.clear();
            //p.background(250);
        });*/

        // Draw barcode from data
        for (let i = 0; i < data.length; i++) {
            console.log(data[i])
            let obj = data[i];

            p.fill(mainColor);
            if (obj.type === "P") {
                // In person
                p.fill(mainColor);
            } else {
                // Online
                //p.fill(subColor);
            }

            // Process date-time strings
            let date = obj.time.split("T")[0];
            let time = obj.time.split("T")[1];
            let length = obj.length.split("-")[0];

            // Scale time and length to fit points in canvas
            let maxTime = 24 * 60; // in seconds
            let maxScaled = canvasWidth; // maximum x value to scale to
            let timeScaled = scaleTime(time, maxTime, maxScaled);
            let lengthScaled = scaleTime(length, maxTime, maxScaled);

            // Calculate position based on time
            let posX = timeScaled * scaleX;
            let posY = 10 + 8 * i;
            let width = lengthScaled * scaleX;
            let height = 20;

            // x, y, width, height
            p.rect(posX, posY, width, height);

            if (obj.type === "P") {
                // In person
                //p.fill(mainColor);
            } else {
                // Online
                // Draw line above
                p.rect(posX, posY - 10, width, 4);
                
                // text creation
                p.noStroke();
                p.fill('black');
                p.textSize(5);
                p.textAlign(p.RIGHT, p.CENTER);
                p.text(obj.name, posX, posY);
            }

            // x1, y1, x2, y2
             // lines creation
            /*let posX = provinceWaste[i]/2;
            let posY = 70 + i * w/12;
            stroke(provinceColors[i]);
            strokeWeight(60)
            strokeCap(SQUARE);
            line(50, posY, 50 + posX, posY);

            // x1, y1, x2, y2
            line(20, 200, 200, 350);*/
        }
    }

    // Scale function
    function scaleTime(timeString, maxTime, maxScaled) {
        let timeScaled = (Number(timeString.split(":")[0]) * 60 + Number(timeString.split(":")[1])) / maxTime * maxScaled;
        return timeScaled;
    }

    p.draw = async () => {
        
    }

}

let mainCanvas = new p5(s);