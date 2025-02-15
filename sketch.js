import { dataJSON } from "./dataService.js";
let data = dataJSON;

// p5 instance mode
const s = ( p ) => {
    let font;

    let canvasWidth = window.innerWidth - 30;
    let canvasHeight = window.innerHeight - 40;
    let backgroundColor = "rgb(200, 200, 200)";
    backgroundColor = "black";
    let mainColor = "rgb(100, 200, 200)";
    mainColor = "rgba(255, 0, 200, 0.87)";
    mainColor = "rgba(0, 123, 255, 0.89)";
    mainColor = "rgb(225, 225, 113)";
    //mainColor = "white";

    /*backgroundColor = "rgb(200, 200, 200)";
    mainColor = "white";*/

    let subColor = "gray";
    subColor = "rgba(0, 123, 255, 0.89)";
    //subColor = "white;"

    // Editable draw variables
    let scaleX = 0.8;
    let scaleY = 1;

    // Animation modes (turn on/off by button)
    let modeScaleX = false;
    let modeScaleY = false;

    let gapY = 0;

    p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight);
        p.blendMode(p.DIFFERENCE);
        p.background(backgroundColor);
        p.noStroke();

        p.textSize(10);
        p.textSize(5);
        p.textStyle(p.BOLD);
        if (font) {
            p.textFont(font);
        } else {
            p.textFont('Courier New');
        }

        // Clear canvas button
        let btn = p.createButton('-CORRUPT');
        btn.position(canvasWidth - 70, 20);
        btn.mousePressed(() => {
            // turn on mode scale Y
            modeScaleY = true;
        });
        btn.style("font-family", "Courier New");
        btn.style("padding", "5px 10px");
        btn.style("text-decoration", "underline");
        btn.style("background-color", "black");
        btn.style("color", "white");
        btn.style("font-size", "12px");

        let btn2 = p.createButton('-DESTROY');
        btn2.position(canvasWidth - 70, 50);
        btn2.mousePressed(() => {
            // turn on mode scale Y
            modeScaleX = true;
        });
        btn2.style("font-family", "Courier New");
        btn2.style("padding", "5px 10px");
        btn2.style("text-decoration", "underline");
        btn2.style("background-color", "black");
        btn2.style("color", "white");
        btn2.style("font-size", "12px");

        drawData();
    }

    // Scale function
    function scaleTime(timeString, maxTime, maxScaled) {
        let timeScaled = (Number(timeString.split(":")[0]) * 60 + Number(timeString.split(":")[1])) / maxTime * maxScaled;
        return timeScaled;
    }

    p.draw = async () => {
        // Animate based on mode
        if (modeScaleX) {
            scaleX += 0.05;
            drawData();
        }
        if (modeScaleY) {
            scaleY += 0.1;
            drawData();
        }
    }

    function drawData() {
        // Draw barcode from data
        let lineNum = 0; // for splitting days into lines vertically
        let lastDate = "";
        for (let i = 0; i < data.length; i++) {
            console.log(data[i])
            let obj = data[i];

            p.fill(mainColor);
            if (obj.type === "P") {
                // In person
                p.fill(mainColor);
            } else {
                // Online
                p.fill(subColor);
            }

            // Process date-time strings
            let date = obj.time.split("T")[0];
            let time = obj.time.split("T")[1];
            let length = obj.length.split("-")[0];

            // Update line number
            if (i !== 0 && date !== lastDate) {
                lineNum++;
            }
            lastDate = date;

            // Scale time and length to fit points in canvas
            let maxTime = 24 * 60; // in seconds
            let maxScaled = canvasWidth; // maximum x value to scale to
            let timeScaled = scaleTime(time, maxTime, maxScaled);
            let lengthScaled = scaleTime(length, maxTime, maxScaled);

            // Calculate size and position based on time
            let width = lengthScaled * scaleX;
            let height = canvasHeight / 7 * scaleY;
            let posX = timeScaled * scaleX + 10;
            let posY = lineNum * height + gapY + 10; //10 + 4 * i;

            // x, y, width, height
            p.rect(posX, posY, width, height);

            // Text label
            p.textAlign(p.RIGHT, p.BOTTOM);
            p.text(obj.name.substring(0, 2), posX, posY);
            /*p.textAlign(p.RIGHT, p.BOTTOM);
            p.text(obj.notes, posX + width, posY + height);*/

            if (obj.type === "P") {
                // In person
                //p.fill(mainColor);
            } else {
                // Online
                // Draw line above
                p.rect(posX, posY - 5, width, 2);
            }
        }
    }
}

let mainCanvas = new p5(s);